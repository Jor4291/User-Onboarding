import React from 'react'

export default function Form(props) {
  const { values,
        submit,
        change,
        disabled,
        errors, 
    } = props;

  const onChange = evt => {
    const { name, value, checked, type} = evt.target;
    const trueValue = type === "checkbox" ? checked : value;
    change(name, trueValue);
  };

  const onSubmit = evt => {
    evt.preventDefault();
    submit();
  }

  return (
    <form className='form-container' onSubmit={onSubmit}>
      <div className='form-group inputs'>
        <h2> Add a Team Member!</h2>

        <button disabled={disabled}>submit</button>

                <div className='errors'>
        
          <div>{errors.username}</div>
          <div>{errors.email}</div>
          <div>{errors.role}</div>
          <div>{errors.password}</div>
        </div>
      
    






        <label>Username
          <input
            type="text"
            value={values.username}
            onChange={onChange}
            name="username"
          />
        </label>

        <label>Email
          
          <input
            type="email"
            name="email"
            placeholder="Enter an email!"
            maxLength="42"
            value={values.email}
            onChange={onChange}
          />
        </label>

      
        
        <label>Role
         
          <select value={values.role} name="role" onChange={onChange}>
            <option value="">-- Select a Role --</option>
            <option value="Junior Dev">Junior</option>
            <option value="Senior Dev">Senior</option>
            <option value="Master Hacker">Master</option>
          </select>
        </label>
        <input type="color" name="color" />

        <div className='submit'>
          <button disabled={!values.username || !values.email || !values.role}>submit</button>
        </div>
      </div>
    </form>
  )
}
