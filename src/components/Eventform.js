import React, { useState, useEffect } from 'react';
import Modalform from './Modalform'
import reglogo from '../reglogo.png'
import '../styles/eventform.css'
function Eventform() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        attendingWithGuest: false,
        guestName: '',
      });
    
      const [errors, setErrors] = useState({});
      const [submitted, setSubmitted] = useState(false);
      const [showModal, setShowModal] = useState(false);
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({...formData, [name]: type === 'checkbox' ? checked : value});
      };
    
      const validate = () => {
        let tempErrors = {};
    
        if (!formData.name) tempErrors.name = "Name is required";
        if (!formData.email) {
          tempErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          tempErrors.email = "Email is invalid";
        }
        if (!formData.age) {
          tempErrors.age = "Age is required";
        } else if (isNaN(formData.age) || formData.age <= 0) {
          tempErrors.age = "Age must be a number greater than 0";
        }
        if (formData.attendingWithGuest && !formData.guestName) {
          tempErrors.guestName = "Guest name is required";
        }
    
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
          setSubmitted(true);
          setShowModal(true);
        }
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
      };
    
      return (
        <div className='formpage'>
          <div className='leftpage'>
            <img src={reglogo} height="auto" width="100%" style={{padding:"10px"}} alt="loading..." />
          </div>
          <div className='rightpage'>
          <h1>Event Registration Form</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
    
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
    
            <div>
              <label>Age:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
              {errors.age && <p className="error">{errors.age}</p>}
            </div>
    
            <div>
              <label>
                <input
                  type="checkbox"
                  name="attendingWithGuest"
                  checked={formData.attendingWithGuest}
                  onChange={handleChange}
                />
                Are you attending with a guest?
              </label>
            </div>
    
            {formData.attendingWithGuest && (
              <div>
                <label>Guest Name:</label>
                <input
                  type="text"
                  name="guestName"
                  value={formData.guestName}
                  onChange={handleChange}
                />
                {errors.guestName && <p className="error">{errors.guestName}</p>}
              </div>
            )}
    
            <button type="submit">Submit</button>
          </form>
          </div>
          
          <Modalform show={showModal} handleClose={handleCloseModal}>
            <h2>Form Summary</h2>
            <p>Name: {formData.name}</p>
            <p>Email: {formData.email}</p>
            <p>Age: {formData.age}</p>
            <p>Attending with guest: {formData.attendingWithGuest ? "Yes" : "No"}</p>
            {formData.attendingWithGuest && <p>Guest Name: {formData.guestName}</p>}
          </Modalform>
        </div>
      );
}

export default Eventform
