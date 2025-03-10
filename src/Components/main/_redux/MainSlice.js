import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, collection, getDocs, deleteDoc, query, where } from "firebase/firestore";
import { db } from "../../../firebase";

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async ({ userUid, isStared }, { rejectWithValue }) => {
    try {
      if (!userUid) return [];

      const q = isStared
        ? query(collection(db, "newData"), where("userId", "==", userUid), where("stared", "==", true))
        : query(collection(db, "newData"), where("userId", "==", userUid));

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteNote = createAsyncThunk("notes/deleteNote", async ({ noteId, userUid }, { dispatch }) => {
  await deleteDoc(doc(db, "newData", noteId));
  dispatch(fetchNotes({ userUid, isStared: false }));
});

const mainSlice = createSlice({
  name: "notes",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default mainSlice.reducer;
