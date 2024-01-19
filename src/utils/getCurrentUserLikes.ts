import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../config/firebase-config";
export const getCurrentUserLikes = async () => {
  let output = [];
  const user = auth.currentUser;
  if (user) {
    const likesOrDislike = query(
      collection(db, "Likes"),
      where("likedBy", "==", user.uid)
    );
    const querySnapshot = await getDocs(likesOrDislike);
    console.log("...........................", querySnapshot.size);
    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        console.log("............................", doc.data());
        output.push(doc.data());
      });
      return output;
    }
  }
  return output;
};
