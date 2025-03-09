import React, { useRef } from "react";
import {
  Cards,
  CardName,
  CardDescription,
  CardDate,
  CloseIcon,
  EditIcon,
  StarIcon,
} from "./CardStylled";
import { getLocalStorage, setLocalStorage } from "../utils";

const ShowCard = ({ data, handleClose, handleUpdate, handleCardData }) => {
  const refStar = useRef();
  const refCard = useRef();

  function handleCloseButton(id) {
    handleClose(id);
  }

  function updateFnc(id) {
    return handleUpdate(id);
  }

  function starFnc(id) {
    const getDataForStared = getLocalStorage("users");

    getDataForStared.forEach((item) => {
        let cardsDataForStared = item.cardData;
        const updatedData = cardsDataForStared.findIndex((findItem) => findItem.id === id);
        if (updatedData > -1) {
          cardsDataForStared.splice(updatedData, 1, {
            ...cardsDataForStared[updatedData],
            stared: !cardsDataForStared[updatedData].stared,
          });
          setLocalStorage("users", getDataForStared);
        }
    });
    handleCardData();
  }

  return (
    <>
      <Cards ref={refCard} key={data.id}>
        <CardName>{data.name}</CardName>
        <CardDescription>{data.description}</CardDescription>
        <CardDate>{data.date}</CardDate>
        <CloseIcon
          className="material-symbols-outlined"
          onClick={() => handleCloseButton(data.id)}
        >
          close
        </CloseIcon>
        <EditIcon
          className="material-symbols-outlined"
          onClick={() => updateFnc(data.id)}
        >
          edit
        </EditIcon>
        <StarIcon
          ref={refStar}
          stared={data.stared}
          onClick={() => starFnc(data.id)}
          className="material-symbols-outlined"
        >
          star
        </StarIcon>
      </Cards>
    </>
  );
};

export default React.memo(ShowCard);
