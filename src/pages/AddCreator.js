import React, { useState } from 'react';
import './AddCreator.css';
import supabase from '../config/supabseClient';
import { useNavigate, Link } from "react-router-dom"

const AddCreator = () => {
  const navigate = useNavigate();
  const [creator, setCreator] = useState({name: "", url: "", description: "", imageURL: "" });
  const [formError, setFormError] = useState(null);

  const createCreator = async(e) => {
    e.preventDefault();
    if (!creator.name || !creator.url || !creator.description || !creator.imageURL) {
      setFormError('Please fill in all the fields correctly.')
      return
    }

    await supabase.from('creator')
    .insert({name: creator.name, url: creator.url, description: creator.description, imageURL: creator.imageURL})
    .select()

    alert("Success! You added a creator!")
    
    navigate('/')
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setCreator((prev) => {
      return {...prev, [name]: value,}
    })
  }

  return (
    <div>
      <h2 className='title-center'>Add a Creator</h2>
      <div className='form-container'>
        <form onSubmit={createCreator}>
        <div class="form-group">
            <label for="name">Fullname</label>
            <input type="text" className="form-control" id="name" name="name" placeholder="Enter fullname" onChange={handleChange} />
          </div>
          <div class="form-group">
            <label for="url">Website</label>
            <input type="text" className="form-control" id="url" name="url" placeholder="Enter website" onChange={handleChange} />
          </div>
          <div class="form-group">
            <label for="imageURL"> Image URL </label>
            <input type="text" className="form-control" id="imageURL" name="imageURL" placeholder="Enter image url" onChange={handleChange} />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea type="text" rows={5} className="form-control" id="description" name="description" placeholder="Enter Description" onChange={handleChange} />
          </div>
          <br />
          <br />
          <div className='grid'>
            <button type="submit" >Submit</button> 
            <Link to='/'>
              <button className='secondary' >Cancel</button>
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

export default AddCreator