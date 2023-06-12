import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import supabase from '../config/supabseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faYoutube, faGithub, } from '@fortawesome/free-brands-svg-icons'
import { faPencil, faCircleInfo, faGlobe, faLink } from '@fortawesome/free-solid-svg-icons'

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState({name: "", url: "", youtube: "", github: "", description: "", imageURL: ""});
  const [formError, setFormError] = useState(null);

  const fetchCreator = async() => {
    const { data, error } = await supabase
        .from("creator")
        .select()
        .eq("id", id)
        .single()

    if (error) {
        navigate("/", {replace: true})
    }

    if (data) {
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

  useEffect(() => {
    fetchCreator()
  },[id, navigate])

  const handleEdit = async(e) => {
    e.preventDefault();
    if (!creator.name || !creator.description || !creator.imageURL) {
      setFormError('Please fill in all the fields correctly.')
      return
    }

    await supabase.from('creator')
      .update({
        name:creator.name,
        url: creator.url,
        youtube: creator.youtube,
        github: creator.github,
        description: creator.description,
        imageURL: creator.imageURL,
      })
      .eq("id", id)

      alert("Success! You've updated the information!")
      navigate('/')
  }

  const handleDelete = async(e) => {
    e.preventDefault();
    await supabase.from('creator')
    .delete()
    .eq('id', id)
    .select()
    navigate('/')
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setCreator(prev => {
        return {
            ...prev,
            [name]: value
        }
    })
  }

  return (
    <div>
      <h2 className='title-center'>Edit a Creator</h2>
      <div className='form-container'>
        <form>
        <div className="form-group">
            <label htmlFor="name">Fullname</label>
            <input type="text" className="form-control" id="name" name="name" value={creator.name} placeholder="Enter fullname" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="imageURL"> Image URL </label>
            <input type="text" className="form-control" id="imageURL" name="imageURL" value={creator.imageURL} placeholder="Enter image url" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="youtube">
              <FontAwesomeIcon icon={faYoutube}  />
              &nbsp;&nbsp; YouTube
            </label>
            <input type="text" className="form-control" id="youtube" name="youtube" value={creator.youtube} placeholder="Enter YouTube" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="github" > 
              <FontAwesomeIcon icon={faGithub} /> 
              &nbsp;&nbsp; GitHub
            </label>
            <input type="text" className="form-control" id="github" name="github" value={creator.github} placeholder="Enter GitHub" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="url"> 
              <FontAwesomeIcon icon={faLink} /> 
              &nbsp;&nbsp; Website
            </label>
            <input type="text" className="form-control" id="url" name="url" value={creator.url} placeholder="Enter website" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea type="text" rows={5} className="form-control" id="description" name="description" value={creator.description} placeholder="Enter Description" onChange={handleChange} />
          </div>
          <br />
          <br />
          <div className='grid'>
            <button className='btn btn-success' type='submit' onClick={handleEdit}> Update </button>
            <Link to={'/delete/'+id}>
              <button className='secondary' type='button' > Delete </button>
            </Link>
            <Link to='/'>
              <button type='button' > Go Home </button>
            </Link>
          </div>
        </form>
      </div>
        {formError && <p className="error">{formError}</p>}
      <br />
      <br />
    </div>
  )
}

export default EditCreator