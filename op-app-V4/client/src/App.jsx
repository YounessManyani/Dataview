import React from 'react';
import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CountriesList from './components/CountriesList';
import CityReport from './components/CityReport';
import Services from "./components/Services";

const App = () => {
  const location = useLocation();

  return (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <Header />
      <Hero />
      <Benefits />
      <Routes>
        <Route path="/countries/world" element={<CountriesList />} />
        <Route path="/city/report" element={<CityReport />} />
        {/* Add other routes here */}
      </Routes>
      {location.pathname !== '/city/report' && <Services />}
      <ButtonGradient />
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
