# 📊 Weekly Report Management System
![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/SpringBoot-3.x-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![MySQL](https://img.shields.io/badge/MySQL-8-blue)
![JWT](https://img.shields.io/badge/JWT-Authentication-red)
![License](https://img.shields.io/badge/License-MIT-green)

A full-stack **Weekly Report Management System** developed using **Spring Boot**, **React.js**, and **MySQL**. The system enables organizations to manage weekly reports, projects, and team assignments through secure role-based authentication and interactive dashboards.

---

## 🚀 Features

### 🔐 Authentication & Security
- JWT Authentication
- Spring Security
- Role-Based Access Control (Manager & Team Member)
- Login / Register / Logout
- Change Password
- User Profile

---

### 👨‍💼 Manager Features
- Dashboard Analytics
- Team Performance Overview
- Weekly Report Monitoring
- Project Management (CRUD)
- Team Member Assignment
- AI Assistant
- PDF Report Export
- Report Filtering & Search

---

### 👨‍💻 Team Member Features
- Submit Weekly Reports
- Save Reports as Draft
- Edit Reports
- View Assigned Projects
- Personal Dashboard
- Profile Management

---

### 📈 Dashboard Features
- Interactive Charts
- Compliance Percentage
- Report Statistics
- Pending Reports
- Weekly Workload
- Blocker Summary

---

### 🤖 AI Assistant
The built-in AI Assistant can answer management questions such as:

- Summarize team work
- Show blockers
- Show workload
- Show submission status
- Show recent reports

---

## 🛠 Tech Stack

### Backend
- Java 21
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- Maven
- REST API

### Frontend
- React.js
- React Router
- Axios
- Recharts
- React Toastify
- jsPDF
- CSS3

### Database
- MySQL

### Development Tools
- IntelliJ IDEA
- Visual Studio Code
- Postman
- Git
- GitHub

---

## 📂 Project Structure

```
weekly-report-dashboard
│
├── src                     # Spring Boot Backend
├── frontend                # React Frontend
├── pom.xml
├── README.md
└── .gitignore
```

---


## ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/mohamedshafky2005/weekly-report-dashboard
```

---

### Backend
 
```bash
cd weekly-report-dashboard
```

Configure MySQL in

```
application.properties
```

Run

```bash
mvn spring-boot:run
```

Backend runs on

```
http://localhost:8080
```

---

### Frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

## 🔑 Default Roles

### Manager

- Full Dashboard Access
- Manage Projects
- Assign Team Members
- AI Assistant
- PDF Export

### Team Member

- Create Reports
- Submit Reports
- View Assigned Projects
- Member Dashboard

---

## 📌 REST APIs

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

### Reports

```
GET    /api/reports/my
POST   /api/reports
PUT    /api/reports/{id}
PUT    /api/reports/{id}/submit
```

### Projects

```
GET    /api/projects
POST   /api/projects
PUT    /api/projects/{id}
DELETE /api/projects/{id}
```

### Dashboard

```
GET /api/dashboard/summary
GET /api/dashboard/submitted
GET /api/dashboard/project/{id}
GET /api/dashboard/member/{id}
```

### Assignments

```
GET    /api/assignments
POST   /api/assignments
DELETE /api/assignments/{id}
```

### AI Assistant

```
POST /api/ai/chat
```

---

## 📚 Learning Outcomes

Through this project I gained practical experience in:

- Full-Stack Web Development
- REST API Design
- Spring Boot Development
- React.js Development
- JWT Authentication
- Spring Security
- Role-Based Authorization
- Database Design
- CRUD Operations
- Dashboard Development
- Data Visualization
- AI-powered Reporting
- PDF Generation
- Responsive UI Design

---

## 👨‍💻 Developer

**Mohamed Shafky**

Software Engineering Undergraduate - SLIIT City UNI

LinkedIn:
https://www.linkedin.com/in/mk-mohamed-shafky-b08677330/

GitHub:
https://github.com/mohamedshafky2005

---

## 📄 License

This project was developed as part of a Software Engineering internship portfolio.
