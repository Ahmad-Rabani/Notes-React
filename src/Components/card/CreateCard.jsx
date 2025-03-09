import React, { useRef, useState } from "react";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import "./cardStylled.scss"

const Model = ({ updatingData, showModel, handleCardData, userUid }) => {
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

    if (updatingData) {
      showModel(false);
      const newDocRef = doc(db, "newData", updatingData.id);
      await setDoc(newDocRef, {
        id: updatingData.id,
        userId: userUid,
        name: title.value,
        description: desc.value,
        date: date.value,
        stared: false,
      });
    } else {
      showModel(false);
      const usersCollectionRef = collection(db, "newData");
      const { id } = await addDoc(usersCollectionRef, {});
      const newDocRef = doc(usersCollectionRef, id);
      await setDoc(newDocRef, {
        id: id,
        userId: userUid,
        name: title.value,
        description: desc.value,
        date: date.value,
        stared: false,
      });
    }

    title.value = "";
    desc.value = "";
    date.value = "";
    handleCardData(userUid);
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
    <div className="modal-overlay" ref={refouterDiv}>
      <div className="modal-content">
        <h1>Add Note</h1>
        <form className="modal-form" onSubmit={handleSubmit}>
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

          <div className="modal-buttons">
            <button className="modal-button primary" type="button" onClick={backFnc}>
              Back
            </button>
            <button ref={saveButton} className="modal-button secondry">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(Model);