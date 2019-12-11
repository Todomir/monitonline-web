import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 20px;
  max-width: 100%;

  background-color: ${props => props.bgColor};
  justify-content: ${props => props.content};
  align-items: ${props => props.alignItems};
  width: ${props => props.width};
  height: ${props => props.height};
`;

export const Box = styled.div`
  display: flex;

  grid-column: ${props => props.gridColumn};
  flex-direction: ${props => (props.isInline ? 'row' : 'column')};
  justify-content: ${props => props.content};
  align-items: ${props => props.alignItems};
  text-align: ${props => props.align};
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${props => props.bgColor};
  padding: ${props => props.padding};
  color: ${props => props.color};
  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => props.marginBottom};
  margin-left: ${props => props.marginLeft};
  margin-right: ${props => props.marginRight};
`;

export const CardContainer = styled(Box)`
  border-radius: 38px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
`;

export const Form = styled.form`
  display: flex;

  width: ${props => props.width};
  height: ${props => props.height};
  flex-direction: ${props => (props.isInline ? 'row' : 'column')};
  justify-content: ${props => props.content};
  align-items: ${props => props.alignItems};
  text-align: ${props => props.align};
`;

export const FlexWrapper = styled.div`
  display: flex;
  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => props.marginBottom};
  margin-left: ${props => props.marginLeft};
  margin-right: ${props => props.marginRight};
  flex-direction: ${props => (props.isInline ? 'row' : 'column')};
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
  font-size: 70px;
  font-weight: 900px;

  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => props.marginBottom};
  padding-top: ${props => props.paddingTop};
  padding-bottom: ${props => props.paddingBottom};
`;

export const SubTitle = styled.h2`
  font-size: 36px;

  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => props.marginBottom};
  padding-top: ${props => props.paddingTop};
  padding-bottom: ${props => props.paddingBottom};
`;

export const TextSmall = styled.h5`
  font-weight: 400;
  margin-bottom: ${props => props.marginBottom};
`;

export const Paragraph = styled.p`
  font-size: 18px;
`;

export const TextInput = styled.input`
  border: 1px solid rgb(235, 235, 235);
  border-radius: 3px;
  height: 45px;
  padding: 10px;
`;

export const Select = styled.select`
  background-color: #fff;
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
  border-radius: 20px;
  box-sizing: border-box;
  color: #ffffff;
  font-weight: bold;
  padding: 10px 40px;
  cursor: pointer;
  max-width: 230px;

  border: ${props => (props.outline ? '3px solid #FFFFFF' : 'rgba(0, 0, 0, 0)')};
  background-color: ${props => (props.outline ? 'rgba(0, 0, 0, 0)' : '#B276FF')};
  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => props.marginBottom};
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
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => props.marginBottom};
  background: ${props => props.background};
  color: ${props => props.color};
  padding: ${props => props.padding};
  border-radius: 3px;
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
`;

export const StyledLink = styled(Link)`
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => props.marginBottom};
  background: ${props => props.background};
  color: ${props => props.color};
  padding: ${props => props.padding};
  border-radius: 3px;
  text-decoration: none;
  color: #fff;
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
