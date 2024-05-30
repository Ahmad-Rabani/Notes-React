import styled from "styled-components";

export const OuterDiv = styled.div`
position: absolute;
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
width: 100%;
background-color: rgba(0, 0, 0, 0.5);
color: #fff;
z-index: 1;
top: 0px;
display: flex;
`;

export const Form = styled.form`
position: relative;
width: 90%;
`;

export const InputsDiv = styled.div`
h1 {
  margin: 0;
  font-size: 30px;
  font-weight: 700;
  color: black;
  font-family: montserrat, arial, verdana;
}

h2 {
  margin: 0;
  padding: 0 0 5px 0px;
  font-size: 14px;
  font-weight: 700;
  color: black;
  background-clip: text;
  text-align: start;
}

display: grid;
grid-template-columns: 1fr;
justify-content: center;
align-items: center;
justify-items: center;

width: 400px;
height: 570px;
border: none;
border-radius: 8px;
background-color: rgb(255, 255, 255);
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
position: relative;

input {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 100% !important;
  box-sizing: border-box;
  font-family: montserrat;
  font-size: 13px;
}

textarea {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 100%;
  max-width: 360px;
  height: 130px;
  max-height : 130px;
  box-sizing: border-box;
  font-family: montserrat;
  font-size: 13px;
}

p {
  padding: 0 0 0px 2px;
  color: black;
  font-size: 12px;
  margin: 0;
  bottom: 125px;

  span {
    font-size: 12px;
  }
}
`;

export const ButtonDiv = styled.div`
display: flex;
flex-direction: row;
`;

export const Button = styled.button`
width: 100px;
padding: 10px;
border-radius: 3px;
background-color: white;
border: 1px solid #ccc;
cursor: pointer;
margin-right: 5px;

background-color: ${(props) => props.secondry ? "black" : "white"};
color: ${(props) => props.secondry ? "white" : "black"};

&:hover {
  transition: easein-out 0.5s;
}
`;