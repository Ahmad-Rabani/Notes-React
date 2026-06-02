import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { fetchNotes } from "../../main/_redux/MainSlice";
import { DEFAULT_CARD_COLOR } from "../../utils/cardColors";

export const updateCardColor = createAsyncThunk(
  "notes/updateCardColor",
  async ({ noteId, userUid, cardColor }, { dispatch, rejectWithValue }) => {
    try {
      await setDoc(
        doc(db, "newData", noteId),
        { cardColor: cardColor || DEFAULT_CARD_COLOR },
        { merge: true }
      );
      dispatch(fetchNotes({ userUid, isStared: false }));
      return { noteId, cardColor };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
