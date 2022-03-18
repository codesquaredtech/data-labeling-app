import React, { Fragment } from 'react';
import logo from './logo.svg.jpg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { NavBar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { AdminPage } from './pages/AdminPage';
import { ProjectDetail } from './pages/ProjectDetail';

function App() {
  return (
    <Router>
      <Fragment>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/admin' element={<AdminPage/>}></Route>
          <Route path='/project/:id' element={<ProjectDetail/>}></Route>
        </Routes>
      </Fragment>
      <Footer/>
    </Router>

  );
}

export default App;
