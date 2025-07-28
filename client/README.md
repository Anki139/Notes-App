# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
# 📝 Full Stack Note Taking App

A full-stack web app built with React, TypeScript, Node.js, Express, MySQL, and JWT authentication. Users can sign up, log in via OTP or Google, create, update, and delete personal notes.

---

## 🚀 Tech Stack

### Frontend
- React + Vite + TypeScript
- Axios
- TailwindCSS
- React Router

### Backend
- Node.js + Express
- MySQL
- JWT for authentication
- nodemailer for OTP
- dotenv for environment variables

---

## 📁 Project Structure

root/
│
├── client/ # React frontend
│ ├── src/
│ │ ├── pages/
│ │ ├── context/ # AuthContext
│ │ └── ...
│ └── index.html
│
├── server/ # Express backend
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ ├── config/
│ └── index.ts
│
└── README.md

yaml
Copy
Edit

---

## 🧪 Features

- 🔐 Login with OTP or Google
- ✍️ Create, view, edit, delete notes
- 🛡 Auth protected routes (JWT)
- 📂 Full-stack architecture
- 📦 Persistent login with localStorage

---

## ⚙️ How to Run

### 🔧 Backend (server)

```bash
cd server
npm install
npm run dev
Make sure .env has your DB credentials and JWT secret.

🌐 Frontend (client)
bash
Copy
Edit
cd client
npm install
npm run dev
🔑 Environment Variables (example)
.env (in server/)
ini
Copy
Edit
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=notes_app
JWT_SECRET=supersecretjwtkey
EMAIL_USER=your.email@example.com
EMAIL_PASS=your_email_password
📬 API Endpoints
POST /api/auth/signup

POST /api/auth/login

POST /api/auth/verify

GET /api/notes

POST /api/notes

PUT /api/notes/:id

DELETE /api/notes/:id

🧠 Future Enhancements
🗂 Notes categorization / labels

🔍 Search functionality

🌙 Dark mode

🖼 Image uploads

👨‍💻 Author
Ankit Chauhan
