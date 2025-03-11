import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../../firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { fetchNotes } from "../../main/_redux/MainSlice";

export const saveNote = createAsyncThunk(
  "notes/saveNote",
  async ({ updatingData, userUid, noteData }, { dispatch }) => {
    const noteRef = updatingData
      ? doc(db, "newData", updatingData.id)
      : doc(collection(db, "newData"));

    await setDoc(noteRef, {
      id: updatingData ? updatingData.id : noteRef.id,
      userId: userUid,
      name: noteData.name,
      description: noteData.description,
      date: noteData.date,
      stared: updatingData ? updatingData.stared : false,
    });

    // Fetch updated notes list
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
