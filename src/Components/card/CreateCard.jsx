import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveNote } from "./_redux/CardSlice";
import {
  FieldGroup,
  FieldInput,
  FieldLabel,
  FieldTextarea,
  ModalActions,
  ModalButton,
  ModalContent,
  ModalForm,
  ModalOverlay,
  ModalTitle,
  WordCount,
} from "./createCardStyles";

const CreateCard = ({ updatingData, showModel, userUid }) => {
  const refouterDiv = useRef();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.model);
  const [words, setWords] = useState(0);

  useEffect(() => {
    const handleMouseUp = (event) => {
      if (event.target === refouterDiv.current) {
        showModel(false);
      }
    };

    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [showModel]);

  useEffect(() => {
    if (updatingData?.description) {
      const wordList = updatingData.description.trim().split(/\s+/);
      setWords(wordList.filter((word) => word !== "").length);
    }
  }, [updatingData]);

  function handleSubmit(e) {
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
    const content = e.target.value.trim();
    const wordList = content.split(/\s+/);
    setWords(wordList.filter((word) => word !== "").length);
  }

  return (
    <ModalOverlay ref={refouterDiv} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <ModalContent onMouseUp={(e) => e.stopPropagation()}>
        <ModalTitle id="modal-title">
          {updatingData ? "Update Note" : "Add Note"}
        </ModalTitle>
        <ModalForm onSubmit={handleSubmit}>
          <FieldGroup>
            <FieldLabel htmlFor="note-title">Name</FieldLabel>
            <FieldInput
              id="note-title"
              defaultValue={updatingData?.name ?? ""}
              name="title"
              type="text"
              placeholder="Name"
              required
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="note-desc">Description</FieldLabel>
            <FieldTextarea
              id="note-desc"
              defaultValue={updatingData?.description ?? ""}
              onChange={wordsEntered}
              name="desc"
              placeholder="Explain more"
              maxLength="300"
              required
            />
            <WordCount>Words: {words}</WordCount>
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="note-date">Date</FieldLabel>
            <FieldInput
              id="note-date"
              defaultValue={updatingData?.date ?? ""}
              name="date"
              type="date"
              required
            />
          </FieldGroup>

          <ModalActions>
            <ModalButton type="button" onClick={() => showModel(false)}>
              Back
            </ModalButton>
            <ModalButton
              type="submit"
              $variant="primary"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Saving…" : "Save"}
            </ModalButton>
          </ModalActions>
        </ModalForm>
      </ModalContent>
    </ModalOverlay>
  );
};

export default React.memo(CreateCard);
