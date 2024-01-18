import { db, auth } from "../config/firebase-config";
import {
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { runTransaction, doc } from "firebase/firestore";
import { useState } from "react";

export const updateChannel = async (
  channelName,
  channelAbout,
  channelCover,
  channelImage,
  myChannelLink
) => {
  const user = auth.currentUser;
  if (user) {
    const docRef = doc(db, "channels", myChannelLink);
    await runTransaction(db, async (transaction) => {
      transaction.update(docRef, {
        channelAbout: channelAbout,
        channelCover: channelCover,
        channelImage: channelImage,
        channelName: channelName,
      });

      const q = query(
        collection(db, "videos"),
        where("channel_id", "==", myChannelLink)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        transaction.update(doc.ref, {
          channel: {
            channelImage: channelImage,
            channelName: channelName,
          },
        });
      });
    });
  }
};
