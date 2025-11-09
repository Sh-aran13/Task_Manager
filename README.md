# React TaskMaster

React TaskMaster is a modern, full-stack task management application built with Next.js and Firebase. It features a sleek, responsive user interface, real-time data synchronization, and AI-powered features to enhance productivity. Users can manage their tasks through a simple and intuitive interface, with all data securely stored and managed by Firebase.


Live at: https://taskmanagerapp-nu.vercel.app/

## Features

- **User Authentication**: Secure user registration and login using Firebase Authentication (Email & Password).
- **Task Management (CRUD)**: Create, Read, Update, and Delete tasks with ease.
- **AI-Powered Descriptions**: Automatically generate detailed task descriptions from a simple title using Google's Gemini model via Genkit.
- **Real-time Database**: Tasks are stored and synced in real-time using Firestore, providing a seamless experience across sessions. (Initially uses Local Storage, can be upgraded).
- **Rich Task Details**: Assign due dates, priority levels (Low, Medium, High), and detailed descriptions to each task.
- **Dynamic UI**: A beautiful and responsive interface built with Tailwind CSS and ShadCN UI components.
- **Engaging Animations**: Smooth page transitions and subtle animations to enhance the user experience.
- **User Feedback**: Toast notifications for key actions like creating, updating, and deleting tasks.
- **Confirmation Dialogs**: Prevents accidental actions, such as signing out.

## Technologies Used

- **Framework**: [Next.js 15](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Database**: [Firebase](https://firebase.google.com/) (Authentication, Firestore)
- **Generative AI**: [Genkit (Google's Gemini)](https://firebase.google.com/docs/genkit)
- **Form Management**: [React Hook Form](https://react-hook-form.com/)
- **Schema Validation**: [Zod](https://zod.dev/)

## Project Structure

The project follows the standard Next.js App Router structure. Key directories and files include:

```
/
├── src/
│   ├── app/
│   │   ├── (pages)/             # Main application pages (dashboard, login, etc.)
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── page.tsx           # Home page
│   │   ├── components/          # Reusable React components for the UI
│   │   │   ├── task-form.tsx
│   │   │   ├── task-item.tsx
│   │   │   └── task-manager.tsx
│   │   ├── hooks/               # Custom React hooks (e.g., use-tasks.ts)
│   │   └── layout.tsx           # Root layout for the application
│   │
│   ├── ai/
│   │   ├── flows/               # Genkit flows for AI functionality
│   │   │   └── generate-detailed-task-description.ts
│   │   └── genkit.ts            # Genkit configuration
│   │
│   ├── firebase/
│   │   ├── client-provider.tsx  # Client-side Firebase initialization
│   │   ├── config.ts            # Firebase project configuration
│   │   └── ...                  # Hooks and providers for Firebase services
│   │
│   ├── components/ui/           # ShadCN UI components
│   │
│   └── lib/
│       ├── types.ts             # TypeScript type definitions
│       └── utils.ts             # Utility functions
│
├── docs/
│   └── backend.json           # Schema definition for Firebase entities
│
├── public/                    # Static assets
│
└── tailwind.config.ts         # Tailwind CSS configuration
```

## Feature Explanations

### Authentication
User authentication is handled by Firebase Authentication. The app supports email/password sign-up and sign-in. The user's authentication state is managed globally, ensuring that only authenticated users can access the dashboard page. Session persistence is handled by Firebase, keeping users logged in across browser sessions.

### Task Management
The core of the application is the `TaskManager` component, which handles all CRUD (Create, Read, Update, Delete) operations for tasks.
- **Create**: A dialog with a `TaskForm` allows users to create new tasks.
- **Read**: Tasks are displayed in a `TaskList`, which allows for sorting by due date or priority.
- **Update**: Users can edit existing tasks, which opens the same `TaskForm` pre-populated with the task's data.
- **Delete**: Tasks can be deleted with a confirmation dialog to prevent accidental removal.
- **Toggle Completion**: Users can mark tasks as complete or incomplete with a checkbox.

### AI Description Generation
The app leverages Genkit and Google's Gemini Pro model to generate task descriptions automatically. When a user is creating or editing a task, they can click the "Generate with AI" button. This sends the task title to a serverless flow, which then returns a detailed, AI-generated description, saving the user time and effort.

### Styling and UI
The user interface is built for a modern aesthetic using **ShadCN UI** components and styled with **Tailwind CSS**. The app is fully responsive and includes subtle animations on page loads and component interactions to create a fluid user experience. The background of the authentication pages and dashboard features a live, animated gradient to make the interface more dynamic and visually appealing.
