import {
  HeadDiv,
  Notes,
  AllAndStared,
  Button,
  AddNotes,
  CardsDiv,
} from "./MainStyled";
import Create from "../CreateCard";
import ShowCard from "../../Show Card/Card";
import { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../../utils";

const Main = () => {
  const [data, setData] = useState([]);
  const [currentId, setId] = useState();
  const [iscreateModal, setModel] = useState(false);
  const [bgColor, setBgColor] = useState(false);

  const handleCardData = () => {
    const dataOfLocalStorage = getLocalStorage("users");
    const userId = getLocalStorage("userId");

    dataOfLocalStorage.map((item) => {
      if (item.email === userId) {
        let response = item.cardData;
        setData(response);
      }
    });
  };

  useEffect(() => {
    handleCardData();
  }, [setData]);

  const closeFnc = (id) => {
    const dataOfLocalStorage = getLocalStorage("users");
      dataOfLocalStorage.forEach((items) => {
        let removeItem = items.cardData;
        removeItem.forEach((item) => {
          if (item.id === id) {
            let updateData = removeItem.filter((objId) => objId.id !== id);
            console.log(removeItem)
            setLocalStorage("users", dataOfLocalStorage);
            setData(updateData);
          }
        })
      });
  };

  const updateData = (id) => {
    setModel(true);
    setId(id);
  };

  function back(bol) {
    setId();
    setModel(bol);
  }

  function allCards() {
    setData(data.filter((item) => item));
    handleCardData();
    setBgColor(!bgColor);
  }

  function allStared() {
    setData((pre) => pre.filter((item) => item.stared));
    setBgColor(!bgColor);
  }

  return (
    <div>
      <HeadDiv>
        <Notes>
          <h2>Notes</h2>
        </Notes>
        <AllAndStared>
          <Button primary isClicked={!bgColor} onClick={allCards}>
            All
          </Button>
          <Button
            name="allStaredButton"
            secondry
            onClick={allStared}
            type="button"
            isClicked={bgColor}
          >
            Only Stared
          </Button>
        </AllAndStared>
      </HeadDiv>
      <br />

      {iscreateModal && (
        <Create
          handleCardData={handleCardData}
          updatingData={data.find((item) => item.id === currentId)}
          passData={data}
          showModel={back}
        />
      )}

      <CardsDiv>
        {data.map((item) => (
          <ShowCard
            key={item.id}
            data={item}
            handleClose={closeFnc}
            handleUpdate={updateData}
            handleStar={allStared}
            handleCardData={handleCardData}
          />
        ))}
      </CardsDiv>

      <AddNotes>
        <h2>Add Notes </h2>
        <span onClick={() => setModel(true)}>
          <h1>+</h1>
        </span>
      </AddNotes>
    </div>
  );
};

export default Main;