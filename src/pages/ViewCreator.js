import React from 'react'
import './ViewCreator.css'
import GridCard from '../components/Card';
import { Link } from "react-router-dom";

const ViewCreator = () => {
  return (
    <div className='bg-black' >
        <div className='hero'>
          <div className='d-block p-5 transparent'>
            <h1 className='hero-font transparent'>CreatorVerse</h1>
          </div>
          <div className='transparent btn-container p-5'>
            <a href="#showAll">
              <button className='btn-inline mx-5'>View all Creators</button>
            </a>
            <Link to='/add'>
              <button className='btn-inline mx-5'>Add a Creator</button>
            </Link>
          </div>
        </div>

        <div className='px-5 mx-5 mb-5 pb-5' id='showAll'>
          <GridCard />
        </div>

    </div>
  )
}

export default ViewCreator