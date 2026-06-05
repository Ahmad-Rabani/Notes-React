import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../../firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import { DEFAULT_CARD_COLOR } from "../../utils/cardColors";
import { fetchNotes } from "../../main/_redux/MainSlice";

export const saveNote = createAsyncThunk(
  "notes/saveNote",
  async ({ updatingData, userUid, noteData }, { dispatch, getState }) => {
    const noteRef = updatingData
      ? doc(db, "newData", updatingData.id)
      : doc(collection(db, "newData"));

    const { data } = getState().main;
    const maxOrder = data.reduce(
      (max, note) => Math.max(max, typeof note.order === "number" ? note.order : -1),
      -1
    );
    const order = updatingData?.order ?? maxOrder + 1;

    // Build the document — image fields are only included when explicitly provided
    // so that a save without image changes never clobbers the stored URL/path.
    const imageFields = {};
    if ("imageURL" in noteData) imageFields.imageURL = noteData.imageURL ?? null;
    if ("imagePath" in noteData) imageFields.imagePath = noteData.imagePath ?? null;

    await setDoc(
      noteRef,
      {
        id: updatingData ? updatingData.id : noteRef.id,
        userId: userUid,
        name: noteData.name,
        description: noteData.description,
        date: noteData.date,
        tags: noteData.tags || [],
        stared: updatingData ? updatingData.stared : false,
        order,
        cardColor: updatingData?.cardColor ?? DEFAULT_CARD_COLOR,
        ...imageFields,
      },
      { merge: true }
    );

    dispatch(fetchNotes({ userUid, isStared: false }));
    return noteData;
  }
);

const cardSlice = createSlice({
  name: "model",
  initialState: { status: "idle" },
  extraReducers: (builder) => {
    builder
      .addCase(saveNote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveNote.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(saveNote.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default cardSlice.reducer;
