# GitHub Copilot Instruction Prompt  
## Habit Tracker – Client Side (React + Vite)

---

## ROLE

You are a **senior React frontend engineer**.

Your task is to **fully implement the CLIENT-SIDE of a Habit Tracker web application** using **React + Vite**, strictly following the requirements in this document.

This is a production-grade SPA. All rules must be followed without exception.

---

## 🚨 CRITICAL PROJECT CONTEXT

- This project is already created using **Vite**
- Inside the root directory, there is a folder named **`ref/`**
- **`ref/` contains a complete, working frontend sample project**
- That project is the **ONLY reference for architecture and coding style**

### You MUST:
- Analyze the code inside `ref/`
- Replicate:
  - Folder structure
  - Component breakdown
  - Routing strategy
  - Context / provider usage
  - Custom hooks
  - Axios / API service abstraction
  - State management approach
  - Styling system
  - Naming conventions
- Implement the Habit Tracker frontend using the **same patterns**

### You MUST NOT:
- Invent a new architecture
- Mix in a different structure
- Break consistency with `ref/`

👉 Final code should look like it was written by the **same developer** who wrote the project inside `ref/`.

---

## 🧩 TECH STACK (Client Side Only)

- React (Vite)
- React Router DOM
- Firebase Authentication
  - Email / Password
  - Google Login
- Axios (preferred)
- Framer Motion (mandatory)
- Toast or SweetAlert for messages

Optional (only if cleanly integrated):
- Lottie React
- React Tooltip
- React Simple Typewriter

---

## 🌍 GLOBAL APPLICATION RULES

- Single Page Application (SPA)
- No route errors on browser refresh
- Logged-in users remain logged in on reload
- Navbar & Footer visible on all pages except **404**
- No `alert()` usage
- No Lorem Ipsum text
- Fully responsive (mobile, tablet, desktop)

---

## 🧱 LAYOUT STRUCTURE

### Navbar (Persistent)

Routes:
- Home
- Add Habit (Private)
- My Habits (Private)
- Browse Public Habits
- Login / Signup (conditional)

Auth Logic:
- Not logged in → show Login & Signup
- Logged in →
  - Show user `photoURL`
  - On click → dropdown:
    - displayName
    - email
    - Logout button

---

### Footer (Persistent)

- Logo
- Website name
- Contact info
- Terms & Conditions
- Social media icons  
  ⚠️ Use the **new X logo**, not Twitter

---

## 🏠 HOME PAGE REQUIREMENTS

### Sections (in order)

1. **Hero Banner / Slider**
   - Minimum 3 slides
   - Meaningful content
   - Optional typewriter effect

2. **Featured Habits**
   - Show **6 newest public habits**
   - Sorted by `createdAt DESC`
   - Card layout:
     - Habit info
     - Creator info
     - View Details button

3. **Why Build Habits**
   - 4 benefit cards
   - Icons + short descriptions

4. **Two Additional Relevant Sections**
   - Meaningful
   - Related to habits/productivity

5. **Animations**
   - Use Framer Motion for entrances

---

## 🔐 AUTHENTICATION

### Login Page
- Email
- Password
- Google Login
- Link to Register

---

### Register Page
- Name
- Email
- photoURL
- Password
- Google Login
- Link to Login

### Password Rules
- Minimum 6 characters
- At least 1 uppercase letter
- At least 1 lowercase letter

### Feedback
- All errors & success via toast / sweet alert

🚫 Do NOT implement:
- Email verification
- Forgot password

---

## ✍️ CRUD FEATURES

### Add Habit (Private Route)

Fields:
- Habit Title
- Description
- Category (Morning, Work, Fitness, Evening, Study)
- Reminder Time
- Image upload (optional)
- User Name (read-only)
- User Email (read-only)

On Submit:
- Save to DB
- Show success toast

---

### My Habits (Private Route)

- Table view
- Show only logged-in user’s habits

Columns:
- Title
- Category
- Current Streak
- Created Date
- Update
- Delete
- Mark Complete

---

### ✅ Mark Complete Logic (Strict)

- Habit can be completed **once per day only**
- On completion:
  - Push today’s date into `completionHistory[]`
  - Prevent duplicate same-day entry
- Calculate **current streak** from consecutive days
- Show streak:
  - My Habits table
  - Habit Details page

---

### Update Habit (Private)

- Pre-filled form
- Editable except:
  - User Name
  - User Email
- Optional image re-upload
- Success toast
- Modal preferred (optional)

---

### Delete Habit

- Confirmation required
- Remove from DB
- UI updates instantly

---

## 🌐 BROWSE PUBLIC HABITS

- Show all public habits
- Card or table layout
- Search by title or keyword
- Filter by category
- Combine search + filter dynamically
- View Details button

---

## 📄 HABIT DETAILS PAGE (Private)

Show:
- Title
- Description
- Image
- Category
- Creator info
- Progress bar (last 30 days)
- Streak badge
- Mark Complete button

---

## ⚠️ OTHER REQUIRED PAGES

- 404 / Not Found page
- Loading spinner during async operations

---

## 🎨 UI DESIGN RULES (MANDATORY)

- Same heading font, size, color everywhere
- Same button style across the app
- Equal card sizes
- Grid-based layouts
- Proper spacing & alignment
- Fully responsive
- Unique design (not copied from class examples)

---

## 📁 CODE ORGANIZATION RULES

You MUST:
- Follow patterns used in `ref/`
- Reuse:
  - Layout wrappers
  - Protected route logic
  - Context providers
  - Custom hooks
  - Axios service structure

You MUST NOT:
- Hardcode values
- Duplicate logic
- Break architectural consistency

---

## ✅ FINAL VALIDATION CHECKLIST

Before finishing, ensure:
- All routes implemented
- Private routes protected
- Toasts used correctly
- Framer Motion present
- No alerts / lorem text
- Navbar & Footer consistent
- Reload-safe SPA
- Clean, readable, production-ready code

---

## 🚀 START IMPLEMENTATION

1. Analyze `ref/`
2. Mirror its structure
3. Implement the Habit Tracker frontend fully
4. Maintain architectural discipline

