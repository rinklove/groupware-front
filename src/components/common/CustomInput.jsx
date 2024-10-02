import React from 'react'
import Form from 'react-bootstrap/Form';

const CustomInput = ({id, type, placeholder, isShow, instructions, value, onChange}) => {
  return (
    <div>
      <Form.Control
        type={type}
        id={id}
        name={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        aria-describedby="passwordHelpBlock"
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
