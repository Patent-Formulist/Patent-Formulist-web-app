import React from 'react';
import { Outlet } from 'react-router-dom';

export default function CleanLayout() {
  return (
    <div className="app-container">
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}