import Button from '@mui/material/Button';
import React from 'react';
import { Navigate, Route, Link } from 'react-router-dom'

export default function Dashboard() {
  const isLoggedIn = false;
  
  return isLoggedIn ? (
    <div>
      <h2>Default Page Content</h2>
      <Link to="/whale">
        <Button variant="outlined">Go to signin</Button>
      </Link>
    </div>
  ) : (
    <Navigate to={{ pathname: '/login' }} />
  );
}
