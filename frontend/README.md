# Team Management Frontend

## About
The frontend for the Team Management Demo application, built with modern web technologies to provide an intuitive user interface for managing team members. This frontend communicates with a Django REST backend API to perform CRUD operations on team member data.

## Technology Stack

- **React**: JavaScript library for building user interfaces
- **React Router**: For navigation and routing
- **Axios**: For API requests to the backend
- **CSS Modules**: For component-scoped styling
- **npm**: For package management

## App Functionality

The Team Management Frontend provides the following functionality:

- **View Team Members**: Browse the complete list of team members in a responsive table
- **Add New Team Members**: Form to create new team members with validation
- **Edit Team Members**: Update existing team member information
- **Delete Team Members**: Remove team members from the system
- **Role Management**: Toggle between "Regular" and "Admin" roles for team members

## Install and Run Locally

### Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher
- Backend API running (see main README.md for backend setup)

### Setup and Installation

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables Setup**:
   - Copy the environment variables template:
     ```bash
     cp .env.example .env
     ```
   - Modify the variables in `.env` as needed:
     - `REACT_APP_API_URL`: The base URL for the backend API (default: http://localhost:8000/api)

4. **Start the development server**:
   ```bash
   npm start
   ```
   The application will be available at http://localhost:3000

### Running with Make Commands

If you prefer to use the project's Makefile:

```bash
# Start just the frontend (from the project root)
make frontend

# Start both backend and frontend with a single command
make start-full-stack
```

## Development Workflow

### Code Structure

- `src/components/`: React components
- `src/services/`: API services for communicating with the backend
- `src/utils/`: Utility functions
- `src/styles/`: Global styles
- `src/App.tsx`: Main application component
- `src/routes.ts`: Routing configuration
- `src/index.tsx`: Entry point

### Common Development Tasks

- **Start development server**:
  ```bash
  npm start
  ```

- **Build for production**:
  ```bash
  npm run build
  ```

## Testing: Inactive

@TODO

## Troubleshooting

- **API Connection Issues**: 
  - Ensure the backend server is running (check with `make logs`)
  - Check that REACT_APP_API_URL in your .env file points to the correct API endpoint
  - Confirm there are no CORS issues
  - Try `make restart` to restart the backend if you're experiencing connection problems

- **Build Errors**:
  - Try clearing your node_modules: `rm -rf node_modules && npm install`
  - Ensure you're using a compatible Node.js version

## Developer Notes

- **State Management**: The application uses React's built-in state management with hooks for simplicity. Using React context is preferred for more advanced state management.

- **API Communication**: All backend communication is centralized in the services directory.

- **Form Handling**: Forms use controlled components for full control over form data.

- **Styling Approach**: The application uses CSS Modules to ensure component-scoped styles.

- **Environment Configuration**: Environment variables are used to configure API endpoints for different environments.

- **Mobile First Responsive Approach**: The UI is designed to work on mobile devices and desktop.

- **Browser Compatibility**: The application is compatible with modern browsers (Chrome, Firefox, Safari, Edge), (currently validated on Chrome and Safari).

### Routing System

The application uses React Router for navigation between different views. The routing configuration is centralized for easier maintenance and scalability.

#### Routing Architecture

- **routes.ts**: Central configuration file that defines all routes
- **App.tsx**: Sets up the Router component
- **AppRouter.tsx**: Renders routes based on the configuration

#### Current Routes

- `/`: Home page with team member list
- `/add`: Form to add a new team member
- `/edit/:id`: Form to edit an existing team member

#### How to Add a New Route

1. **Create the component** for the new route in the `src/components` directory:

   ```tsx
   // src/components/YourNewComponent.tsx
   import React from 'react';
   
   const YourNewComponent: React.FC = () => {
     return (
       <div>
         <h1>Your New Page</h1>
         {/* Component content */}
       </div>
     );
   };
   
   export default YourNewComponent;
   ```

2. **Import and add the route** to `src/routes.ts`:

   ```tsx
   import YourNewComponent from './components/YourNewComponent';
   
   // Add your new route to the routes array
   const routes: RouteConfig[] = [
     // Existing routes...
     {
       path: '/your-new-path',
       component: YourNewComponent,
       title: 'Your New Page Title',
       exact: true
     }
   ];
   ```

3. **Access the route parameters** (if needed):

   ```tsx
   // For routes with parameters like /details/:id
   import { useParams } from 'react-router-dom';
   
   const YourComponentWithParams: React.FC = () => {
     const { id } = useParams<{ id: string }>();
     
     return (
       <div>
         <h1>Details for ID: {id}</h1>
         {/* Component content */}
       </div>
     );
   };
   ```

4. **Add navigation** to your new route from other components:

   ```tsx
   import { Link } from 'react-router-dom';
   
   // For simple links
   <Link to="/your-new-path">Go to New Page</Link>
   
   // For programmatic navigation
   import { useNavigate } from 'react-router-dom';
   
   const SomeComponent: React.FC = () => {
     const navigate = useNavigate();
     
     const handleClick = () => {
       navigate('/your-new-path');
     };
     
     return (
       <button onClick={handleClick}>Go to New Page</button>
     );
   };
   ```
