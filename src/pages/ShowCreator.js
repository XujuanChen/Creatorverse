import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import supabase from '../config/supabseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faYoutube, faGithub, } from '@fortawesome/free-brands-svg-icons'
import { faPencil, faCircleInfo, faGlobe, faLink } from '@fortawesome/free-solid-svg-icons'

const ShowCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState({name: "", url: "", youtube: "", github: "", description: "", imageURL: ""});

  const fetchCreator = async() => {
    const {data, error} = await supabase.from('creator')
    .select()
    .eq("id", id)
    .single()

    if (error) {
      console.log(error);
      navigate('/', {replace:true});
    }

    if (data) {
      console.log(data)
      setCreator({
        name: data.name,
        url: data.url,
        youtube: data.youtube,
        github: data.github,
        description: data.description,
        imageURL: data.imageURL,
      })
    }
  }

  useEffect(()=>{
    fetchCreator();
  },[id, navigate])

  return (
    <div className='container mt-10'>
      <div className="container my-5">
        <div className="row">
          <div className="col">
            <div className='img-container'>
              <img className='img-size' src={creator.imageURL} alt="image" />
            </div>
          </div>
          <div className="col-6">
            <h2>Creator: {creator.name} </h2>
            <p>description: {creator.description} </p>
            <h4 className='transparent'>
              {creator.youtube ? 
                <a className='transparent' href={creator.youtube} target='_blank'>
                  <FontAwesomeIcon icon={faYoutube} className='icon-space' /> 
                </a> : ''}
              {creator.github ?  
                <a className='transparent' href={creator.github} target='_blank'>
                  <FontAwesomeIcon icon={faGithub} className='icon-space'/>
                </a> : ''}
              {creator.url ? 
                <a className='transparent' href={creator.url} target='_blank'>
                  <FontAwesomeIcon icon={faLink} className='icon-space'/>
                </a>: ''}
            </h4>
          </div>
        </div>
      </div>

      <div className='grid'>
        <Link to={'/edit/' + id}>
          <button className='show-btn'>edit</button> 
        </Link>
        <Link to={'/'}>
              <button className='show-btn secondary' type='button' > Cancel </button>
        </Link>
      </div>
    </div>
  )
}

export default ShowCreator