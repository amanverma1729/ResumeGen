import { useEffect } from 'react';
import * as React from 'react'
import { ResumeProvider } from './Context';
import './App.css';
import Main from './components/Main';
import WebFont from 'webfontloader'

function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Pacifico', 'Poppins', 'Inter', 'Merriweather']
      }
    });
  }, []);

  return (
    <ResumeProvider>
      <Main />
    </ResumeProvider>
  );
}

export default App;
