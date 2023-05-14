import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name: "home",
    initialState: {
        url: {
            backdrop: '',
            poster: '',
            profile: '',
        },
        genres: {
            id: '',
            name: '',
        },
    },
    reducers: {
        // Methods
        getApiConfiguration: (state, action) => {
            state.url = action.payload;
        },
        getGenres: (state, action) => {
            state.genres = action.payload;
        },
    },
});

// Los creadores de acciones se generan para cada función de reducción de casos.
export const { getApiConfiguration, getGenres } = homeSlice.actions;

export default homeSlice.reducer;