// get all videos here
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db, provider } from "../config/firebase-config";
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
    channelVideos.push(doc.data());
    console.log(doc.data());
  });
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
      // console.log(user);
      // console.log(token);
      const docRef = doc(db, "userMeta", user.uid);

      // Set the document's data
      return setDoc(
        docRef,
        {
          // Add any additional user information you want to store here
          email: user.email,
          userMetaId: docRef.id,
          user_uid: user.uid,
        },
        { merge: true }
      );
    })
    .then((result) => location.reload())
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
/**
 *
 * Returns Whether a User is LoggedIn or not
 */
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
      location.reload();
    })
    .catch((error) => {
      console.error(error);
    });
};

export const userAccountDetails = () => {
  const user = auth.currentUser;

  if (user !== null) {
    return {
      photo: user.photoURL,
      email: user.email,
      name: user.displayName,
      registerMethod: user.providerData[0].providerId,
      phone: user.providerData[0].phoneNumber,
    };
  }
};

export const userAccountDetails2 = () => {
  const user = auth.currentUser;

  if (user !== null) {
    return [user.photoURL, user.email, user.displayName, user.providerData];
  }
};

export const currentVideoDetail = async (id) => {
  const docRef = doc(db, "videos", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log(docSnap.data());

    return docSnap.data();
  } else {
    return { error: "Video Doesn't exists" };
  }
};

export const currentChannelDetail = async (id) => {
  const docRef = doc(db, "channels", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    let output = docSnap.data();
    const firebaseTimestamp = docSnap.data().createdAt;
    const jsDate = new Date(firebaseTimestamp.seconds * 1000)
      .toISOString()
      .split("T")[0];
    output.createdAt = String(jsDate);

    // console.log(docSnap.data());
    return output;
  } else {
    return { error: "Channel Doesn't exists" };
  }
};
