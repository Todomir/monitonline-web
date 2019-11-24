import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FlexWrapper = styled.div`
  display: flex;
  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => props.marginBottom};
  margin-left: ${props => props.marginLeft};
  margin-right: ${props => props.marginRight};
  flex-direction: ${props => (props.isInline ? 'row' : 'column')};
  align-items: center;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  background: rgb(240, 240, 240);
  padding: 20px;
  width: 100%;
  max-width: 500px;
  margin-top: 30px;
  margin-bottom: 50px;
  border-radius: 5px;
`;

export const Title = styled.h1`
  font-size: 50px;
  font-weight: 900px;
  text-align: center;
  margin-bottom: 20px;
`;

export const SubTitle = styled.h2`
  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => props.marginBottom};
`;

export const TextSmall = styled.h5`
  font-weight: 400;
  margin-bottom: ${props => props.marginBottom};
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
  margin-top: 30px;
  border: 0;
  border-radius: 3px;
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

export const EditableButton = styled(Button)`
  max-width: 100%;
  width: ${props => props.width};
  margin: 0 auto;
  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => props.marginBottom};
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
`;

export const SmallLink = styled.label`
  max-width: 100%;
  width: 200px;
  cursor: pointer;
  font-size: 14px;
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
    background: #6a11cb;
    border-radius: 3px;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  max-width: 100%;
  width: 200px;
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
    background: #6a11cb;
    border-radius: 3px;
  }

  p {
    font-size: 9px;
    margin: 7px 20px;
  }
`;

export const Calendar = styled.div`
  margin: 20px 0px;

  a {
    background: #6a11cb;
    color: #fff;
    border: none;
    padding: 2px;
    cursor: pointer;
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -ms-transition: all 500ms ease;
    -o-transition: all 500ms ease;
    transition: all 500ms ease;

    &:hover {
      background: #8f27ff;
      padding: 6px;
      margin: 10px;
    }
  }
`;

export const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
`;

export const ModalContainer = styled(CardContent)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
