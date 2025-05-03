# 🦷 Dentist Appointment App – Frontend

This is the frontend client for the **Dentist Appointment App**, a modern web platform that allows patients to book appointments with dentists, and enables dentists to manage appointments and patient information. Built using **React**, **TypeScript**, and **Vite**, the application offers role-based dashboards, form validation, secure authentication, and dynamic data handling.

---

## 🚀 Features

- 🔐 **Authentication & Authorization**

  - Sign up and login
  - Role-based access for Patients and Dentists

- 📅 **Appointment Management**

  - Patients: View, book, and cancel appointments
  - Dentists: View and manage appointments

- 👤 **User Profile Management**

  - Update email and name
  - Change password

- 🧑‍⚕️ **Admin Capabilities**

  - Promote or demote user roles (e.g., make someone a dentist or admin)

- 💡 **Tech Stack**
  - React + Vite
  - TypeScript
  - Formik + Yup for form handling and validation
  - Axios for HTTP requests
  - Tailwind CSS for styling
  - React Router for navigation
  - Context API for auth state management

---

## 📁 Folder Structure

src/
├── assets/ # Static assets like images and icons
├── components/ # Reusable UI components
├── constants/ # App-wide constant values
├── context/ # React context for global state (e.g., auth)
├── features/ # Feature-specific modules and logic
├── hooks/ # Custom React hooks
├── models/ # TypeScript interfaces and models
├── pages/ # Route-based page components
├── routes/ # App route configurations
├── services/ # API interaction logic (e.g., Axios clients)
├── types/ # Global TypeScript types
├── utils/ # Utility functions
├── App.tsx # Root app component
├── main.tsx # App entry point
└── vite-env.d.ts # Vite environment type declarations

## Running locally

npm run dev

## Building for production

npm run build

✨ Contribution Guide
Fork this repository

Create a new branch: git checkout -b feature/your-feature

Make your changes and commit them: git commit -m 'Add your feature'

Push to your fork: git push origin feature/your-feature

Submit a pull request
