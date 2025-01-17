import React from "react";
import {Container} from 'react-bootstrap'
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  )
};

export default App;
