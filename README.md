src
├── assets/                 # Static assets
│   ├── images/
│   ├── icons/
│   └── styles/             # Global styles or Tailwind config
│
├── components/             # Pure reusable UI components (no business logic)
│   ├── common/             # Buttons, Modals, Inputs
│   └── layout/             # Navbar, Sidebar, Footer
│
├── features/               # Group by feature (highly scalable)
│   ├── admission/
│   │   ├── components/     # Feature-specific components
│   │   ├── pages/          # AdmissionHome.jsx, AdmissionForm.jsx, etc.
│   │   ├── services/       # admissionService.js (API calls)
│   │   ├── hooks/          # useAdmission.js
│   │   └── index.js
│   │
│   ├── enrollment/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── index.js
│   │
│   └── auth/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── hooks/
│
├── context/                # Global state (AuthContext, ThemeContext, etc.)
│
├── hooks/                  # Truly global hooks
│
├── routes/                 # AppRoutes.jsx or route definitions
│
├── utils/                  # Utility helpers (formatDate, validators)
│
├── App.jsx
└── main.jsx
