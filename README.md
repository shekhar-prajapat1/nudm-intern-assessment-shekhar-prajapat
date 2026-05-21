# Property Tax Analytics Dashboard — UPYOG Multi-Tenant Platform

A modern React-based Property Tax Analytics Dashboard built for the NUDM UPYOG Intern Assessment 2026.

This dashboard analyzes property tax records from 10 Indian cities and provides:

- KPI analytics
- City-wise filtering
- Interactive charts
- AI-powered chat assistant using Google Gemini API

---
# Live Link : https://nudm-dashboard.vercel.app/
# Features

## KPI Dashboard

Displays live analytics:

- Total Properties Registered
- Total Approved Properties
- Total Rejected Properties
- Total Collection Amount

All KPI cards update dynamically when selecting different cities.

---

## Tenant Filter

Filter dashboard data city-wise:

- Delhi
- Mumbai
- Pune
- Bengaluru
- Chennai
- Hyderabad
- Ahmedabad
- Kolkata
- Jaipur
- Lucknow

---

## Comparison Chart

Interactive bar chart showing:

- Total collection per city

Built using:

- Recharts

---

## AI Chat Assistant

Integrated AI assistant using:

- Google Gemini API (`gemini-1.5-flash`)

Users can ask questions like:

- Which city has highest collection?
- How many properties are rejected in Mumbai?
- Compare Jaipur and Pune.
- Which city has most pending properties?

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Recharts

## AI Integration

- Google Gemini API

---

# Project Structure

```bash
src/
│
├── components/
│   ├── Filter.jsx
│   ├── KPIcards.jsx
│   ├── CollectionChart.jsx
│   └── Chatbot.jsx
│
├── data/
│   └── properties.json
│
├── App.jsx
└── main.jsx
```

---

# Installation & Setup

## Clone Repository

```bash
git clone YOUR_GITHUB_REPO_LINK
```

## Navigate to Project

```bash
cd nudm-dashboard
```

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

---

# Environment Variables

Create a `.env` file in root folder:

```env
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Important:

- Never commit `.env` file to GitHub
- `.env` is already added in `.gitignore`

---

# API Used

Google Gemini API:

https://aistudio.google.com/

---

# Dataset

The dataset contains:

- 1000 property records
- 10 Indian cities
- Property details
- Tax collection data
- Approval status

---

# Dashboard Functionalities

## KPI Cards

The dashboard displays:

- Total Properties
- Approved Properties
- Rejected Properties
- Total Collection

All cards dynamically update according to selected city.

---

## City Filter

Users can filter dashboard data based on city selection using dropdown.

---

## Comparison Analytics

Bar chart compares tax collections across all cities.

---

## AI Chat Assistant

The chatbot analyzes dataset summaries and answers user questions using Gemini AI.

Examples:

- Which city has highest collection?
- Compare Jaipur and Pune.
- How many properties are rejected?
- Which city has most pending properties?

---

# Assessment Requirements Covered

✅ KPI Dashboard  
✅ Tenant Filter  
✅ Comparison Chart  
✅ AI Chat Assistant  
✅ Responsive UI  
✅ README Documentation  

---

# Screenshots

## Dashboard
<img width="959" height="410" alt="image" src="https://github.com/user-attachments/assets/239c0d2c-ad86-4552-9105-cdf2756fc124" />
<img width="953" height="413" alt="image" src="https://github.com/user-attachments/assets/c3a87e13-3432-4ec9-938f-20153f91a74f" />
<img width="917" height="373" alt="image" src="https://github.com/user-attachments/assets/282bc029-4905-47df-8bef-2cb94dc444df" />




## AI Chat Assistant

<img width="947" height="412" alt="image" src="https://github.com/user-attachments/assets/eacf1ac3-a96e-4dae-9865-ed24a37179af" />


---

# Important Notes

- Backend was not required as per assessment instructions.
- JSON data is loaded directly into React.
- Gemini API key is securely stored using `.env`.
- `.env` file is excluded using `.gitignore`.

---

# Author

## Shekhar Prajapat

- NIT Warangal
- Computer Science Engineering

---

# Submission Details

This project was developed as part of:

NUDM Intern Assessment 2026 — UPYOG Multi-Tenant Platform

Assessment requirements included:

- React frontend
- KPI analytics dashboard
- Multi-tenant filtering
- Comparison chart
- AI chat assistant integration

---

# Future Improvements

- Add PostgreSQL backend
- Add authentication
- Add export reports feature
- Add dark mode
- Add advanced analytics

---
