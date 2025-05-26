
# Employee Dashboard App

A responsive employee dashboard built with  **Next.js** **React**, **Vite**, **Tailwind CSS**, **Zustand**, and **Chart.js**.

## 🚀 Features

- **Dashboard with user cards** - Display employee information with ratings and actions
- **Search & filter users** - Find employees by name, email, or department
- **Bookmark employees** - Save favorite employees with global state management
- **Analytics with Chart.js** - Visual insights into department performance and bookmarks
- **Light/Dark mode support** - Toggle between themes with persistent preference
- **Dynamic employee pages with tabs** - Detailed employee profiles with Overview, Projects, and Feedback sections
- **Create User modal** - Add new employees with form validation
- **Basic validation and error states** - Robust error handling throughout the app
- **Responsive design** - Works seamlessly on mobile, tablet, and desktop

## 🛠️ Tech Stack

- [React 18](https://reactjs.org/) - Frontend framework
- [Vite](https://vitejs.dev/) - Build tool and development server
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Reusable component library
- [React Router](https://reactrouter.com/) - Client-side routing
- [TanStack Query](https://tanstack.com/query) - Data fetching and caching
- [Recharts](https://recharts.org/) - Chart library for analytics
- [Lucide React](https://lucide.dev/) - Icon library
- [Zustand](https://github.com/pmndrs/zustand) - State management (via Context API)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [bun](https://bun.sh/)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd employee-dashboard-app
```

### 2. Install dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

Using bun:
```bash
bun install
```

### 3. Start the development server

Using npm:
```bash
npm run dev
```

Using yarn:
```bash
yarn dev
```

Using bun:
```bash
bun dev
```

The application will open at `http://localhost:8080`

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── EmployeeCard.tsx # Employee card component
│   ├── Layout.tsx       # Main layout wrapper
│   └── SearchFilter.tsx # Search and filter functionality
├── contexts/            # React Context providers
│   ├── ThemeContext.tsx # Dark/Light mode management
│   └── BookmarkContext.tsx # Bookmark state management
├── hooks/              # Custom React hooks
│   ├── useEmployees.ts # Employee data fetching
│   └── use-*.ts       # Various utility hooks
├── pages/              # Route components
│   ├── Index.tsx       # Dashboard home page
│   ├── EmployeeDetails.tsx # Individual employee page
│   ├── Bookmarks.tsx   # Bookmarked employees
│   ├── Analytics.tsx   # Charts and analytics
│   └── NotFound.tsx    # 404 page
├── lib/                # Utility functions
└── main.tsx           # Application entry point
```

## 🌐 Available Routes

- `/` - Main dashboard with employee cards
- `/employee/:id` - Individual employee details with tabs
- `/bookmarks` - View and manage bookmarked employees
- `/analytics` - Performance analytics and charts

## 🔧 Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🎨 Customization

### Theme Configuration
The app supports dark/light mode switching. Theme preferences are persisted in localStorage.

### API Integration
Currently uses dummy data from `https://dummyjson.com/users`. To integrate with a real API:
1. Update the `fetchEmployees` function in `src/hooks/useEmployees.ts`
2. Modify the data transformation logic as needed

### Styling
- Tailwind CSS classes can be customized in `tailwind.config.ts`
- Component styles use shadcn/ui design system
- CSS variables for theming are defined in `src/index.css`

## 📱 Responsive Design

The application is fully responsive and tested on:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktop (1024px and up)

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**: If port 8080 is busy, Vite will automatically use the next available port
2. **Module not found**: Run `npm install` to ensure all dependencies are installed
3. **Build errors**: Check that all TypeScript types are properly defined

### Development Tips

- Use React Developer Tools for debugging
- Check the browser console for error messages
- The app includes comprehensive error boundaries


