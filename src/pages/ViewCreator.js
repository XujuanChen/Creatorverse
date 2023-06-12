import './ViewCreator.css'
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import supabase from '../config/supabseClient';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faYoutube, faGithub, } from '@fortawesome/free-brands-svg-icons'
import { faPencil, faCircleInfo, faGlobe, faLink } from '@fortawesome/free-solid-svg-icons'

const ViewCreator = () => {
  const [creator, setCreator] = useState(null);
  const fetchCreators = async () => {
    const {data, error} = await supabase.from('creator')
    .select()
    .order("created_at", {ascending: false})

    if (error) {
      console.log(error)
    }

    if (data) {
      setCreator(data);
    }
  }

  useEffect(()=>{
    fetchCreators();
  },[])

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
        <Row xs={1} md={2} className="g-4">
          {
            creator && creator.length>0 ?
            creator.map(c => (
            <Col key={c.id}>
              <article className='card-container' 
              style={{
                  background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${c.imageURL})`, 
                  backgroundPosition: 'center',
                  backgroundSize: 'contain', 
                  backgroundRepeat: 'no-repeat'
                }}>
                <h4 className='transparent blue'> {c.name} </h4>
                <div className='inline-icons'>
                  <h4 className='transparent'>
                    {c.youtube ? 
                      <a className='transparent' href={c.youtube} target='_blank'>
                        <FontAwesomeIcon icon={faYoutube} className='icon-space' />
                      </a> : ''}

                    {c.github ?  
                      <a className='transparent' href={c.github} target='_blank'>
                        <FontAwesomeIcon icon={faGithub} className='icon-space'/>
                      </a> : ''}

                    {c.url ? 
                      <a className='transparent' href={c.url} target='_blank'>
                        <FontAwesomeIcon icon={faLink} className='icon-space'/>
                      </a>: ''}
                  </h4>
                  <h4 className='transparent'>
                    <Link to={'/show/'+ c.id}>
                      <FontAwesomeIcon icon={faCircleInfo} className='icon-space'/>
                    </Link>
                    <Link to={'/edit/' + c.id}>
                      <FontAwesomeIcon icon={faPencil} className='icon-space'/>
                    </Link>
                  </h4>
                </div>
                <p className='transparent'> {c.description.substring(0, 200)}... </p>
              </article>
            </Col>
            )
            ) : <h3> {'No Creator Yet 😞'} </h3>
          }
        </Row>
        </div>
    </div>
  )
}

export default ViewCreator