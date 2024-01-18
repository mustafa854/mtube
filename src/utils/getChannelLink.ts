import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../config/firebase-config";
export const getChannelLink = async () => {
  let output = "";
  const user = auth.currentUser;
  if (user) {
    const qChannel = query(
      collection(db, "userMeta"),
      where("email", "==", user.email)
    );
    console.log("SAHI CHAL RAHA");
    const querySnapshot = await getDocs(qChannel);
    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        output = doc.data().channelLink;
        console.log("inside", doc.data());
      });
      console.log("o", output);
      return output;
    }
  }
  return output;
};
