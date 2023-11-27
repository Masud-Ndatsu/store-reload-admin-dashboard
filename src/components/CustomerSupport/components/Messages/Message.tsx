import { useState } from "react";
import { api } from "../../../../api/request";
import { USER_URL } from "../../../../constants";
import { Modal } from "../../../Modal";
import "./style.css";
import { useAuthToken } from "../../../../hooks/useAuthToken";

interface IProp {
     support: any;
     isMessage: boolean;
     setIsMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MessageForm = ({ isMessage, setIsMessage, support }: IProp) => {
     const { token } = useAuthToken();
     const [message, setMessage] = useState<string>("");

     const onSubmit = async (e: any): Promise<void> => {
          e.preventDefault();
          try {
               await api().post(
                    `${USER_URL}/messages/${support._id}`,
                    { message },
                    {
                         headers: {
                              Authorization: `Bearer ${token}`,
                         },
                    }
               );
          } catch (error) {
               console.log(error);
          }
     };
     return (
          <Modal isOpen={isMessage} onClose={() => setIsMessage(false)}>
               <div className="messages">
                    <div className="message">
                         <p>{support?.message}</p>
                         <small className="message-time">8:50am</small>
                    </div>
                    <div className="message-replie">
                         <p>{support?.replies?.message}</p>
                         <small className="message-time">7:50am</small>
                    </div>
               </div>
               <form
                    onSubmit={onSubmit}
                    className="message-form"
                    style={{ width: "90%", display: "flex" }}
               >
                    <div style={{ flex: 8 }}>
                         <input
                              type="text"
                              style={{ width: "100%", padding: ".5rem" }}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              required
                         />
                    </div>
                    <div>
                         <button style={{ padding: ".5rem" }}>Send</button>
                    </div>
               </form>
          </Modal>
     );
};
