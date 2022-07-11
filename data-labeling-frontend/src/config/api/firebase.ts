import { getApps, initializeApp } from "firebase/app";

export function initializeFirebase() {
	const firebaseConfig = {
		apiKey: "AIzaSyB5fMHRiRtS2TUWIIKCJxAKBZYrCCR02W0",
		authDomain: "data-labeling-app-becb9.firebaseapp.com",
		projectId: "data-labeling-app-becb9",
		storageBucket: "data-labeling-app-becb9.appspot.com",
		messagingSenderId: "866178614129",
		appId: "1:866178614129:web:ee9eda7c9c6141abfeacd0",
	};

	// Initialize Firebase
	if (!getApps().length) {
		initializeApp(firebaseConfig);
	}
}
