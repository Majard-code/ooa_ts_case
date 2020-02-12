import { keyframes } from "styled-components";

// ***** ВРАЩЕНИЕ *****
export const spin = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;
// ***** ПОЯВЛЕНИЕ СВЕРХУ ВНИЗ *****
export const fadeInDown = keyframes`
from {
  opacity: 0;
  transform: translate3d(0, -30px, 0);
}
to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
`;