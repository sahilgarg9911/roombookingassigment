import React, { useState } from 'react';
import "../styles/Form.css";
import toast from "react-hot-toast";

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Phone number is invalid';
    }
    if (!address.trim()) {
      newErrors.address = 'Address is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      const formData = { name, email, phoneNumber, address };
      fetch('http://localhost:2222/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }
    toast.success("User Details sent to the api");
  };

  return (
    <form onSubmit={handleSubmit} className="formpage">
      
        <label htmlFor="name">Name:</label>
        <input className="formpageinputs" type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />
        {errors.name && <span>{errors.name}</span>}
      
      
        <label htmlFor="email">Email:</label>
        <input className="formpageinputs" type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        {errors.email && <span>{errors.email}</span>}
      
      
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input className="formpageinputs" type="tel" id="phoneNumber" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
        {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
      
        <label htmlFor="address">Address:</label>
        <input className="formpageinputs" type="text" id="address" value={address} onChange={(event) => setAddress(event.target.value)} />
        {errors.address && <span>{errors.address}</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
