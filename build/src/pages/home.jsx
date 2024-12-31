import { useEffect } from 'react';
import LandingPage from '../components/landingPage'
import MainSection from '../components/globe'
import axios from 'axios';
import Underland from '../components/underland';
import Hintland from '../components/hintland';
import Footer from '../components/footer';


const Home = () => {
    return (
        <>
            <LandingPage />
            <MainSection/>
            <Underland/>
            <Hintland/>
            <Footer/>
        </>
    )
}

export default Home
