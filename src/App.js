import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Header from './components/Header/Header';
import { Toaster } from './components/UI/Toaster/Toaster';

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes />
    <Toaster />
  </BrowserRouter>
);

export default App;
