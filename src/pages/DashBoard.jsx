import React from 'react'
import Header from '../components/Header'
// import RoadmapGenerator from '../components/RoadmapGenerator'
import HeroSection from '../components/HeroSection'
import RoadmapDisplay from '../components/RoadmapDisplay'

const DashBoard = () => {
  return (
    <div>
      <Header/>
      <HeroSection/>
      <RoadmapDisplay/>
      {/* <RoadmapGenerator/> */}
    </div>
  )
}

export default DashBoard
