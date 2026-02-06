# 🧑‍💼 Team Management Dashboard

A modular, privacy-respecting web application for managing teams and members. Built with HTML, CSS, and JavaScript, this dashboard enables admins to create teams, assign members, and view team details — all with persistent data storage using LocalStorage.

## 🚀 Live Demo
[View on GitHub Pages](https://Orakzai-dev.github.io/workspace-management/)  

---

## 📦 Features

### ✅ Admin Panel (`admin.html`)
- Create, edit, and delete teams
- Add members with name, email, role, and team assignment
- View and manage all members
- Summary table showing member count per team
- Export team/member data to CSV

### 👥 Team View (`team.html`)
- List of all created teams
- Click to view team details and members
- Members can update their own status (Available, Busy, On Leave)

### 🌗 Dashboard (`index.html`)
- Hero section with welcome message
- Action cards for Admin and Team View
- Sun/Moon theme toggle with persistent dark mode

### 💾 Data Persistence
- All data stored in browser `LocalStorage`
- No backend or tracking — fully client-side

### 📱 Responsive Design
- Mobile-friendly layout with scrollable tables
- Two-column form layout on desktop, stacked on mobile
- Hamburger menu for navigation

---

## 🧩 Tech Stack

| Layer        | Tools Used            |
|--------------|------------------------|
| Frontend     | HTML5, CSS3, JavaScript |
| Storage      | LocalStorage API       |
| Deployment   | GitHub Pages           |

---

## 📁 File Structure
```
team-management-dashboard/
├── index.html              # Landing dashboard with hero and action cards
├── admin.html              # Admin panel for managing teams and members
├── team.html               # Team view with member status updates
├── style.css               # Unified, responsive, theme-aware styling
├── script.js               # Core logic: rendering, storage, theme, events
├── components/             # Reusable HTML fragments
│   └── header.html         # Common header
└── README.md               # Project documentation
```
---

## 🎨 UI Highlights

- 🌗 Theme toggle with animated sun/moon switch
- 🧾 Styled forms with two-column layout
- 📊 Scrollable tables with consistent headers
- 📱 Mobile-first responsive layout
- 🧠 Clean, accessible, and semantic HTML

---

## 🧠 Developer Notes

- Designed with modular functions and clean separation of concerns
- Responsive layout using Flexbox and Grid
- Semantic HTML for accessibility and clarity
- Theme toggle uses `localStorage` for persistence
- CSV export uses Blob API for client-side download

---
