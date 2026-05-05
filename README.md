## **Project deployed [here](https://mymoney-ee086.web.app/)**

# My Money App

A modern, type-safe financial tracker built with React 18 and Firebase. This application allows users to manage their daily transactions with real-time updates, secure authentication, and a polished user interface.

## 🚀 Core Features

- **Authentication:** Secure Sign Up, Login, and Logout using Firebase Auth.
- **Transaction Management:** Add and list transactions in real-time.
- **Batch Operations:** Quickly clear all transactions with a single click.
- **Dark Mode:** A soft, high-readability dark theme that persists in local storage.
- **Type Safety:** Fully refactored to TypeScript for robust development and fewer runtime errors.
- **Modern UI:** Responsive layout with standardized capitalization and improved form validations.
- **Empty States:** User-friendly guidance when no data is present.

## 🛠 Tech Stack

- **Framework:** [React 18](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database & Auth:** [Firebase 11 (Modular SDK)](https://firebase.google.com/docs/web/setup)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **Testing:** [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install
```

### Available Scripts

- `npm run start`: Runs the development server with Vite.
- `npm run build`: Builds the application for production.
- `npm run test`: Executes the unit test suite using Vitest.
- `npm run preview`: Previews the production build locally.

## 🔄 Refactor Highlights

This project was originally a legacy study application built with Create React App. It has been completely modernized:

1. **Migration:** Moved from CRA to Vite for lightning-fast development and smaller builds.
2. **Modular Firebase:** Upgraded from the monolithic Firebase v8 to the tree-shakeable v11 Modular SDK.
3. **Strict Typing:** Converted the entire codebase to TypeScript, including complex generic types for Firebase hooks.
4. **Tested Logic:** Implemented a testing suite covering authentication states and core transaction flows.
