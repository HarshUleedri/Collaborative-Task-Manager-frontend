# Collaborative Task Manager Frontend

This is the frontend for the Collaborative Task Manager, a web application designed to help teams manage tasks efficiently with role-based dashboards for Admin, Manager, and Member users.

## Features

- User authentication (login/signup)
- Role-based dashboards (Admin, Manager, Member)
- Task creation, assignment, and status updates
- Real-time task overview and management
- Responsive and modern UI

## Tech Stack

- **React** (with TypeScript)
- **Vite** (for fast development and build)
- **Zustand** (for state management)
- **React Router** (for routing)
- **Custom Hooks** for API and logic abstraction
- **Lucide React** (icons)

## Project Structure

```
components.json
eslint.config.js
index.html
package.json
README.md
vite.config.ts
public/
src/
  App.tsx
  index.css
  main.tsx
  ...
```

- `src/pages/` contains main page components (Dashboard, Login, Signup, etc.)
- `src/components/` contains reusable UI and common components
- `src/hooks/` contains custom React hooks
- `src/api/` contains API configuration and endpoints
- `src/store/` contains Zustand stores
- `src/types/` contains TypeScript type definitions

## Getting Started

### Prerequisites

- Node.js (v16 or above recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd Collabrative-task-manager-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the App

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173` by default.

### Building for Production

```bash
npm run build
# or
yarn build
```

### Linting

```bash
npm run lint
# or
yarn lint
```

## Environment Variables

Create a `.env` file in the root directory and add any required environment variables (e.g., API endpoints).

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
