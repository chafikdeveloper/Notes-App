import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from '../../utils/axios'

export const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('/auth/protect')
        setIsAuthenticated(true)
      } catch (error) {
        setIsAuthenticated(false)
      }
    }
    checkAuth();
  }, []);

  if (isAuthenticated === null) return <p>Loading...</p>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
};

export const AuthGuard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('/auth/protect')
        setIsAuthenticated(true)
      } catch (error) {
        setIsAuthenticated(false)
      }
    }
    checkAuth();
  }, []);

  if (isAuthenticated === null) return <p>Loading...</p>;
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />
}

