import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/v1';

// AsyncThunk for fetching the user accounts
export const fetchUserAccounts = createAsyncThunk(
    'accounts/fetchUserAccounts',
    async (_, { getState, rejectWithValue }) => {
        const state = getState() as { auth: { token: string | null } };
        const token = state.auth.token;
        try {
            const response = await axios.get(`${API_BASE_URL}/user/accounts`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data.accounts;
        } catch (error) {
            return rejectWithValue('Erreur lors de la récupération des comptes utilisateur');
        }
    }
);

interface Account {
    title: string;
    amount: string;
    description: string;
}

interface AccountsState {
    userAccounts: Account[];
    loading: boolean;
    error: string | null;
}

const initialState: AccountsState = {
    userAccounts: [],
    loading: false,
    error: null,
};

const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserAccounts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserAccounts.fulfilled, (state, action) => {
                state.userAccounts = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserAccounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default accountsSlice.reducer;
