import styled from "styled-components";

export const CloseIcon = styled.span`
  color: rgb(255, 255, 255);
  cursor: pointer;
  background-color: black;
  border-radius: 50%;
  font-size: 22px !important;
  transition: all ease-in-out;
  position: absolute;
  right: -10px;
  top: -10px;
  visibility: hidden;
`;


export const Cards = styled.div`
  width: 100%;
  height: 250px;
  border: 2px solid blue;
  border-radius: 7px;
  background-color: rgb(30 33 37);
  border: none;
  max-width: 450px;
  position: relative;

  &:hover ${CloseIcon} {
    visibility: visible;
  }

  // &:nth-child(even){
  //   background-color: lightgreen;
  // }
`;

export const CardName = styled.p`
  font-size: 16px;
  font-weight: 700;
  padding: 10px 0 0 15px;
  color: rgb(249, 237, 237);
  margin: 0;
`;

export const CardDescription = styled.p`
  font-size: 13px;
  padding: 10px 0 0 15px;
  color: rgb(249, 237, 237);
  height: 170px;
  margin: 0;
`;

export const CardDate = styled.p`
  font-size: 12px;
  padding: 10px 0 0 15px;
  color: rgb(249, 237, 237);
  margin: 0;
`;



export const EditIcon = styled.span`
  position: absolute;
  right: 40px;
  bottom: 10px;
  font-size: 18px;
  margin-right: 10px;
  margin-top: 10px;
  color: rgb(249, 237, 237);
  cursor: pointer;
  background-color: black;
  border-radius: 50%;
  padding: 4px;
  font-size: 25px;

  &:hover{
    padding: 6px;
  }
`;

export const StarIcon = styled.span`
  position: absolute;
  right: 2px;
  bottom: 10px;
  font-size: 18px;
  margin-right: 10px;
  margin-top: 10px;
  color: ${(props) => props.stared ? 'yellow' : 'white'};
  cursor: pointer;
  background-color: black;
  border-radius: 50%;
  padding: 4px;
  font-size: 25px;

  &:hover{
    padding: 6px;
  }
`;
