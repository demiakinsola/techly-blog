import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout'; 
import About from './About';
import ContactUs from './ContactUs';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="about" element={<About />} />
          <Route path='contact-us' element={<ContactUs />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
