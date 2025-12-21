# 🎯 Habit Tracker - Client Side

A modern, feature-rich habit tracking application built with React + Vite, Firebase Authentication, and Framer Motion animations.

## ✨ Features

### 🔐 Authentication
- Email/Password registration and login
- Google authentication
- Password validation (min 6 chars, 1 uppercase, 1 lowercase)
- Persistent login sessions
- Protected routes

### 🏠 Home Page
- Hero banner with typewriter effect
- Featured habits section (6 newest public habits)
- "Why Build Habits" benefits section
- Success stories testimonial section
- "How It Works" guide section
- Fully animated with Framer Motion

### ✍️ Habit Management
- **Add Habit**: Create new habits with title, description, category, reminder time, and optional image upload (ImageBB)
- **My Habits**: View all your habits in a table with:
  - Current streak tracking
  - Mark complete (once per day)
  - Update habit details
  - Delete habits (with confirmation)
- **Browse Public Habits**: Search and filter public habits by title/keyword and category
- **Habit Details**: View detailed habit information with:
  - 30-day progress calendar
  - Completion rate progress bar
  - Streak badges and stats
  - Creator information

### 📊 Streak Tracking
- Automatic calculation of consecutive completion days
- Visual progress indicators
- Streak badges with color-coded levels
- Prevents duplicate same-day completions

### 🎨 UI/UX
- Fully responsive design (mobile, tablet, desktop)
- DaisyUI + Tailwind CSS styling
- Consistent design system
- Toast notifications for user feedback
- SweetAlert2 for confirmations
- Smooth animations with Framer Motion
- Loading states and error handling

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd habit-tracker-clientside
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`)
```bash
cp .env.example .env
```

4. Add your Firebase and ImageBB credentials to `.env`:
```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id
VITE_IMGBB_API_KEY=your_imagebb_api_key
```

### Get API Keys

#### Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password and Google)
4. Copy configuration from Project Settings
5. Add credentials to `.env`

#### ImageBB Setup
1. Go to [ImageBB API](https://api.imgbb.com/)
2. Sign up and get your API key
3. Add `VITE_IMGBB_API_KEY` to `.env`

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── authentication/      # Firebase configuration
├── components/          # Reusable components (NavBar, Footer)
├── context/            # Auth context and providers
├── layout/             # Layout components (Root)
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── AddHabit.jsx
│   ├── MyHabits.jsx
│   ├── BrowseHabits.jsx
│   ├── HabitDetails.jsx
│   ├── Loading.jsx
│   └── NotFound.jsx
├── routes/             # Router configuration
├── services/           # Business logic (habitService.js)
├── utils/              # Utility functions (imageUpload.js)
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **React Router v7** - Routing
- **Firebase** - Authentication
- **Tailwind CSS** - Styling
- **DaisyUI** - UI components
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications
- **SweetAlert2** - Confirmation dialogs
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Simple Typewriter** - Typewriter effect
- **Lottie React** - Lottie animations

## 📝 Notes

- All habit data is stored in **localStorage** (no backend required)
- Habits can be marked complete **once per day only**
- Current streak is calculated from consecutive completion days
- Public habits are visible to all users in Browse section
- Private routes require authentication

## 🎯 Features Implemented

✅ Firebase Authentication (Email/Password + Google)  
✅ Password validation rules  
✅ Toast notifications  
✅ Private route protection  
✅ Home page with 5 sections  
✅ Featured habits (6 newest public)  
✅ Add Habit with ImageBB upload  
✅ My Habits table view  
✅ Mark Complete (once per day)  
✅ Update & Delete habits  
✅ Browse Public Habits  
✅ Search & Filter functionality  
✅ Habit Details page  
✅ 30-day progress calendar  
✅ Streak calculation & badges  
✅ Progress bar visualization  
✅ Fully responsive design  
✅ Framer Motion animations  
✅ Loading states  
✅ 404 page  
✅ Consistent design system  

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Developer

Built with ❤️ following modern React best practices and the reference architecture from `ref/` folder.

