import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

function App() {
  const [tab, setTab] = useState('students');
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [studentForm, setStudentForm] = useState({
    name: '',
    usn: '',
    email: '',
    department: 'Computer Science and Design',
    courseId: '',
    status: 'Active'
  });
  const [editingStudentId, setEditingStudentId] = useState(null);

  const [courseForm, setCourseForm] = useState({
    code: '',
    title: '',
    credits: 4,
    instructor: ''
  });
  const [editingCourseId, setEditingCourseId] = useState(null);

  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('');

  const fetchAll = () => {
    axios.get(`${API_URL}/students`).then(res => setStudents(res.data));
    axios.get(`${API_URL}/courses`).then(res => setCourses(res.data));
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (!studentForm.name || !studentForm.usn || !studentForm.email) {
      alert('Please fill all required fields');
      return;
    }

    if (editingStudentId) {
      axios.put(`${API_URL}/students/${editingStudentId}`, studentForm).then(() => {
        setMsg('Student updated successfully');
        setEditingStudentId(null);
        setStudentForm({ name: '', usn: '', email: '', department: 'Computer Science and Design', courseId: '', status: 'Active' });
        fetchAll();
      });
    } else {
      axios.post(`${API_URL}/students`, studentForm).then(() => {
        setMsg('Student added successfully');
        setStudentForm({ name: '', usn: '', email: '', department: 'Computer Science and Design', courseId: '', status: 'Active' });
        fetchAll();
      });
    }
  };

  const editStudent = (s) => {
    setEditingStudentId(s.id);
    setStudentForm({
      name: s.name,
      usn: s.usn,
      email: s.email,
      department: s.department,
      courseId: s.courseId,
      status: s.status
    });
  };

  const deleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      axios.delete(`${API_URL}/students/${id}`).then(() => {
        setMsg('Student deleted');
        fetchAll();
      });
    }
  };

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    if (!courseForm.code || !courseForm.title) {
      alert('Please fill course code and title');
      return;
    }

    if (editingCourseId) {
      axios.put(`${API_URL}/courses/${editingCourseId}`, courseForm).then(() => {
        setMsg('Course updated successfully');
        setEditingCourseId(null);
        setCourseForm({ code: '', title: '', credits: 4, instructor: '' });
        fetchAll();
      });
    } else {
      axios.post(`${API_URL}/courses`, courseForm).then(() => {
        setMsg('Course created successfully');
        setCourseForm({ code: '', title: '', credits: 4, instructor: '' });
        fetchAll();
      });
    }
  };

  const editCourse = (c) => {
    setEditingCourseId(c.id);
    setCourseForm({
      code: c.code,
      title: c.title,
      credits: c.credits,
      instructor: c.instructor
    });
  };

  const deleteCourse = (id) => {
    if (window.confirm('Delete this course?')) {
      axios.delete(`${API_URL}/courses/${id}`).then(() => {
        setMsg('Course deleted');
        fetchAll();
      });
    }
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.usn.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
        <div>
          <h2 className="mb-0 text-primary">EduTrack Portal</h2>
          <small className="text-muted">Simple Student & Course Management System</small>
        </div>
        <div className="text-end">
          <span className="badge bg-secondary me-2">Prathik Mothilal</span>
          <span className="badge bg-dark">1BM25CD076</span>
        </div>
      </div>

      {msg && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {msg}
          <button type="button" className="btn-close" onClick={() => setMsg('')}></button>
        </div>
      )}

      <ul className="nav nav-pills mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${tab === 'students' ? 'active' : ''}`}
            onClick={() => { setTab('students'); setMsg(''); }}
          >
            Students ({students.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${tab === 'courses' ? 'active' : ''}`}
            onClick={() => { setTab('courses'); setMsg(''); }}
          >
            Courses ({courses.length})
          </button>
        </li>
      </ul>

      {tab === 'students' && (
        <div>
          <div className="card mb-4">
            <div className="card-header bg-light">
              <strong>{editingStudentId ? 'Edit Student' : 'Add New Student'}</strong>
            </div>
            <div className="card-body">
              <form onSubmit={handleStudentSubmit}>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={studentForm.name}
                      onChange={e => setStudentForm({ ...studentForm, name: e.target.value })}
                      placeholder="e.g. Rahul Kumar"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">USN</label>
                    <input
                      type="text"
                      className="form-control"
                      value={studentForm.usn}
                      onChange={e => setStudentForm({ ...studentForm, usn: e.target.value })}
                      placeholder="e.g. 1BM25CD076"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={studentForm.email}
                      onChange={e => setStudentForm({ ...studentForm, email: e.target.value })}
                      placeholder="name@email.com"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Department</label>
                    <select
                      className="form-select"
                      value={studentForm.department}
                      onChange={e => setStudentForm({ ...studentForm, department: e.target.value })}
                    >
                      <option>Computer Science and Design</option>
                      <option>Computer Science</option>
                      <option>Information Science</option>
                      <option>AI & Data Science</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Assign Course</label>
                    <select
                      className="form-select"
                      value={studentForm.courseId}
                      onChange={e => setStudentForm({ ...studentForm, courseId: e.target.value })}
                    >
                      <option value="">Select Course</option>
                      {courses.map(c => (
                        <option key={c.id} value={c.id}>{c.code} - {c.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      value={studentForm.status}
                      onChange={e => setStudentForm({ ...studentForm, status: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3">
                  <button type="submit" className="btn btn-primary me-2">
                    {editingStudentId ? 'Update Student' : 'Save Student'}
                  </button>
                  {editingStudentId && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setEditingStudentId(null);
                        setStudentForm({ name: '', usn: '', email: '', department: 'Computer Science and Design', courseId: '', status: 'Active' });
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-light d-flex justify-content-between align-items-center">
              <strong>Student List</strong>
              <input
                type="text"
                className="form-control form-control-sm w-25"
                placeholder="Search by name or USN..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="card-body p-0">
              <table className="table table-striped mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>USN</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Course</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((s, index) => {
                    const c = courses.find(course => String(course.id) === String(s.courseId));
                    return (
                      <tr key={s.id}>
                        <td>{index + 1}</td>
                        <td><strong>{s.usn}</strong></td>
                        <td>{s.name}</td>
                        <td>{s.email}</td>
                        <td>{s.department}</td>
                        <td>{c ? c.code : '-'}</td>
                        <td>
                          <span className={`badge ${s.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                            {s.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => editStudent(s)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => deleteStudent(s.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan="8" className="text-center py-3 text-muted">No students found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === 'courses' && (
        <div>
          <div className="card mb-4">
            <div className="card-header bg-light">
              <strong>{editingCourseId ? 'Edit Course' : 'Add New Course'}</strong>
            </div>
            <div className="card-body">
              <form onSubmit={handleCourseSubmit}>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="form-label">Course Code</label>
                    <input
                      type="text"
                      className="form-control"
                      value={courseForm.code}
                      onChange={e => setCourseForm({ ...courseForm, code: e.target.value })}
                      placeholder="e.g. CS201"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Course Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={courseForm.title}
                      onChange={e => setCourseForm({ ...courseForm, title: e.target.value })}
                      placeholder="e.g. Data Structures"
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Credits</label>
                    <input
                      type="number"
                      className="form-control"
                      value={courseForm.credits}
                      onChange={e => setCourseForm({ ...courseForm, credits: Number(e.target.value) })}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Instructor</label>
                    <input
                      type="text"
                      className="form-control"
                      value={courseForm.instructor}
                      onChange={e => setCourseForm({ ...courseForm, instructor: e.target.value })}
                      placeholder="e.g. Dr. Ramesh"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <button type="submit" className="btn btn-primary me-2">
                    {editingCourseId ? 'Update Course' : 'Save Course'}
                  </button>
                  {editingCourseId && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setEditingCourseId(null);
                        setCourseForm({ code: '', title: '', credits: 4, instructor: '' });
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-light">
              <strong>Course Catalog</strong>
            </div>
            <div className="card-body p-0">
              <table className="table table-striped mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Code</th>
                    <th>Course Title</th>
                    <th>Credits</th>
                    <th>Instructor</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c, index) => (
                    <tr key={c.id}>
                      <td>{index + 1}</td>
                      <td><strong>{c.code}</strong></td>
                      <td>{c.title}</td>
                      <td>{c.credits}</td>
                      <td>{c.instructor}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => editCourse(c)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteCourse(c.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {courses.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-3 text-muted">No courses found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <footer className="text-center text-muted small mt-5 pt-3 border-top">
        EduTrack &bull; Lab Project &bull; Prathik Mothilal (1BM25CD076)
      </footer>
    </div>
  );
}

export default App;
