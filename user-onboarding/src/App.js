import './App.css';
import React, { useState, useEffect } from 'react';
import Form from './Form';
import axios from "axios";
import * as yup from 'yup';
import Member from './Member';
import schema from './formSchema';


const initialFormValues = {
  
  username: '',
  email: '',
  password: '',
  role: '',
  tos: false,
};

const initialFormErrors = {
 
  username: '',
  email: '',
  password: '',
  role: '',
};

const initialTeamMembers = []
const initialDisabled = true;

export default function App() {
  const[teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors]=useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  
  
  const getTeamMembers = () => {

    axios.get('https://reqres.in/api/users')
      .then(res => {
        setTeamMembers(res.data);
      }).catch(err => console.error(err))
  };

  const postNewTeamMember = newTeamMember => {
    axios.post('https://reqres.in/api/users', newTeamMember)
      .then(res => {
        setTeamMembers([res.data, ...teamMembers])
        setFormValues(initialFormValues);
      }).catch(err => console.error(err))
  };

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  };

  const inputChange = (name, value) => {
    
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value 
    });
  };


  const submitForm = () => {
    const newTeamMember = { 
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      role: formValues.role.trim(),
      password: formValues.password.trim(),
      ToS: formValues.tos.trim(),
    };

    postNewTeamMember(newTeamMember);

  };

  useEffect(() => {
    getTeamMembers()
  }, []);

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div className='Member-container'>
      <header><h1>Team Member App!</h1></header>

      <Form
        values={formValues}
        change={inputChange}
        submit={submitForm}
        disabled={disabled}
        errors={formErrors}
      />

      {
        teamMembers.map(member => {
          return (
            <Member key={member.id} details={member} />
          )
        })
      };
    </div>
  )
};