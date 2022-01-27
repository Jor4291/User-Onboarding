import './App.css';
import React, { useState, useEffect } from 'react';
import Form from './Form'
import axios from "axios"


const initialFormValues = {
  
  username: '',
  email: '',
  role: '',
};

export default function App() {
  const[teamMembers, setTeamMembers] = useState([]);

  const [formValues, setFormValues] = useState(initialFormValues);
  const [formError, setFormError]=useState("");
  
  
  
  const updateForm = (inputName, inputValue) => {
    setFormValues({ ...formValues, [inputName]: inputValue });
  }

  const submitForm = () => {

    const newTeamMember = { 
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      role: formValues.role
    }

    if (!newTeamMember.username || !newTeamMember.email || !newTeamMember.role) {
      setFormError("Enter the values ya filthy animal");
      return;
    }

    axios.post('fakeapi.com', newTeamMember)
      .then(res => {
        setTeamMembers([res.data, ...teamMembers]);
        setFormError("");
      }).catch(err => console.error(err))
  }

  useEffect(() => {
    axios.get('fakeapi.com').then(res => setTeamMembers(res.data))
  }, [])
  
  return (
    <div className="App">
      <h1>Team Member Form!</h1>
      <h3 className="error-text">{formError}</h3>
      <Form
              values={formValues}
              submit={submitForm}
              update={updateForm}
              />
    </div>
  );
}

