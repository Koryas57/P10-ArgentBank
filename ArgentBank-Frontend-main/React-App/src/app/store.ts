import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../app/feature/authSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
//Pour rendre le store accessible dans la console du navigateur mais pas en mode production
//utiliser store.getState() pour obtenir l'état actuel du store dans la console du navigateur
if (process.env.NODE_ENV !== 'production') {
    (window as any).store = store;
}

//Exportation du store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;