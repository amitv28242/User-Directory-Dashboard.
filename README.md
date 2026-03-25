# BuyerForeSight — User Directory Dashboard

A polished React frontend assessment project built with **React 18**, **React Router v6**, and **Vite**.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
buyerforesight/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx       # Live search input
│   │   ├── SortControls.jsx    # Sort by Name / Company buttons
│   │   └── UserTable.jsx       # Data table with clickable rows
│   ├── hooks/
│   │   └── useUsers.js         # Data fetching + filter/sort logic
│   ├── pages/
│   │   ├── Dashboard.jsx       # Main directory view
│   │   └── UserDetail.jsx      # Individual user detail view
│   ├── App.jsx                 # Router setup
│   ├── index.css               # Global styles & design tokens
│   └── main.jsx                # React root
├── index.html
├── vite.config.js
└── package.json
```

---

## ✅ Features

| Requirement | Status |
|---|---|
| Display users in a table | ✅ |
| Show Name, Email, Phone, Company | ✅ |
| Search by name or email (client-side) | ✅ |
| Sort by Name (asc/desc) | ✅ |
| Sort by Company (asc/desc) | ✅ |
| User detail page on row click | ✅ |
| Full user info on detail page | ✅ |
| Loading & error states | ✅ |
| Responsive layout | ✅ |

---

## 🎨 Design

- **Theme**: Dark industrial dashboard  
- **Fonts**: Syne (headings) · DM Sans (body) · IBM Plex Mono (data)  
- **Accent**: Amber `#F0A500`  
- **API**: `https://jsonplaceholder.typicode.com/users`
