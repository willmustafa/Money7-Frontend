import Header from '../components/Headers/Header'
import Sidebar from '../components/Sidebar/Sidebar'
import FixedButton from '../components/UI/FixedButton'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Container } from 'reactstrap'
import { toast, ToastContainer } from 'react-toastify'

import DateProvider from '../context/dateContext'
import 'react-toastify/dist/ReactToastify.min.css' 
import useAuth from '../hooks/useAuth'
import {useToast} from '../context/toastContext'

const MainView = () => {
	const { auth } = useAuth()
	const location = useLocation()
	const {toastObj} = useToast()

	const [displayLocation, setDisplayLocation] = useState(location)
	const [transitionStage, setTransistionStage] = useState('fadeIn')

	useEffect(() => {
		if (location !== displayLocation) setTransistionStage('fadeOut')
	}, [location, displayLocation])

	useEffect(()=>{
		toast(toastObj.text, {type: toastObj.type})
	}, [toastObj])

	return (
		<DateProvider>
			<Container fluid className="menu-show d-flex p-0">
				<Sidebar />
				<div className='d-flex flex-column w-100 position-relative'>
					<Header />
					<div className={`${transitionStage} main`}
						onAnimationEnd={() => {
							if (transitionStage === 'fadeOut') {
								setTransistionStage('fadeIn')
								setDisplayLocation(location)
							}
						}}
					>
						{auth?.accessToken
							? (<Outlet />): (auth?.user
								? (<Navigate to="/unauthorized" state={{ from: location }} replace />)
								: (<Navigate to="/" state={{ from: location }} replace />))
						}
							
					</div>
				</div>
				<FixedButton />
				<ToastContainer/>
			</Container>
		</DateProvider>
	)
}

export default MainView