import React from 'react'
import HeroSection from '../../components/user/HeroSection'
import MetaData from '../../components/MetaData'
import HomeLatestProduct from '../../components/user/HomeLatestProduct'
import HomeTopProduct from '../../components/user/HomeTopProduct'
import HomeLatestPost from '../../components/user/HomeLatestPost'


const HomePage = () => {
    return (
        <div>
            <MetaData pageName={"Home"} />
            <HeroSection />
            <HomeTopProduct />
            <HomeLatestProduct />
            <HomeLatestPost />
        </div>
    )
}

export default HomePage