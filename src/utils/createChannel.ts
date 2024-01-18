import { db, auth } from "../config/firebase-config";
import { collection, serverTimestamp } from "firebase/firestore";
import { runTransaction, doc } from "firebase/firestore";
import { useState } from "react";

export const createChannel = async () => {
  const user = auth.currentUser;
  if (user) {
    const docRef = doc(collection(db, "channels"));
    await runTransaction(db, async (transaction) => {
      transaction.set(docRef, {
        Subscribers: 0,
        channelAbout: "Lorem ipsum dolor sit",
        channelCover:
          "https://yt3.googleusercontent.com/yRpqaOMm_A8kIIjWXeAI6hbl5NXa6_I5Cfc2oDAkCDaUoshsewWOZPl9e2DdtU5I8vkSp0B9Gg=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
        channelImage: user.photoURL,
        channelName: user.displayName,
        channelsId: docRef.id,
        createdAt: serverTimestamp(),
        user_id: user.uid,
        videos: [],
      });

      const userMetaRef = doc(db, "userMeta", user.uid);
      transaction.update(userMetaRef, {
        channelLink: docRef.id,
      });
    });
    return docRef.id;
  } else {
    return "";
  }
};
