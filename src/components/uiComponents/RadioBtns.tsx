import styled from 'styled-components';

export const Radio = styled.input`
cursor: pointer;
width: max-content;
padding: 0 20px;
line-height: 40px;
border: 1px solid rgb(220, 220, 220);
border-radius: 20px;
background-color: white;
&:active {
  box-shadow: inset 0px 0px 3px 1px rgb(220, 220, 220);
}
`;