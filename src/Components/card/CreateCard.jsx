import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveNote } from "./_redux/CardSlice";
import {
  FieldGroup,
  FieldInput,
  FieldLabel,
  FieldTextarea,
  ModalActions,
  ModalBody,
  ModalButton,
  ModalClose,
  ModalContent,
  ModalForm,
  ModalHeader,
  ModalOverlay,
  ModalSubtitle,
  ModalTitle,
  WordCount,
} from "./createCardStyles";

const EMPTY_FORM = { name: "", description: "", date: "" };

const CreateCard = ({ updatingData, showModel, userUid }) => {
  const refouterDiv = useRef();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.model);
  const isEdit = Boolean(updatingData);

  const [form, setForm] = useState(EMPTY_FORM);
  const [words, setWords] = useState(0);

  useEffect(() => {
    if (isEdit) {
      setForm({
        name: updatingData.name ?? "",
        description: updatingData.description ?? "",
        date: updatingData.date ?? "",
      });
      const wordList = (updatingData.description ?? "").trim().split(/\s+/);
      setWords(wordList.filter(Boolean).length);
    } else {
      setForm(EMPTY_FORM);
      setWords(0);
    }
  }, [isEdit, updatingData]);

  useEffect(() => {
    const handleMouseUp = (event) => {
      if (event.target === refouterDiv.current) {
        showModel(false);
      }
    };

    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [showModel]);

  const closeModal = () => {
    showModel(false);
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));

    if (field === "description") {
      const wordList = value.trim().split(/\s+/);
      setWords(wordList.filter(Boolean).length);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    const noteData = {
      name: form.name.trim(),
      description: form.description.trim(),
      date: form.date,
    };

    dispatch(saveNote({ updatingData, userUid, noteData })).then(() => {
      setForm(EMPTY_FORM);
      setWords(0);
      showModel(false);
    });
  }

  return (
    <ModalOverlay
      ref={refouterDiv}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <ModalContent onMouseUp={(e) => e.stopPropagation()}>
        <ModalClose type="button" onClick={closeModal} aria-label="Close">
          <span className="material-symbols-outlined">close</span>
        </ModalClose>

        <ModalHeader>
          <ModalTitle id="modal-title">
            {isEdit ? "Update Note" : "Add Note"}
          </ModalTitle>
          <ModalSubtitle>
            {isEdit
              ? "Make changes to your note and save when you're done."
              : "Capture a new idea — give it a name, description, and date."}
          </ModalSubtitle>
        </ModalHeader>

        <ModalBody>
          <ModalForm onSubmit={handleSubmit}>
            <FieldGroup>
              <FieldLabel htmlFor="note-title">
                <span className="material-symbols-outlined">title</span>
                Name
              </FieldLabel>
              <FieldInput
                id="note-title"
                name="title"
                type="text"
                placeholder="Note title"
                value={form.name}
                onChange={handleChange("name")}
                required
              />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel htmlFor="note-desc">
                <span className="material-symbols-outlined">notes</span>
                Description
              </FieldLabel>
              <FieldTextarea
                id="note-desc"
                name="desc"
                placeholder="Write your note here…"
                maxLength={300}
                value={form.description}
                onChange={handleChange("description")}
                required
              />
              <WordCount>{words} words · max 300 characters</WordCount>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel htmlFor="note-date">
                <span className="material-symbols-outlined">calendar_today</span>
                Date
              </FieldLabel>
              <FieldInput
                id="note-date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange("date")}
                required
              />
            </FieldGroup>

            <ModalActions>
              <ModalButton type="button" onClick={closeModal}>
                Cancel
              </ModalButton>
              <ModalButton
                type="submit"
                $variant="primary"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Saving…" : isEdit ? "Update" : "Save Note"}
              </ModalButton>
            </ModalActions>
          </ModalForm>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CreateCard;
