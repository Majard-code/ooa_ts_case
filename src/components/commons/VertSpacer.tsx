import styled from 'styled-components';

interface IProps {
  margin: number,
  color: string,
}

const VertSpacer = styled.div<IProps>`
margin: auto ${props => props.margin}px;
width: 1px;
height: 25px;
background-color: ${props => props.color};
`;

export default VertSpacer;
