import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, toggleStar } from "./_redux/ShowCardSlice";
import { saveNote } from "../card/_redux/CardSlice";
import { SmLoader } from "../loader/Loading";
import AnimatedCard from "./AnimatedCard";
import {
  ActionButton,
  CardActions,
  CardDate,
  CardDescription,
  CardHeader,
  CardTitle,
  EditActions,
  EditForm,
  FieldInput,
  FieldLabel,
  FieldTextarea,
  IconButton,
  NoteCard,
  SaveCheck,
  ViewContent,
} from "./noteCardStyles";

const ShowCard = ({
  data,
  userUid,
  isEntering = false,
  isExiting = false,
  onExitComplete,
}) => {
  const dispatch = useDispatch();
  const { status: saveStatus } = useSelector((state) => state.model);

  const [isEditing, setIsEditing] = useState(false);
  const [isStarLoading, setStarLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showSaveCheck, setShowSaveCheck] = useState(false);
  const [savedPulse, setSavedPulse] = useState(false);

  const nameRef = useRef(null);
  const descRef = useRef(null);
  const dateRef = useRef(null);

  useEffect(() => {
    if (isEditing && nameRef.current) {
      nameRef.current.focus();
    }
  }, [isEditing]);

  const handleDelete = () => {
    if (isDeleting) return;
    setIsDeleting(true);
  };

  const handleExitComplete = () => {
    dispatch(deleteNote({ noteId: data.id, userUid }));
    onExitComplete?.();
  };

  const handleStar = () => {
    setStarLoading(true);
    dispatch(toggleStar({ noteId: data.id, userUid })).finally(() => {
      setStarLoading(false);
    });
  };

  const handleEditOpen = () => {
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const noteData = {
      name: form.title.value,
      description: form.desc.value,
      date: form.date.value,
    };

    dispatch(saveNote({ updatingData: data, userUid, noteData })).then(() => {
      setIsEditing(false);
      setShowSaveCheck(true);
      setSavedPulse(true);

      setTimeout(() => setShowSaveCheck(false), 1200);
      setTimeout(() => setSavedPulse(false), 700);
    });
  };

  return (
    <AnimatedCard
      isEntering={isEntering}
      isExiting={isDeleting || isExiting}
      onExitComplete={handleExitComplete}
    >
      <NoteCard
        $isEditing={isEditing}
        $savedPulse={savedPulse}
        aria-label={`Note: ${data.name}`}
      >
        {showSaveCheck && (
          <SaveCheck aria-hidden="true">
            <span className="material-symbols-outlined">check</span>
          </SaveCheck>
        )}

        {!isEditing ? (
          <ViewContent>
            <CardHeader>
              <CardTitle>{data.name}</CardTitle>
            </CardHeader>
            <CardDescription>{data.description}</CardDescription>
            <CardDate dateTime={data.date}>{data.date}</CardDate>

            <CardActions className="card-actions">
              <IconButton
                type="button"
                $variant="danger"
                onClick={handleDelete}
                disabled={isDeleting}
                aria-label={`Delete note ${data.name}`}
              >
                {isDeleting ? (
                  <SmLoader />
                ) : (
                  <span className="material-symbols-outlined">close</span>
                )}
              </IconButton>
              <IconButton
                type="button"
                onClick={handleEditOpen}
                aria-label={`Edit note ${data.name}`}
              >
                <span className="material-symbols-outlined">edit</span>
              </IconButton>
              <IconButton
                type="button"
                $active={data.stared}
                onClick={handleStar}
                disabled={isStarLoading}
                aria-label={data.stared ? "Unstar note" : "Star note"}
                aria-pressed={data.stared}
              >
                {isStarLoading ? (
                  <SmLoader />
                ) : (
                  <span className="material-symbols-outlined">star</span>
                )}
              </IconButton>
            </CardActions>
          </ViewContent>
        ) : (
          <EditForm onSubmit={handleEditSubmit}>
            <div>
              <FieldLabel htmlFor={`title-${data.id}`}>Name</FieldLabel>
              <FieldInput
                id={`title-${data.id}`}
                ref={nameRef}
                name="title"
                type="text"
                defaultValue={data.name}
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor={`desc-${data.id}`}>Description</FieldLabel>
              <FieldTextarea
                id={`desc-${data.id}`}
                ref={descRef}
                name="desc"
                defaultValue={data.description}
                maxLength={300}
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor={`date-${data.id}`}>Date</FieldLabel>
              <FieldInput
                id={`date-${data.id}`}
                ref={dateRef}
                name="date"
                type="date"
                defaultValue={data.date}
                required
              />
            </div>
            <EditActions>
              <ActionButton type="button" onClick={handleEditCancel}>
                Cancel
              </ActionButton>
              <ActionButton
                type="submit"
                $variant="primary"
                disabled={saveStatus === "loading"}
              >
                {saveStatus === "loading" ? "Saving…" : "Save"}
              </ActionButton>
            </EditActions>
          </EditForm>
        )}
      </NoteCard>
    </AnimatedCard>
  );
};

export default React.memo(ShowCard);
