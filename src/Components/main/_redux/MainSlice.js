import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, collection, getDocs, deleteDoc, query, where, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const sortNotes = (notes) =>
  [...notes].sort((a, b) => {
    const orderA = typeof a.order === "number" ? a.order : Number.MAX_SAFE_INTEGER;
    const orderB = typeof b.order === "number" ? b.order : Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) return orderA - orderB;
    return (a.name || "").localeCompare(b.name || "");
  });

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async ({ userUid, isStared }, { rejectWithValue }) => {
    try {
      if (!userUid) return [];

      const q = isStared
        ? query(collection(db, "newData"), where("userId", "==", userUid), where("stared", "==", true))
        : query(collection(db, "newData"), where("userId", "==", userUid));

      const querySnapshot = await getDocs(q);
      const notes = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      return sortNotes(notes);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateNotesOrder = createAsyncThunk(
  "main/updateNotesOrder",
  async ({ orderedNotes, userUid }, { rejectWithValue, dispatch }) => {
    try {
      await Promise.all(
        orderedNotes.map((note, index) =>
          setDoc(doc(db, "newData", note.id), { order: index }, { merge: true })
        )
      );
      return orderedNotes.map((note, index) => ({ ...note, order: index }));
    } catch (error) {
      dispatch(fetchNotes({ userUid, isStared: false }));
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
    reorderStatus: "idle",
  },
  reducers: {
    setNotesOrderOptimistic: (state, action) => {
      state.data = action.payload;
    },
  },
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
      })
      .addCase(updateNotesOrder.pending, (state) => {
        state.reorderStatus = "loading";
      })
      .addCase(updateNotesOrder.fulfilled, (state, action) => {
        state.reorderStatus = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateNotesOrder.rejected, (state, action) => {
        state.reorderStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { setNotesOrderOptimistic } = mainSlice.actions;
export default mainSlice.reducer;
