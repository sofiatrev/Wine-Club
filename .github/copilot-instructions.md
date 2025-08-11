# Project Overview

This project is a web application that allows users to log and rate wines they have tried. Wines are stored in a database and can be retrieved for viewing and editing.

- `/frontend` — React app (Vite)
- `/backend` — Express API server
- `/database` — Azure SQL Database

## Folder Structure

```text
Wine-Club/
├─ README.md
├─ start-dev.ps1
├─ .github/
│  └─ copilot-instructions.md
├─ backend/
│  ├─ package.json
│  ├─ README.md
│  └─ src/
│     ├─ index.js
│     ├─ app.js
│     ├─ models/
│     │  └─ wine.js
│     └─ routes/
│        └─ wines.js
└─ frontend/
   ├─ package.json
   ├─ README.md
   ├─ eslint.config.js
   ├─ vite.config.js
   ├─ index.html
   └─ src/
      ├─ main.jsx
      ├─ App.jsx
      └─ components/
         ├─ WineForm.jsx
         └─ WineList.jsx
```

## Libraries and Frameworks

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: Azure SQL Database
- Hosting: Azure App Services
- Authentication: TBD (Auth0 / Custom JWT)
- Image Storage: Azure Blob Storage

## Coding Standards

(Define linting rules, naming conventions, and commit message style.)

## UI guidelines

- Application should have a modern and clean design.