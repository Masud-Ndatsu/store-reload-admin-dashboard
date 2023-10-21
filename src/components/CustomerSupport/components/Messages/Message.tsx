import { Modal } from "../../../Modal";
import "./style.css";

interface IProp {
     support: any;
     isMessage: boolean;
     setIsMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MessageForm = ({ isMessage, setIsMessage, support }: IProp) => {
     return (
          <Modal isOpen={isMessage} onClose={() => setIsMessage(false)}>
               <div className="messages">
                    <div className="message">
                         <p>{support?.message}</p>
                         <small className="message-time">8:50am</small>
                    </div>
                    <div className="message-replie">
                         <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Veritatis!
                         </p>
                         <small className="message-time">7:50am</small>
                    </div>
               </div>
          </Modal>
     );
};
