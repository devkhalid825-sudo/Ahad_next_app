﻿'use client';

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary] Caught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{minHeight:'100vh',backgroundColor:'#0D0D0D',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'2rem',fontFamily:'Inter,-apple-system,sans-serif',color:'#F2F0EB',textAlign:'center',gap:'1.5rem'}}>
          <span style={{fontSize:'clamp(80px,20vw,180px)',fontWeight:900,color:'rgba(255,255,255,0.04)',lineHeight:1,userSelect:'none',display:'block'}}>500</span>
          <h1 style={{fontSize:'clamp(1.5rem,4vw,2.5rem)',fontWeight:700,marginTop:'-1rem',color:'#F2F0EB',letterSpacing:'-0.02em'}}>Something Went Wrong</h1>
          <p style={{fontSize:'1rem',color:'rgba(255,255,255,0.4)',fontWeight:300,maxWidth:'400px',lineHeight:1.6}}>An unexpected error occurred. Please refresh or go back to home.</p>
          <div style={{display:'flex',gap:'1rem',flexWrap:'wrap',justifyContent:'center'}}>
            <button onClick={()=>window.location.reload()} style={{backgroundColor:'transparent',border:'1px solid rgba(255,255,255,0.2)',color:'#F2F0EB',padding:'0.75rem 2rem',borderRadius:'999px',fontSize:'0.75rem',fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase',cursor:'pointer'}}>Refresh Page</button>
            <a href="/" style={{backgroundColor:'#4169E1',color:'#fff',padding:'0.75rem 2rem',borderRadius:'999px',fontSize:'0.75rem',fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase',textDecoration:'none',display:'inline-block'}}>Go to Home</a>
          </div>
          <a href="https://elipsestudio.com" style={{marginTop:'2rem',fontSize:'0.75rem',color:'rgba(255,255,255,0.15)',textDecoration:'none',letterSpacing:'0.1em',textTransform:'uppercase'}}>Elipse Studio</a>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
