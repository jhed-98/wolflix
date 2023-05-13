import { configureStore } from "@reduxjs/toolkit";

import homeSlice from "./homeSlice";

// Esto crea una tienda Redux y también configura automáticamente la extensión Redux DevTools para que pueda inspeccionar la tienda mientras desarrolla.
export const store = configureStore({
    reducer: {
        home: homeSlice,
    },
});
//Typescript declarando los variables store de redux
// Inferir los tipos `RootState` y `AppDispatch` de la propia tienda
export type RootState = ReturnType<typeof store.getState>
// Tipo inferido: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch