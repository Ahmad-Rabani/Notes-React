import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteNote, toggleStar } from "./_redux/ShowCardSlice";
import { SmLoader } from "../loader/Loading";
import Loader from "../loader/Loading";
import "./cardStyle.scss";

const ShowCard = ({ data, handleUpdate, userUid }) => {
  const dispatch = useDispatch();
  const refStar = useRef();
  const refCard = useRef();
  const [isBtnLoader, setBtnLoader] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const handleDelete = () => {
    setIsDelete(true);
    dispatch(deleteNote({ noteId: data.id, userUid })).then(() => {
      setIsDelete(false);
    });
  };

  const handleStar = () => {
    setBtnLoader(true);
    dispatch(toggleStar({ noteId: data.id, userUid })).then(() => {
      setBtnLoader(false);
    });
  };

  return (
    <div ref={refCard} className="card" key={data.id}>
      <p className="card-name">{data.name}</p>
      <p className="card-description">{data.description}</p>
      <p className="card-date">{data.date}</p>

      <span className="close-icon material-symbols-outlined" onClick={handleDelete}>
      {isDelete ? <Loader /> : "close"}
      </span>

      <span className="edit-icon material-symbols-outlined" onClick={() => handleUpdate(data.id)}>
        edit
      </span>

      <span ref={refStar} className={`star-icon material-symbols-outlined ${data.stared ? "stared" : ""}`} onClick={handleStar}>
        {isBtnLoader ? <SmLoader /> : "star"}
      </span>
    </div>
  );
};

export default React.memo(ShowCard);