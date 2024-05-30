import React, { useRef, useState } from "react";
import {
  OuterDiv,
  Form,
  InputsDiv,
  ButtonDiv,
  Button,
} from "./CreateCardStyled";
import { getLocalStorage, setLocalStorage } from "../utils";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../../firebase";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

const db = getFirestore(app);

const Create = ({ updatingData, showModel, handleCardData }) => {
  const refName = useRef();
  const refDescription = useRef();
  const refDate = useRef();
  const saveButton = useRef();
  const refWord = useRef();
  const [words, setWords] = useState();
  const refouterDiv = useRef();

  function backFnc() {
    showModel(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { title, desc, date } = e.target;

    let email;

    onAuthStateChanged(auth, (user) => {
      email = user.email;
    })

    await setDoc(doc(db, "data", "Afiliate"), {
      email: [{
        id: Math.floor(Math.random() * 10000),
        name: title.value,
        description: desc.value,
        date: date.value,
        stared: false,
      }]

    })

    // const get = getLocalStorage("users");
    // const getUserId = getLocalStorage("userId");

    // if (updatingData) {
    //   get.forEach((items) => {
    //     const getCardData = items.cardData || [];
    //     getCardData.filter((item) => {
    //       if (item.id === updatingData.id) {
    //         item.name = title.value;
    //         item.description = desc.value;
    //         item.date = date.value;
    //         let spliceIt = get.splice(
    //           0,
    //           4,
    //           item.name,
    //           item.description,
    //           item.date
    //         );
    //         setLocalStorage("users", spliceIt);
    //       }
    //     });
    //   });
    // } else {
    //   get.forEach((item) => {
    //     if (item.email === getUserId) {
    //       item.cardData.push({
    //         id: Math.floor(Math.random() * 10000),
    //         name: title.value,
    //         description: desc.value,
    //         date: date.value,
    //         stared: false,
    //       });
    //     }
    //   });
    //   setLocalStorage("users", get);
    // }
    title.value = "";
    desc.value = "";
    date.value = "";
    showModel(false);
    handleCardData();
  }

  function wordsEntered(e) {
    let word = refWord.current.value;
    let content = e.target.value;
    content.trim();
    let wordList = content.split(/\s/);
    let words = wordList.filter(function (element) {
      return element !== "";
    });
    word = words.length;
    setWords(word);
  }

  window.addEventListener("mouseup", function (event) {
    if (event.target === refouterDiv.current) {
      showModel(false);
    }
  });

  return (
    <OuterDiv ref={refouterDiv}>
      <InputsDiv>
        <h1>Add Note</h1>
        <Form onSubmit={handleSubmit}>
          <div>
            <h2>Name</h2>
            <input
              ref={refName}
              defaultValue={updatingData?.name}
              name="title"
              type="text"
              placeholder="Name"
              required
            />
          </div>
          <br />

          <div>
            <h2>Description</h2>
            <textarea
              defaultValue={updatingData?.description}
              onChange={wordsEntered}
              ref={refDescription}
              name="desc"
              type="text"
              placeholder="Explain More"
              maxLength="300"
              required
            ></textarea>
            <p>
              <span ref={refWord} id="word"></span> Words {words}
            </p>
          </div>
          <br />

          <div>
            <h2>Date</h2>
            <input
              defaultValue={updatingData?.date}
              ref={refDate}
              name="date"
              type="date"
              placeholder="mm/dd/yyyy"
              required
            />
          </div>
          <br />

          <ButtonDiv>
            <Button primary type="button" onClick={backFnc}>
              Back
            </Button>
            <Button ref={saveButton} secondry>
              Save
            </Button>
          </ButtonDiv>
        </Form>
      </InputsDiv>
    </OuterDiv>
  );
};

export default React.memo(Create);