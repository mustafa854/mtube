import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../config/firebase-config";

export const getCurrentuserCurrentvideoLikes = async (videoId) => {
  const user = auth.currentUser;
  var output = [];
  if (user) {
    const q = query(
      collection(db, "commentLikes"),
      where("uid", "==", user.uid),
      where("videoId", "==", videoId)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        output.push(doc.data());
      });
    }
    return output;
  } else {
    return output;
  }
};
