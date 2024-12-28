import { useEffect } from 'react';
import LandingPage from '../components/landingPage'
import MainSection from '../components/mainSection'
import axios from 'axios';


const Home = () => {
    return (
        <>
            <LandingPage />
            <MainSection/>
        </>
    )
}

export default Home
