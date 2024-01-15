// get all videos here
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db, provider } from "./../config/firebase-config";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const qVideos = query(collection(db, "videos"));

export const getVideos = async () => {
  const querySnapshot = await getDocs(qVideos);
  return querySnapshot;
};

const qChannels = query(collection(db, "channels"));
export const getChannels = async () => {
  const querySnapshot = await getDocs(qChannels);
  return querySnapshot;
};

export const getCurrentChannel = async (id) => {
  const docRef = doc(db, "channels", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such Channel Exists!");
    return false;
  }
};

export const getChannelVideos = async (id) => {
  const qChannelVideos = await query(
    collection(db, "videos"),
    where("channel_id", "==", id)
  );

  const querySnapshot = await getDocs(qChannelVideos);
  let channelVideos = [];
  querySnapshot.forEach((doc) => {
    let tempData = doc.data();
    console.log("tempdata", tempData);
    tempData.id = doc.id;
    channelVideos.push(tempData);
  });
  console.log("channel videos", channelVideos);
  return channelVideos;
};

const auth = getAuth();

export const googleSignin = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log(user);
      console.log(token);
      location.reload();
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const isAuthenticated = () => {
  const user = auth.currentUser;
  if (user) {
    return true;
  } else {
    return false;
  }
};

export const userSignOut = () => {
  signOut(auth)
    .then(() => {
      console.log("User Signed Out");
    })
    .then(location.reload())
    .catch((error) => {
      console.error(error);
    });
};

export const userAccountDetails = () => {
  const user = auth.currentUser;

  if (user !== null) {
    return [user.photoURL, user.email, user.displayName, user.providerData];
  }
};
