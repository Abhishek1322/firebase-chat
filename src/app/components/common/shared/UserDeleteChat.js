import React, { useState } from "react";
import * as Images from "../../../../utilities/images";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { PARENTCOLLECTIONNAME, db } from "../../../../config/firebase-config";
import { toast } from "react-toastify";

const UserDeleteChat = ({ sender_id, allChats, sendRoomId, close }) => {
  const [isLoading, setIsLoading] = useState(false);

  // delete room
  const handleDeleteRoom = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let date = Math.floor(Date.now());
    let filterChatRoom = allChats?.filter((val) => val.roomId == sendRoomId);
    let deletedResult = {
      deletedAt: date,
      userId: sender_id,
    };
    const roomDocRef = doc(db, PARENTCOLLECTIONNAME, sendRoomId);
    const roomDocSnapshot = await getDoc(roomDocRef);
    if (roomDocSnapshot.exists()) {
      try {
        const roomDocRef = doc(db, PARENTCOLLECTIONNAME, sendRoomId);
        await updateDoc(roomDocRef, {
          deletedChatUserIds: [
            ...filterChatRoom[0]?.deletedChatUserIds,
            deletedResult,
          ],
        });
        toast.success("Chat deleted successfully");
        close();
      } catch (error) {
        console.error("Error creating room:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="deletesection paymentdonesection">
        <img
          src={Images.DeleteModal}
          alt="accountdeletedimg"
          className="img-fluid"
        />
        <h1 className="accountDeleted mt-3">Delete Chat</h1>
        <p className="accountdeletetxt mt-2 ">
          Are you sure, you want to delete this chat?
        </p>
        <div className="modalfooterbtn">
          <div className="orderItems">
            <button onClick={close} className="cancelOrder" type="button">
              Cancel
            </button>
            <button
              disabled={isLoading}
              onClick={(e) => handleDeleteRoom(e)}
              className="acceptOrder d-flex align-items-center gap-2"
              type="button"
            >
              Yes,Clear
              {isLoading && (
                <span className="spinner-border spinner-border-sm me-1"></span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDeleteChat;
