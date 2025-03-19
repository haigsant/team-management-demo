import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './Layout';
import routes, { RouteConfig } from '../routes';

const AppRouter: React.FC = () => {
  const location = useLocation();
  
  const getCurrentRouteTitle = (): string | undefined => {
    const path = location.pathname;
    
    const exactMatch = routes.find(route => 
      route.exact && route.path === path
    );
    
    if (exactMatch) {
      return exactMatch.title;
    }
    
    // Example: /edit/:id
    const patternMatch = routes.find(route => {
      if (route.exact) return false;

      const pattern = route.path.replace(/:\w+/g, '[^/]+');
      const regex = new RegExp(`^${pattern}$`);
      
      return regex.test(path);
    });
    
    return patternMatch?.title;
  };
  
  return (
    <Layout title={getCurrentRouteTitle()}>
      <Routes>
        {routes.map((route: RouteConfig) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </Layout>
  );
};

export default AppRouter;
