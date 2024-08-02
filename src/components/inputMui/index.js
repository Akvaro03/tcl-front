import React from "react";
import Input from '@mui/base/Input';
import styled from "@emotion/styled";
import { sendDataEnter } from "../../hooks/sendDataEnter";

function InputMui({ value, onChange, sendData, type = 'text' }) {
  return <CustomInput value={value} onChange={onChange} sendData={sendData} type={type} />;
}

const CustomInput = React.forwardRef(function CustomInput({ value, onChange, sendData, type, ...rest }, ref) {
  return (
    <Input
      value={value}
      type={type}
      onChange={({ target: { value } }) => onChange(value)}
      onKeyDown={(e) => sendDataEnter(e, sendData)}
      slots={{ input: StyledInputElement }}
      ref={ref}
      {...rest}
    />
  );
});


const StyledInputElement = styled('input')(
  ({ theme }) => `
    width: 100%;
    height: 5px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    margin: 0px;
    border-radius: 12px;
    color: ${grey[900]};
    background: ${'#fff'};
    border: 1px solid ${grey[200]};
    box-shadow: 0px 2px 2px ${grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);
const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};
const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

export default InputMui;