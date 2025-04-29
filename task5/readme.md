
---

## 📝 Task 5 – RESTful API Integration & Front-End Interaction  
**Internship Project – Cognifyz Technologies**  
**Domain:** Full Stack Development

---

### 🚀 Project Overview

This task demonstrates the creation of a **RESTful API** with full **CRUD operations** and a responsive **front-end interface** using HTML, JavaScript, and Tailwind CSS. It simulates a simple **Task Manager** application where users can:

- ✅ Add tasks  
- 🗑️ Delete tasks  
- ❌ Mark tasks as done/undo  
- 📄 See their to-do list in real-time  

---

### 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Frontend:** HTML, JavaScript, Tailwind CSS  
- **Storage:** `data.json` (file-based local storage)  
- **Version Control:** Git + GitHub  

---

### 📁 Folder Structure

```
task5/
├── public/
│   ├── index.html      # Front-end UI
│   └── script.js       # Front-end logic
├── data.json           # Task storage
├── server.js           # Express server + API routes
├── package.json        # Node dependencies
└── README.md           # This file
```

---

### 🔄 API Endpoints

| Method | Endpoint         | Description           |
|--------|------------------|-----------------------|
| GET    | `/api/tasks`     | Fetch all tasks       |
| POST   | `/api/tasks`     | Add a new task        |
| PUT    | `/api/tasks/:id` | Toggle task completion |
| DELETE | `/api/tasks/:id` | Delete a task         |

---

### 📸 Features

- Dynamic front-end using JavaScript & DOM manipulation
- RESTful server that handles all task logic
- Responsive UI styled with Tailwind CSS
- Input validation with error animation
- Data persistence via a local JSON file

---

### 🧪 How to Run the Project

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   node server.js
   ```

3. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

### 👨‍💻 Author

**Krish Shah**   
_GitHub Repo:_ [ShahKrish25/cognifyz-internship-work](https://github.com/ShahKrish25/cognifyz-internship-work)

---
