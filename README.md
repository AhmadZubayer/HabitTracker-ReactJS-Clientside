# 🎯 Habit Tracker - Build Better Habits, One Day at a Time

**LIVE LINK:** [https://habirtracker-mern.web.app](https://habirtracker-mern.web.app)

Habit Tracker is a modern, feature-rich web application built for individuals who want to build and maintain positive daily habits through consistent tracking and motivation.

## Features

**Authentication:** Secure Firebase authentication with Email/Password and Google Sign-In  
**Habit Management:** Create, update, and delete personal habits with images  
**Streak Tracking:** Automatic calculation of consecutive completion days  
**Private Routes:** Protected habit details and profile pages  
**Public Habits:** Browse and discover habits shared by the community  
**30-Day Progress:** Visual calendar showing completion history  
**Responsive Design:** Mobile-friendly interface using Tailwind CSS and DaisyUI  

## Stack Used

**Frontend:**
- React 19
- React Router 7
- Firebase Authentication
- Tailwind CSS 4
- DaisyUI
- Framer Motion
- React Hot Toast
- Vite

**Backend:**
- Express.js
- MongoDB
- Firebase Admin SDK
- [Backend Repository](https://github.com/AhmadZubayer/HabitTracker-ExpressJSBackend.git)

## Features

✅ Firebase Authentication (Email/Password & Google)  
✅ Password validation (uppercase, lowercase, 6+ characters)  
✅ Password toggle visibility  
✅ Forgot Password functionality  
✅ Protected routes for habit details and profile  
✅ User profile management with Firebase updateProfile()  
✅ Create habits with image upload (ImageBB integration)  
✅ Mark habits complete (once per day)  
✅ 30-day progress calendar with completion rate  
✅ Automatic streak calculation  
✅ Search and filter public habits  
✅ Update and delete your own habits  
✅ Responsive navbar with conditional rendering  
✅ Toast notifications for user feedback  
✅ SweetAlert2 for confirmations  
✅ Framer Motion animations  
✅ Loading states throughout the app  
✅ MongoDB backend for habit storage  
✅ JWT authentication with Firebase tokens  

## Use of AI

AI (Claude Sonnet 4.5) has been used for learning purposes. Used for authentication flow, streak calculation logic, and Framer Motion animations implementation.


## 📁 Project Structure

```
src/
├── authentication/      # Firebase configuration
├── components/          # Reusable components (NavBar, Footer, HabitCard)
├── context/            # Auth context and providers
├── hooks/              # Custom hooks (useAuth, useAxiosSecure)
├── layout/             # Layout components (Root)
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── AddHabit.jsx
│   ├── MyHabits.jsx
│   ├── BrowseHabits.jsx
│   ├── HabitDetails.jsx
│   ├── UpdateHabit.jsx
│   └── NotFound.jsx
├── routes/             # Router configuration
├── utils/              # Utility functions (imageUpload, habitUtils, axiosInstance)
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## 🎯 Key Features Explained

### Streak Tracking
- Automatically calculates consecutive completion days
- Resets to 0 if a day is missed
- Visual progress calendar shows last 30 days
- Completion rate percentage displayed

### Authentication Flow
- Firebase handles user authentication
- JWT tokens sent with every API request
- Protected routes redirect to login if not authenticated
- User profile updates sync with Firebase

### Habit Privacy
- Public habits appear in Browse section
- Private habits only visible to creator
- Toggle privacy when creating/updating habits

## Courtesy

**Design Inspiration:** Modern habit tracking apps  
**Icons:** React Icons  
**Images:** Freepik, Unsplash  
**Backend:** Express.js + MongoDB

## 📄 License

This project is created for educational purposes.



