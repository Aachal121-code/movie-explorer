# 🎬 MoView – Movie Explorer with Comments & Favorites

MoView is a full-stack movie exploration web application that allows users to:
- Search and explore movies
- Save favorites
- Comment with replies
- Register/login with secure authentication

---

## 📁 Project Structure

moview/
│
├── backend/ # Node.js + Express + MongoDB
│ ├── server.js # API for login, signup
│ └── ... # User model, DB config
│
├── frontend/ # React App
│ ├── src/
│ │ ├── App.js
│ │ ├── CommentsPage.js
│ │ ├── Login.js
│ │ ├── FavoritesPage.js
│ │ └── ...
│ └── public/
│
├── .gitignore
├── package.json
└── README.md

yaml
Copy
Edit

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/moview.git
cd moview
🧑‍💻 Frontend Setup (React)
1. Navigate to frontend folder:
bash
cd frontend
2. Install dependencies:
bash
npm install
3. Start the frontend:
bash
npm start
Runs on: http://localhost:3000

🛠️ Backend Setup (Express + MongoDB)
1. Navigate to backend folder:
bash
cd backend
2. Install backend dependencies:
bash
npm install
3. Configure MongoDB (Optional .env)
If you're using MongoDB Compass locally, update server.js to connect:

js
mongoose.connect('mongodb://localhost:27017/moview_users', { ... });
Or use a .env with MONGO_URI and PORT

4. Start the backend:
bash
node server.js
Runs on: http://localhost:5000

✅ Features
🔐 Authentication: Login & signup with hashed passwords (bcrypt)

📦 MongoDB: Stores users

💬 Comments: Threaded replies (like Instagram)

❤️ Favorites: Save and manage favorite movies

🌐 OMDb API (or mock): Movie exploration

📦 API Endpoints
Route	Method	Description
/api/signup	POST	Register new user
/api/login	POST	Authenticate user login

Body (JSON):

json
Copy
Edit
{
  "username": "demo",
  "password": "demo123"
}
🔧 Tech Stack
Frontend: React, React Router

Backend: Node.js, Express

Database: MongoDB (via Compass or Atlas)

Auth: bcryptjs

Styling: Custom CSS with responsive design

📸 Screenshots
Home page ![image](https://github.com/user-attachments/assets/61b17e18-953f-4ade-8428-64ed9a4cc121)

Comment section with nested replies  ![image](https://github.com/user-attachments/assets/89f8e4f5-238b-4231-9b1e-ded8cc1a418c)

Login/signup page  ![image](https://github.com/user-attachments/assets/e0aa1c87-437d-49cf-954a-5d046f68ed8b)

explorer  ![image](https://github.com/user-attachments/assets/af71403a-de3e-4215-b28e-670280e32e23)


📝 License
MIT License. Feel free to modify and use.

