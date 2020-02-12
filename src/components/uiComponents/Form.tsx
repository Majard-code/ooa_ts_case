import styled from 'styled-components';
import { fadeInDown } from '../../animations/Keyframes';

const Form = styled.section`
display: grid;
align-self: center;
justify-self: center;
gap: 15px;
justify-items: center;
width: 320px;
height: max-content;
padding: 20px;
box-shadow: 0 0 10px 5px rgb(220, 220, 220);
background-color: rgb(245, 245, 245);
text-align: center;
animation: ${fadeInDown} 500ms ease-out both;
a {
  color: black;
}
@media (max-width: 359px) {
  width: 100%;
}
`;

export default Form;
