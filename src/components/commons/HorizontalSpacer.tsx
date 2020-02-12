import styled from 'styled-components';

interface IProps {
  margin: number,
  color: string,
}

const HorizontalSpacer = styled.div<IProps>`
grid-column: 1 / -1;
margin: ${props => props.margin}px auto;
width: 100%;
height: 1px;
background-color: ${props => props.color};
`;

export default HorizontalSpacer;
