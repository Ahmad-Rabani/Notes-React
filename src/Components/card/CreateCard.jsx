import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveNote } from "./_redux/CardSlice";
import "./cardStylled.scss";

const Model = ({ updatingData, showModel, userUid }) => {
  const refName = useRef();
  const refDescription = useRef();
  const refDate = useRef();
  const refouterDiv = useRef();
  const dispatch = useDispatch();

  const [words, setWords] = useState();
  const { status } = useSelector((state) => state.model);

  function backFnc() {
    showModel(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { title, desc, date } = e.target;
  
    const noteData = {
      name: title.value,
      description: desc.value,
      date: date.value,
    };
  
    dispatch(saveNote({ updatingData, userUid, noteData })).then(() => {
      showModel(false);
    });
  }

  function wordsEntered(e) {
    let content = e.target.value.trim();
    let wordList = content.split(/\s+/);
    setWords(wordList.filter((word) => word !== "").length);
  }

  window.addEventListener("mouseup", function (event) {
    if (event.target === refouterDiv.current) {
      showModel(false);
    }
  });

  return (
    <div className="modal-overlay" ref={refouterDiv}>
      <div className="modal-content">
        <h1>{updatingData ? "Update Note" : "Add Note"}</h1>
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
            <p>Words: {words}</p>
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
            <button className="modal-button secondary" disabled={status === "loading"}>
              {status === "loading" ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(Model);
