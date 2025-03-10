import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "../Components/card/_redux/CardSlice";
import mainSlice from "../Components/main/_redux/MainSlice";
import showCardSlice from "../Components/Show Card/_redux/ShowCardSlice"


export const store = configureStore({
  reducer: { model: notesSlice, main: mainSlice,showCard:showCardSlice},
});
