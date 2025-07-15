```plaintext
src
├── assets/                 # Static assets (images, icons, global css)
│   ├── images/
│   ├── icons/
│   └── styles/
│
├── components/             # Reusable UI components
│   ├── common/             # Buttons, Inputs, Modals
│   └── layout/             # Navbar, Sidebar, Footer
│
├── features/               # Grouped by feature (scalable)
│   ├── admission/
│   │   ├── pages/
│   │   │   ├── AdmissionHome.jsx
│   │   │   └── AdmissionForm.jsx
│   │   ├── components/
│   │   ├── services/       # admissionService.js
│   │   └── hooks/
│   │
│   ├── enrollment/
│   │   ├── pages/
│   │   │   ├── EnrollmentHome.jsx
│   │   │   └── EnrollmentForm.jsx
│   │   ├── components/
│   │   ├── services/
│   │   └── hooks/
│   │
│   └── auth/
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   └── ForgotPassword.jsx
│       ├── services/
│       └── hooks/
│
├── context/                # AuthContext, ThemeContext, etc.
│
├── hooks/                  # Global custom hooks
│
├── routes/                 # AppRoutes.jsx, route configs
│
├── utils/                  # Helper functions (formatDate, validators)
│
├── App.jsx                 # Main App
└── main.jsx                # Entry point
```
