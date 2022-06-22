import Header from '../components/Headers/Header'
import Sidebar from '../components/Sidebar/Sidebar'
import FixedButton from '../components/UI/FixedButton'
import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Container } from 'reactstrap'

import DateProvider from '../context/dateContext'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

const MainView = () => {
  const location = useLocation();

  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location, displayLocation]);

  return (
    <DateProvider>
      <Container fluid className="menu-show d-flex p-0">
        <Sidebar />
        <div className='d-flex flex-column w-100 position-relative'>
          <Header />
          <div className={`${transitionStage} main`}
              onAnimationEnd={() => {
              if (transitionStage === "fadeOut") {
                setTransistionStage("fadeIn");
                setDisplayLocation(location);
              }
            }}>
                <ToastContainer />
                <Outlet />
            </div>
        </div>
        <FixedButton />
      </Container>
    </DateProvider>
  )
}

export default MainView