import { getApps, initializeApp } from "firebase/app";

export function initializeFirebase() {
	const firebaseConfig = {
		apiKey: "AIzaSyBcbX9839TSzpWkGV0Bd4afulQv9GGl2NI",
		authDomain: "data-labeling-app-becb9.firebaseapp.com",
		projectId: "data-labeling-app-becb9",
		storageBucket: "data-labeling-app-becb9.appspot.com",
		messagingSenderId: "866178614129",
		appId: "1:866178614129:web:d40309e6a4d55698feacd0",
	};

	// Initialize Firebase
	if (!getApps().length) {
		initializeApp(firebaseConfig);
	}
}
