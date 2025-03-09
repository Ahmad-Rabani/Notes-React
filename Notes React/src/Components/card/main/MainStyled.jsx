import styled from "styled-components";

export const HeadDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 98%;
  margin-top: 40px;
  height: 60px !important;
  position: relative;
  overflow: hidden;
`;

export const Notes = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  margin-left: 40px;

  h2 {
    color: black;
  }
`;

export const AllAndStared = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Button = styled.button`
height: 40px;
border-radius: 3px;
border: 1px solid #ccc;
cursor: pointer;
margin-left: ${(props) => props.secondry ? "5px" : "0px"};
width: ${(props) => props.secondry ? "110px" : "70px"};
background-color: ${(props) => props.isClicked ? "black" : "white"};
color: ${(props) => props.isClicked ? "white" : "black"};

&:hover {
  transition: easein-out 0.5s;
`;

export const AddNotes = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  right: 43px;
  bottom: 10px;
  align-items: center;

  span {
    cursor: pointer;
    width: 30px;
    height: 33px;
    border-radius: 50%;
    background-color: black;
    position: relative;

    h1 {
      width: 30px;
      height: 30px;
      margin: 0;
      color: white;
      position: absolute;
      bottom: 12px;
      left: 4px;
    }
  }
`;

export const CardsDiv = styled.div`
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  gap: 10px;
  width: 99%;
  min-height: 60vh;
  justify-items: center;
  justify-content: center;
  margin: 0 5px 0 5px;
`;