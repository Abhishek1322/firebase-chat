import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  CHILDCOLLECTIONNAME,
  db,
  PARENTCOLLECTIONNAME,
} from "../../../../config/firebase-config";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  setDoc,
  doc,
  getDoc,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import * as Images from "../../../../utilities/images";
import { useAuthSelector } from "../../../../redux/selector/auth";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { chefProfileDocument } from "../../../../redux/slices/auth";
import { useDispatch } from "react-redux";
import { getUserProfileDetails } from "../../../../redux/slices/web";

const ChatnextModal = ({ chefId, handleChefProfle }) => {
  const authData = useAuthSelector();
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const fcmToken = localStorage.getItem("fcmToken");
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [img, setImg] = useState("");
  const [imageUrl, setImgUrl] = useState("");
  const [chefData, setChefData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const ROOM_ID = `${authData?.userInfo?.id}-${chefId}`;
  console.log("chefDatachefData",chefData);
  // scroll bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current?.scrollIntoView({
        block: "end",
        inline: "end",
        behavior: "smooth",
      });
    }
  };

  // get all messages
  useEffect(() => {
    const parentCollectionChat = query(collection(db, PARENTCOLLECTIONNAME));
    const unsubscribe = onSnapshot(parentCollectionChat, (snap) => {
      const messagesList = snap.docs.map((doc) => {
        const id = doc.id;
        return { id, ...doc.data() };
      });
      const getMyChats = messagesList?.filter((item) => {
        return item?.roomId === ROOM_ID;
      });
      getFireStoreData(getMyChats);
      setIsLoading(false);
    });
    handleGetProfile();
    scrollToBottom();
    return () => unsubscribe();
  }, []);

  // get inner messages
  const getFireStoreData = (allChats) => {
    if (ROOM_ID) {
      let lastDeletedAt;
      if (
        allChats &&
        allChats.length > 0 &&
        allChats[0].deletedChatUserIds &&
        allChats[0].deletedChatUserIds.length > 0
      ) {
        let lastDeletedAts = allChats[0].deletedChatUserIds.filter(
          (item) => item.userId == authData?.userInfo?.id
        );
        if (lastDeletedAts.length > 0) {
          lastDeletedAts = lastDeletedAts?.sort(
            (a, b) => b.deletedAt - a.deletedAt
          );
          lastDeletedAt = lastDeletedAts[0].deletedAt;
        }
      }
      const allMessageQuery = query(
        collection(db, PARENTCOLLECTIONNAME, ROOM_ID, CHILDCOLLECTIONNAME),
        orderBy("createdAt", "asc")
      );

      onSnapshot(allMessageQuery, (snap) => {
        const messagesList = snap.docs.map((doc) => {
          const id = doc.id;
          return { id, ...doc.data() };
        });

        let filteredMessages = messagesList;
        if (messagesList && messagesList.length > 0 && lastDeletedAt) {
          filteredMessages = messagesList?.filter(
            (val) => val?.createdAt > Math.floor(lastDeletedAt)
          );
        }
        const updatedData = filteredMessages?.map((item) => {
          if (item?.image_url === "") {
            const { image_url, ...rest } = item;
            return rest;
          }
          return item;
        });
        setMessages(updatedData);
      });
    }
  };

  // send and update messages
  const handleUpdateMessage = async (e) => {
    if (msg || imageUrl) {
      setIsLoading(true);
      const senderName =
        authData?.userInfo?.userInfo?.firstName +
        " " +
        authData?.userInfo?.userInfo?.lastName;

      const receiverName =
        chefData?.userInfo?.firstName + " " + chefData?.userInfo?.lastName;
      const roomDocRef = doc(db, PARENTCOLLECTIONNAME, ROOM_ID);
      const roomDocSnapshot = await getDoc(roomDocRef);
      const previousUnseenMessageCount =
        roomDocSnapshot.data()?.unseenMessageCount || 0;
      const previousDeletedChatUserIds = roomDocSnapshot.data();

      if (roomDocSnapshot.exists()) {
        const messagesCollectionRef = collection(
          roomDocRef,
          CHILDCOLLECTIONNAME
        );
        await addDoc(
          messagesCollectionRef,
          {
            createdAt: Math.floor(Date.now()),
            text: msg,
            id: "",
            image_url: imageUrl,
            senderId: authData?.userInfo?.id,
            recieverId: chefId,
          },
          setMsg(""),
          setImgUrl(""),
          scrollToBottom(),
          handleSendWebPushNotification(senderName)
        );
        try {
          const roomDocRef = doc(db, PARENTCOLLECTIONNAME, ROOM_ID);
          await updateDoc(
            roomDocRef,
            {
              deletedChatUserIds:
                previousDeletedChatUserIds?.deletedChatUserIds,
              lastMessage: {
                createdAt: Math.floor(Date.now()),
                senderId: authData?.userInfo?.id,
                text: msg,
                image_url: imageUrl,
                recieverId: chefId,
              },
              roomId: ROOM_ID,
              unseenMessageCount: previousUnseenMessageCount + 1,
              user1: {
                email: authData?.userInfo?.email,
                fcmToken: fcmToken,
                full_name: senderName,
                id: authData?.userInfo?.id,
                onlineStatus: 1,
                profile_image: authData?.userInfo?.userInfo?.profilePhoto,
              },
              user2: {
                email: chefData?.email,
                full_name: receiverName,
                fcmToken: chefData?.fcmToken ? chefData?.fcmToken : "",
                id: chefData?.id,
                onlineStatus: 1,
                profile_image: chefData?.userInfo?.profilePhoto
                  ? chefData?.userInfo?.profilePhoto
                  : "",
              },
              users: [authData?.userInfo?.id, chefId],
            },
            setMsg(""),
            setImgUrl(""),
            scrollToBottom()
          );
        } catch (error) {
          console.error("Error creating room:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        handleSendInitialMessage(senderName, receiverName);
        setIsLoading(false);
      }
    }
  };

  // send initial message
  const handleSendInitialMessage = async (senderName, receiverName) => {
    setIsLoading(true);
    try {
      const roomDocRef = doc(db, PARENTCOLLECTIONNAME, ROOM_ID);
      const messagesCollectionRef = collection(roomDocRef, CHILDCOLLECTIONNAME);
      await setDoc(
        roomDocRef,
        {
          deletedChatUserIds: [],
          lastMessage: {
            createdAt: Math.floor(Date.now()),
            senderId: authData?.userInfo?.id,
            text: msg,
            image_url: imageUrl,
            recieverId: chefId,
          },
          roomId: ROOM_ID,
          unseenMessageCount: 1,
          user1: {
            email: authData?.userInfo?.email,
            fcmToken: fcmToken,
            full_name: senderName,
            id: authData?.userInfo?.id,
            onlineStatus: 1,
            profile_image: authData?.userInfo?.userInfo?.profilePhoto,
          },
          user2: {
            email: chefData?.email,
            full_name: receiverName,
            fcmToken: chefData?.fcmToken ? chefData?.fcmToken : "",
            id: chefData?.id,
            onlineStatus: 1,
            profile_image: chefData?.userInfo?.profilePhoto
              ? chefData?.userInfo?.profilePhoto
              : "",
          },
          users: [authData?.userInfo?.id, chefId],
        },
        setMsg(""),
        setImgUrl(""),
        scrollToBottom(),
        handleSendWebPushNotification(senderName)
      );

      await addDoc(messagesCollectionRef, {
        createdAt: Math.floor(Date.now()),
        text: msg,
        id: "",
        image_url: imageUrl,
        senderId: authData?.userInfo?.id,
        recieverId: chefId,
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong");
      console.error("Error creating room:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // send web push notification
  const handleSendWebPushNotification = async (senderName) => {
    // const recipientToken = await getToken(messaging, { vapidKey: VAPID_KEY });
    const notificationData = {
      title: "New Message",
      body: `${senderName}: ${msg}`,
    };

    const payload = {
      notification: notificationData,
      data: notificationData,
      to: chefData?.fcmToken,
      profile_image: authData?.userInfo?.userInfo?.profilePhoto,
    };

    await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `key= AAAAHRQtGIo:APA91bHfwyhY4cv1HeqaG7rSy9cnIQawy96LWye1SyralUJsoct5iT3NjssbzMPlhnncVGLUqLNGuKqdRFL8-FCCA2mrC65uH-3zrExXscs1nc8tBtbC67ZbsOXoeMdYvtYZ_CZW2Yfa`, // Replace with your Firebase Cloud Messaging Server Key
      },
      body: JSON.stringify(payload),
    });
  };

  // validation for upload files
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (
        rejectedFiles.length > 0 &&
        rejectedFiles[0]?.file?.type !== "image/jpeg" &&
        "image/jpg" &&
        "image/png" &&
        "image/svg"
      ) {
        toast.error("Please upload valid image");
        return;
      }
      setImg(acceptedFiles[0]);
      scrollToBottom();
    },
    [img]
  );

  // showing only images
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
      "image/svg": [],
    },
    multiple: false,
  });

  // getting uploaded image url
  useEffect(() => {
    if (img) {
      let params = {
        file: img,
      };
      dispatch(
        chefProfileDocument({
          ...params,
          cb(res) {
            if (res.status === 200) {
              setImgUrl(res.data.data.fileUrl);
            }
          },
        })
      );
    }
  }, [img]);

  // getting user profile details
  const handleGetProfile = () => {
    let params = {
      userid: chefId,
    };
    dispatch(
      getUserProfileDetails({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setChefData(res?.data?.data);
            if (handleChefProfle !== undefined) {
              handleChefProfle(res?.data?.data);
            }
          }
        },
      })
    );
  };

  // Convert UTC time to local time
  const convertTimeFormat = (seconds) => {
    const timestamp = new Date(seconds);
    const now = new Date();
    const timeDifferenceInSeconds = Math.floor((now - timestamp) / 1000);
    if (timeDifferenceInSeconds < 5) {
      return "just now";
    }
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    const formattedTime = timestamp.toLocaleTimeString("en-US", options);
    return formattedTime;
  };

  // remove selected image
  const handleRemoveImage = (url) => {
    if (url === imageUrl) {
      setImgUrl("");
    }
  };

  return (
    <>
      <div className="chat-main-content">
        {messages && messages?.length > 0 ? (
          <>
            {messages?.map((message, index) => (
              <div
                ref={messagesEndRef}
                key={index}
                className={
                  authData?.userInfo?.id === message?.senderId
                    ? "chat-right-section"
                    : "chat-left-section"
                }
              >
                <div
                  className={
                    authData?.userInfo?.id === message?.senderId
                      ? "chat-box-right py-2"
                      : "chat-box-left py-2"
                  }
                >
                  <p className="chat-value">{message?.text}</p>
                  <div className="chefchat_detail">
                    {authData?.userInfo?.id === message?.senderId ? (
                      <img
                        src={
                          authData?.userInfo?.userInfo?.profilePhoto
                            ? authData?.userInfo?.userInfo?.profilePhoto
                            : Images.dummyProfile
                        }
                        alt="profile"
                        className="chatnextImg"
                      />
                    ) : (
                      <img
                        src={
                          chefData?.userInfo?.profilePhoto
                            ? chefData?.userInfo?.profilePhoto
                            : Images.dummyProfile
                        }
                        alt="profile"
                        className="chatnextImg"
                      />
                    )}
                    {authData?.userInfo?.id === message?.senderId ? (
                      <p className="chatUser m-0 pe-1">you</p>
                    ) : (
                      <p className="chatUser m-0 pe-1">
                        {chefData?.userInfo?.firstName}{" "}
                        {chefData?.userInfo?.lastName}
                      </p>
                    )}

                    <p className="chatTime_ m-0 pe-2">
                      {convertTimeFormat(message?.createdAt)}
                    </p>
                  </div>
                  <div className="message-img">
                    {message?.image_url && (
                      <img alt="upload-img" src={message?.image_url} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>No chat found</p>
        )}

        {imageUrl && (
          <div className="select-image-outer">
          <div className="send-selected-msg">
            <img alt="upload-img" src={imageUrl} />
            <i
              onClick={() => handleRemoveImage(imageUrl)}
              className="fa fa-times cross-icon"
            ></i>
          </div>
          </div>
        )}

        <div className="chat-input">
          <textarea
            className=""
            type="text"
            placeholder="Type Something..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <div className="d-flex align-items-center justify-content-center gap-2">
            {!imageUrl && (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <img
                  src={Images.chatgalleryImg}
                  alt="chatGallerImg"
                  className=""
                />
              </div>
            )}

            <div className="chat-send-btn">
              {/* <p className="chatSearchere_">
              Your only able to send photos from gallery
            </p> */}
              {isLoading ? (
                <span className="spinner-border text-white spinner-border-sm me-1"></span>
              ) : (
                <img
                  onClick={handleUpdateMessage}
                  src={Images.chatSendImg}
                  alt="chatsendImg"
                  className=""
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatnextModal;
