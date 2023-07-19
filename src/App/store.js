import { configureStore } from "@reduxjs/toolkit";
import wordleWordsReducer from "../features/wordleWordsSlice";

const store = configureStore({
    reducer: {
        wordleWords: wordleWordsReducer
    }
})

export default store