import React from 'react';
import { Navigate } from 'react-router-dom';
import ContentEditor from './ContentEditor';

const Contribute = () => {
  const token = localStorage.getItem('akankasa:auth_token');
  if (!token) {
    return <Navigate to="/login" state={{ from: '/contribute' }} replace />;
  }
  return <ContentEditor />;
};

export default Contribute;
