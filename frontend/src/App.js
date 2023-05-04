import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import AllInvoices from './components/pages/AllInvoices';
import SearchInvoice from './components/pages/SearchInvoice';
import NotFound from './components/NotFound';
import { useSelector } from 'react-redux';

const App = () => {
  const [user, setUser] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      setUser(true);
    }
  }, [isLoggedIn]);

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />

        <Route path="/home/invoice" element={<ProtectedRoute user={user}><SearchInvoice /></ProtectedRoute>}>
        </Route>
        
        <Route path="/home/invoices" element={<ProtectedRoute user={user}><AllInvoices /></ProtectedRoute>}>
        </Route>

         
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
