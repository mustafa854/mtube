import { db, auth } from "../config/firebase-config";
import { collection, serverTimestamp } from "firebase/firestore";
import { runTransaction, doc } from "firebase/firestore";
import { useState } from "react";

export const createChannel = async (
  channelName,
  channelAbout,
  channelCover,
  channelImage
) => {
  const user = auth.currentUser;
  if (user) {
    const docRef = doc(collection(db, "channels"));
    await runTransaction(db, async (transaction) => {
      transaction.set(docRef, {
        Subscribers: 0,
        channelAbout: channelAbout,
        channelCover: channelCover,
        channelImage: channelImage,
        channelName: channelName,
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
