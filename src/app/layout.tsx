'use client';

import React from 'react';
import './globals.css'

export default function Layout({ children }) {
    return (
      <html lang="en">
        <head></head>
        <body>
          {children}
        </body>
      </html>)
  }