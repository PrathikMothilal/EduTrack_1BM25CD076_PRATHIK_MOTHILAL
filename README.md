# EduTrack - Student & Course Management Portal

A full-stack web application designed for academic administration, tracking course offerings, and managing student registrations with complete CRUD capabilities.

Developed by **Prathik Mothilal** (USN: `1BM25CD076`) as part of the Lab-Completed Web Application / React Project curriculum.

---

## 1. Project Purpose & Scope

EduTrack simplifies course enrollments and student record management in academic departments. The system provides a centralized dashboard to:
- Register and maintain student profiles.
- Manage course catalogs, faculty assignments, and credit allocations.
- Enforce seat capacity limits and track enrollment percentages in real time.
- Filter, search, and perform Create, Read, Update, and Delete (CRUD) operations on students and courses.

---

## 2. Technologies Used

- **Frontend**: React 19, JavaScript (ES6+), HTML5, CSS3
- **UI Framework & Icons**: Bootstrap 5.3, Bootstrap Icons
- **HTTP Client**: Axios
- **Mock REST Backend**: JSON Server (running on port 5000)
- **Tooling & Build System**: Vite 8, Node.js

---

## 3. Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: v18.0.0 or higher (Tested on v24.19.0)
- **npm**: v9.0.0 or higher (Tested on v11.17.0)
- A modern web browser (Google Chrome, Edge, Firefox)

---

## 4. Installation & Setup

1. **Clone or extract the project**:
   ```bash
   cd student-course-portal
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

---

## 5. Running the Application

You can launch both the backend REST server and frontend development client simultaneously or in separate terminal windows.

### Option A: Simultaneous Start (Recommended)
Run the concurrent runner script:
```bash
npm run dev:all
```

### Option B: Run in Separate Terminals

- **Terminal 1 - Mock Backend Server**:
  ```bash
  npm run server
  ```
  *The REST API server will run at: `http://localhost:5000`*

- **Terminal 2 - React Frontend Client**:
  ```bash
  npm run dev
  ```
  *The React web client will run at: `http://localhost:5173`*

Open `http://localhost:5173` in your web browser.

---

## 6. REST API Endpoints & Data Model

The application communicates with a local REST backend configured at `http://localhost:5000`.

### Courses (`/courses`)
- `GET /courses` - Retrieve all course records
- `GET /courses/:id` - Fetch single course details
- `POST /courses` - Create a new course
- `PUT /courses/:id` - Update existing course attributes
- `DELETE /courses/:id` - Remove a course

### Students (`/students`)
- `GET /students` - Retrieve all enrolled students
- `GET /students/:id` - Fetch single student profile
- `POST /students` - Enroll a new student
- `PUT /students/:id` - Update student information
- `DELETE /students/:id` - Delete student registration

---

## 7. Known Limitations & Future Enhancements

- **Data Persistence**: Uses a lightweight local `db.json` file. For enterprise production deployments, this can be transitioned to Spring Boot with a relational database (PostgreSQL / MySQL).
- **Authentication**: Authentication is currently mocked in single-tenant mode. Future versions will incorporate role-based access control (Admin / Faculty / Student) using JWT.
- **Exporting**: Batch export of enrollment sheets to CSV / PDF is planned for future releases.
