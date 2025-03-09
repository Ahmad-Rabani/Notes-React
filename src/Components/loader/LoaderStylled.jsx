import styled from "styled-components";
<style>
@import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
</style>

export const LoadingsScreen = styled.div`
  position: fixed;
  z-index: 9999;
  top: 50%;
  left: 50%;
  background-color: #fff;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const SmallLoader = styled.div`
  width: 5px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: white;
  --_m: 
    conic-gradient(#0000 10%,#000),
    linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
          mask: var(--_m);
  -webkit-mask-composite: source-out;
          mask-composite: subtract;
  animation: l3 1s infinite linear;

@keyframes l3 {to{transform: rotate(1turn)}}
`;