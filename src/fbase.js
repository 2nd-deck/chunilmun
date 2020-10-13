import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};
//   create-react-app으로 만들어 환경변수를 사용하려면 REACT_APP_'환경변수'로 해야한다.
// git ignore에 .env를 추가해서 github에 추가되는것을 막는다. 빌드하면 결국은 변환되어 값이 나타나므로 보안사항은 아니고
firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const firebaseInstance = firebase;
