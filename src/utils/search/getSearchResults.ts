import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase-config";
export const getSearchResults = async (Searchquery) => {
  console.log(query);

  const output = [];
  const videosRef = collection(db, "videos");
  const q = query(videosRef, where("title", "==", Searchquery));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    output.push(doc.data());
  });

  return output;
};
