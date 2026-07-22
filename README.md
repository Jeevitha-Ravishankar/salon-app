# 💇 Salon Booking Application

A modern **full-stack Salon Booking Application** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. The application enables customers to register, log in, book salon appointments, and submit feedback, while administrators can efficiently manage appointments and users through a secure backend.

---

## ✨ Features

### 👤 Customer
- 🔐 User Registration & Login
- 📅 Book Salon Appointments
- 👀 View Booked Appointments
- ⏰ Check Available Time Slots
- 💬 Submit Feedback

### 👨‍💼 Administrator
- 🔑 Secure Admin Login
- 📋 View All Appointments
- ✏️ Update Appointment Status
- 🗑️ Delete Appointments
- 👥 Manage Customer Bookings

---

# 🛠️ Tech Stack

| Frontend | Backend | Database | Tools |
|----------|----------|----------|-------|
| React.js | Node.js | MongoDB | Postman |
| React Router | Express.js | Mongoose | Git |
| Axios | JWT Authentication | MongoDB Atlas / Local MongoDB | GitHub |
| HTML5 | Bcrypt.js | | VS Code |
| CSS3 | REST API | | |

---

# 🏗️ Project Architecture

```
            React Frontend
                  │
             Axios Requests
                  │
          Express REST API
                  │
         JWT Authentication
                  │
            Node.js Server
                  │
             MongoDB Database
```

---

# 🗄️ Database

MongoDB stores:

- User Information
- Appointment Details
- Customer Feedback

Collections:

- Users
- Appointments
- Feedback

---

# 🔌 REST API

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | User Login |

---

## Appointment

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/appointments` | Book Appointment |
| GET | `/api/appointments` | Get User Appointments |
| GET | `/api/appointments/:id` | Get Appointment |
| PUT | `/api/appointments/:id` | Update Appointment |
| DELETE | `/api/appointments/:id` | Delete Appointment |
| GET | `/api/appointments/bookedSlots` | Available Slots |
| GET | `/api/appointments/admin` | Admin Appointments |

---

## Feedback

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/feedback` | Submit Feedback |
| GET | `/api/feedback` | View Feedback |

---

# 📬 API Testing

The REST APIs were tested using **Postman**.

✔ User Registration

✔ User Login

✔ Appointment Booking

✔ Appointment Update

✔ Appointment Deletion

✔ Feedback Submission

✔ Admin APIs

Supported HTTP Methods:

- GET
- POST
- PUT
- DELETE

---

# 🔐 Authentication

The application implements secure authentication using **JSON Web Tokens (JWT)**.

- User Registration
- Password Hashing using **Bcrypt.js**
- JWT Token Generation
- Protected API Routes

---


# 📦 Dependencies

### Frontend

- React.js
- Axios
- React Router DOM

### Backend

- Express.js
- Mongoose
- JSON Web Token (JWT)
- Bcrypt.js
- CORS
- Dotenv
- Body Parser

---

# 🌟 Future Enhancements

- 💳 Online Payment Integration
- 📧 Email Notifications
- 📱 SMS Appointment Reminders
- 🔔 Push Notifications
- 👤 Profile Management
- ⭐ Salon Ratings
- 💇 Service Management
- 📊 Admin Analytics Dashboard
- 🌙 Dark Mode
- 📱 Fully Responsive Mobile UI

---

# 👩‍💻 Author

**Jeevitha R**


This project is developed for educational and learning purposes.

---

⭐ If you found this project useful, consider giving it a **Star** on GitHub!
