import React, { useRef, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import SmLoader from "../loader/Loading";
import "./cardStyle.scss";

const ShowCard = ({ data, handleClose, handleUpdate, handleCardData, userUid }) => {
  const refStar = useRef();
  const refCard = useRef();
  const [isBtnLoader, setBtnLoader] = useState(false);

  function handleCloseButton(id) {
    handleClose(id);
  }

  function updateFnc(id) {
    return handleUpdate(id);
  }

  async function starFnc(id) {
    const docRef = doc(db, "newData", id);
    const docSnap = await getDoc(docRef);

    setBtnLoader(true);
    let dataStore = docSnap.data();

    const newDocRef = doc(db, "newData", id);
    await setDoc(newDocRef, {
      id: dataStore.id,
      userId: userUid,
      name: dataStore.name,
      description: dataStore.description,
      date: dataStore.date,
      stared: !dataStore.stared,
    }).then(() => {
      handleCardData(userUid);
      setBtnLoader(false);
    });
  }

  return (
    <div ref={refCard} className="card" key={data.id}>
      <p className="card-name">{data.name}</p>
      <p className="card-description">{data.description}</p>
      <p className="card-date">{data.date}</p>

      <span className="close-icon material-symbols-outlined" onClick={() => handleCloseButton(data.id)}>
        close
      </span>

      <span className="edit-icon material-symbols-outlined" onClick={() => updateFnc(data.id)}>
        edit
      </span>

      <span ref={refStar} className={`star-icon material-symbols-outlined ${data.stared ? "stared" : ""}`} onClick={() => starFnc(data.id)}>
        {isBtnLoader ? <SmLoader /> : "star"}
      </span>
    </div>
  );
};

export default React.memo(ShowCard);
