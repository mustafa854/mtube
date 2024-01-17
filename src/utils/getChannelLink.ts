import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../config/firebase-config";
export const getChannelLink = async () => {
  let output = "";
  const user = auth.currentUser;
  if (user) {
    console.log("!!!!!!!!!!!!!!!!!!!");
    const qChannel = query(
      collection(db, "userMeta"),
      where("email", "==", user.email)
    );

    const querySnapshot = await getDocs(qChannel);
    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        output = doc.data().channelLink;
      });
      console.log(output);
      return output;
    }
  }
  return output;
};
