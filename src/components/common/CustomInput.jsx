import React from 'react'
import Form from 'react-bootstrap/Form';

const CustomInput = ({id, type, placeholder, isShow, instructions, value, onChange, disabled}) => {
  return (
    <div>
      <Form.Control
        style={{borderColor: '#0f1317'}}
        type={type}
        id={id}
        name={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        aria-describedby="passwordHelpBlock"
        disabled={disabled}
      />
      {
        isShow && 
        <Form.Text id="passwordHelpBlock" muted>
            {instructions}
        </Form.Text>
      }
    </div>
  )
}

export default CustomInput
