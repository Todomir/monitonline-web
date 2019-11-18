import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Title = styled.h1`
  font-size: 50px;
  font-weight: 900px;
  text-align: center;
  margin-bottom: 20px;
`;

export const TextInput = styled.input`
  border: 1px solid rgb(235, 235, 235);
  border-radius: 3px;
  height: 45px;
  padding: 10px;
`;

export const Select = styled.select`
  border: 1px solid rgb(235, 235, 235);
  border-radius: 3px;
  height: 45px;
  padding: 10px;
`;

export const RadioButton = styled.input`
  margin: 0 30px;
`;

export const FormLabel = styled.label`
  font-weight: 700;
  margin-top: 30px;
  margin-bottom: 4px;
  font-size: 16px;
`;

export const Button = styled.button`
  margin-top: 40px;
  border: 0;
  border-radius: 3px;
  width: 100%;
  height: 45px;
  padding: 0 20px;
  font-size: 16px;
  font-weight: 900;
  color: #fff;
  background: #2575fc;
  cursor: pointer;
  box-shadow: 3px 3px 4px 0px rgba(0, 0, 0, 0.29);
  -webkit-transition: all 500ms ease;
  -moz-transition: all 500ms ease;
  -ms-transition: all 500ms ease;
  -o-transition: all 500ms ease;
  transition: all 500ms ease;

  &:hover {
    background: #6a11cb;
  }

  &:active {
    background: #2575f2;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #2575fc;
  cursor: pointer;
  -webkit-transition: all 500ms ease;
  -moz-transition: all 500ms ease;
  -ms-transition: all 500ms ease;
  -o-transition: all 500ms ease;
  transition: all 500ms ease;

  &:hover {
    padding: 5px;
    margin: 0 5px;
    color: #fff;
    font-weight: 700;
    background: #2575fc;
    border-radius: 3px;
  }
`;
