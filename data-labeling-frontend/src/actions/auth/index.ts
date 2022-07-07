import { getMeApi } from "./../../services/auth/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithPopup, signOut, getAuth, GoogleAuthProvider } from "firebase/auth";

export const login = createAsyncThunk("auth/login", async (_props, { rejectWithValue }) => {
	const auth = getAuth();
	const provider = new GoogleAuthProvider();
	try {
		const result = await signInWithPopup(auth, provider);
		const { uid, email, displayName } = result.user;
		const modifiedUser = { uid, email, displayName };
		// This gives you a Google Access Token. You can use it to access the Google API.
		const credential = GoogleAuthProvider.credentialFromResult(result);
		return { token: credential?.accessToken, user: modifiedUser };
	} catch (err: any) {
		if (!err.response) {
			throw err;
		}
		return rejectWithValue(err.response.data);
	}
});

export const logout = createAsyncThunk("auth/logout", async (_props, { rejectWithValue }) => {
	const auth = getAuth();

	try {
		await signOut(auth);
	} catch (err: any) {
		if (!err.response) {
			throw err;
		}
		return rejectWithValue(err.response.data);
	}
});

export const getMe = createAsyncThunk("auth/getMe", async (_props, { rejectWithValue }) => {
	try {
		const result = await getMeApi();
		return result;
	} catch (err: any) {
		if (!err.response) {
			throw err;
		}
		return rejectWithValue(err.response.data);
	}
});
