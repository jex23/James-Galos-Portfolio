// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Upload from './components/Upload'; // Import the Upload component
import Home from './pages/Home';
import About from './pages/About';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/uploadDetails" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Upload />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
