import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// URL de base de l'API
const API_BASE_URL = 'http://localhost:3001/api/v1';


// Interface pour un utilisateur
interface User {
    email: string;
    firstName: string;
    lastName: string;
    userName: string | null;
    createdAt: string;
    updatedAt: string;
    id: string;
}

// Interface pour l'état initial
interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    isEditingProfile: boolean; // Permet de gérer l'édition du profil
    userProfile: User | null;  // Stocke les données du profil utilisateur
}


// On récupère le token depuis localStorage ou sessionStorage
const tokenFromStorage = localStorage.getItem('token') || sessionStorage.getItem('token');
const initialState: AuthState = {
    token: tokenFromStorage ? tokenFromStorage : null,
    isAuthenticated: !!tokenFromStorage,  // Si le token existe, l'utilisateur est authentifié
    loading: false,
    error: null,
    isEditingProfile: false, // Initialement, l'utilisateur n'est pas en mode édition
    userProfile: null, // Initialement, le profil utilisateur n'est pas chargé
};


// AsyncThunk pour gérer la connexion
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string; rememberMe: boolean }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/user/login`, credentials);
            const token = response.data.body.token;
            // On stocke le token dans le storage approprié
            if (credentials.rememberMe) {
                localStorage.setItem('token', token); // On utilise localStorage si "Remember Me" est coché pour assurer la persistance du token
            } else {
                sessionStorage.setItem('token', token); // Sinon on utilise sessionStorage pour une session
            }
            return token;
        } catch (error) {
            console.error(error);
            return rejectWithValue('La connexion a échoué. Veuillez vérifier vos identifiants.');//retourne un message d'erreur
        }
    }
);


// AsyncThunk pour récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk(
    'auth/fetchUserProfile',
    //On utilise le token pour récupérer le profil utilisateur, le underscore est utilisé pour indiquer que le paramètre est ignoré dans la fonction
    async (_, { getState, rejectWithValue }) => {
        const state = getState() as { auth: AuthState };
        const token = state.auth.token;
        try {
            const response = await axios.get(`${API_BASE_URL}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.body;  // Retourne les données du profil utilisateur
        } catch (error) {
            console.error(error);
            return rejectWithValue('Échec de la récupération du profil utilisateur..');
        }
    }
);


// AsyncThunk pour mettre à jour le profil utilisateur
export const updateUserProfile = createAsyncThunk(
    'auth/updateUserProfile',
    // Mettre à jour le userName
    async (userName: string, { getState, rejectWithValue }) => {
        const state = getState() as { auth: AuthState };
        const token = state.auth.token;
        try {
            const response = await axios.put(
                `${API_BASE_URL}/user/profile`,
                { userName },  // Mettre à jour uniquement le userName
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.body;  // Retourne les nouvelles données du profil
        } catch (error) {
            console.error(error);
            return rejectWithValue('Échec de la mise à jour du profil utilisateur.');
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');  // Retirer le token de localStorage
            sessionStorage.removeItem('token');  // Retirer le token de sessionStorage
        },
        // Ajout d'une action pour activer/désactiver le mode édition du profil
        startProfileEdit: (state) => {
            state.isEditingProfile = true;
        },
        cancelProfileEdit: (state) => {
            state.isEditingProfile = false;
        },
    },
    /* Ici sont ajoutés les extraReducers pour gérer les actions asynchrones
    il y a trois cas à gérer : pending, fulfilled et rejected
    */
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload;
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.userProfile = action.payload;  // Stocker les données du profil
                state.loading = false;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.userProfile = action.payload;  // Mettre à jour les données du profil
                state.loading = false;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});





export const { logout, startProfileEdit ,cancelProfileEdit } = authSlice.actions;
export default authSlice.reducer;