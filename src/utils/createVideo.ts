import { db, auth } from "../config/firebase-config";
import {
  arrayUnion,
  collection,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { runTransaction, doc } from "firebase/firestore";
import { useState } from "react";

export const createVideo = async (
  videoTitle,
  videoDescription,
  videoLink,
  videoThumbnail,
  myChannelLink
) => {
  const user = auth.currentUser;
  if (user) {
    const channelDetail = doc(db, "channels", myChannelLink);
    const docSnap = await getDoc(channelDetail);
    const fetchedChannelName = docSnap.data().channelName;
    const fetchedChannelImage = docSnap.data().channelImage;
    const docRef = doc(collection(db, "videos"));
    await runTransaction(db, async (transaction) => {
      transaction.set(docRef, {
        views: 0,
        videosId: docRef.id,
        user_id: user.uid,
        publishDate: serverTimestamp(),
        channel_id: myChannelLink,
        channel: {
          channelName: fetchedChannelName,
          channelImage: fetchedChannelImage,
        },
        description: videoDescription,
        title: videoTitle,
        videoLink: videoLink,
        videoThumbnail: videoThumbnail,
      });

      const userMetaRef = doc(db, "channels", myChannelLink);
      transaction.update(userMetaRef, {
        videos: arrayUnion(docRef.id),
      });
    });

    return {
      views: 0,
      videosId: docRef.id,
      user_id: user.uid,
      publishDate: serverTimestamp(),
      channel_id: myChannelLink,
      channel: {
        channelName: fetchedChannelName,
        channelImage: fetchedChannelImage,
      },
      description: videoDescription,
      title: videoTitle,
      videoLink: videoLink,
      videoThumbnail: videoThumbnail,
    };
  } else {
    console.error("Please Login First");
  }
};
