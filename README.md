# Todo-list

### This is a simple todo-list web application built using Node.js, Express.js, and MongoDB. Users can add tasks to those lists, and mark tasks as completed.
### Preview the web app here: [Todo-list](https://todo-list-03zv.onrender.com)

# Prerequisites

#### Before you begin, ensure you have met the following requirements:

- ### Node.js installed on your local machine
- ### MongoDB Atlas account for database storage

# Setting up the project locally

## 1. Clone the repository to your local machine.
```
git clone https://github.com/<your-username>/todo-list.git
```

## 2.     Navigate to the project directory:
```
cd todo-list
```

## 3.     Install dependencies:
```
npm install
```

## 4. Set up your environment variables:

- ### Create a .env file in the root directory.
- ### Add the following environment variables:
```
username=YOUR_MONGODB_USERNAME
password=YOUR_MONGODB_PASSWORD
database=YOUR_MONGODB_DATABASE_NAME
```

## 5.     Start the server:
```
npm start
```

# Usage

- ### Access the application in your web browser at http://localhost:3000
- ### Enter your username to create or access your task list
- ### Add tasks, mark them as completed, and delete them as needed

# Folder Structure
```
todo-list/
│
├── app.js
├── date.js
├── package.json
├── node_modules/
│   └── (dependencies)
├── views/
│   ├── about.ejs
│   ├── footer.ejs
│   ├── header.ejs
│   ├── list.ejs
│   └── username.ejs
└── public/
    └── (static assets)
```
# Technologies Used

- ### Node.js: Server-side JavaScript runtime environment.
- ### Express.js: Web application framework for Node.js.
- ### MongoDB: NoSQL database for storing task data.
- ### EJS: Embedded JavaScript templates for server-side rendering.

# Contributing

#### Contributions are welcome! Feel free to submit pull requests or open issues for any improvements or bug fixes.
