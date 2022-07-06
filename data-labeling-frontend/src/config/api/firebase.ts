import { getApps, initializeApp } from "firebase/app";

export function initializeFirebase() {
	const firebaseConfig = {
		apiKey: "AIzaSyC7zup9va49-8T0Ly1Cx8JQ5Qp-HJTGrU0",
		authDomain: "data-labeling-app.firebaseapp.com",
		projectId: "data-labeling-app",
		storageBucket: "data-labeling-app.appspot.com",
		messagingSenderId: "1017290257089",
		appId: "1:1017290257089:web:0e23325d8cd36ac6ea5a40",
		measurementId: "G-NB7KF0S95B",
	};

	// Initialize Firebase
	if (!getApps().length) {
		initializeApp(firebaseConfig);
	}
}
