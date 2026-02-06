# 🚀 Project Nexus – Campus Super App

**Project Nexus** is a full-stack campus super-application built for **AI Fusion Hackathon 2026**.
It integrates fragmented aspects of college life into a single intelligent platform using modern web technologies and AI-driven features.

> **Theme:** *Innovate · Integrate · Transform*
> *Where AI meets everyday campus life*

---

## 📌 Problem Statement

College life is scattered across emails, notice boards, messaging apps, spreadsheets, and word of mouth.
**Project Nexus** solves this by acting as a **central nervous system** for campus living — not just a bundle of features, but a connected ecosystem.

---

## ✨ Key Features (Implemented / Planned)

### 🧠 AI-Driven

* **Mail Summarizer (AI/ML)**
  Converts long institutional emails into short, actionable summaries.
* Smart categorization (Academic / Events / Urgent)

### 📅 Academic Cockpit

* Live timetable management
* Central academic dashboard (extensible)

### 🔄 Student Exchange

* Lost & Found system
* Marketplace & peer collaboration (scalable design)

### 🧭 Explorer’s Guide

* Campus & nearby area discovery
* Location-based utilities

> The architecture is modular so new features can be plugged in without breaking the system.

---

**Deployed URL: https://hackathon-winner--umanggirdharvlo.replit.app**

## 🛠️ Tech Stack

### Frontend

* **React + TypeScript**
* **Vite** (fast build & HMR)
* Modular component architecture
* Custom hooks & shared utilities

### Backend

* **Node.js + TypeScript**
* REST API architecture
* Static & dynamic routing
* Secure environment configuration

### Database

* **Drizzle ORM**
* Type-safe schema & queries

### DevOps

* **Docker** (containerized setup)
* Environment-based configuration
* Scalable deployment-ready structure

---

## 📁 Project Structure

```text
.
├── client/                 # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities & helpers
│   │   ├── pages/          # Page-level components
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   └── requirements.md
│
├── server/                 # Backend (Node + TS)
│   ├── db.ts               # Database connection
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Data handling layer
│   ├── static.ts           # Static asset handling
│   ├── vite.ts             # Vite server integration
│   └── index.ts            # Server entry point
│
├── shared/                 # Shared types & utilities
├── script/
│   └── build.ts            # Build automation
│
├── drizzle.config.ts       # ORM configuration
├── Dockerfile              # Container setup
├── .env                    # Environment variables
├── .gitignore
├── components.json
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

* Node.js ≥ 18
* npm / pnpm / yarn
* Docker (optional but recommended)

### Clone the Repository

```bash
git clone https://github.com/your-username/project-nexus.git
cd project-nexus
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=your_database_url
PORT=3000
```

---

### Run Locally (Without Docker)

#### Backend

```bash
cd server
npm install
npm run dev
```

#### Frontend

```bash
cd client
npm install
npm run dev
```

---

### Run with Docker

```bash
docker build -t project-nexus .
docker run -p 3000:3000 project-nexus
```

---

## 🔐 Authentication & Security

* Environment-based secrets
* Role-ready architecture (student/admin extensible)
* Secure API design principles followed

---

## 📊 AI/ML Components

* **Mail Summarization Engine**
* Extensible AI pipeline for:

  * Recommendation systems
  * Smart notifications
  * Academic intelligence features

> AI is used **functionally**, not cosmetically.

---

## 🎯 Hackathon Alignment

✔ Full-stack implementation
✔ AI/ML integration (mandatory)
✔ Scalable & modular architecture
✔ GitHub-ready documentation
✔ Real-world campus use case

---

## 🚧 Future Enhancements

* Push notifications
* LMS integration
* Cab-pool & travel matching
* Smart academic analytics
* Wellness & lifestyle tracking
* Accessibility & multi-language support

---

## 👥 Team

Built by **Team Extremist**: Roshan Raman, Mehak Gupta, Umang Girdhar **
For **AI Fusion Hackathon 2026**

---

## 📜 License

This project is licensed for **educational and hackathon use**.
Commercial use requires permission.
