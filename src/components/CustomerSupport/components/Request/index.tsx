import React, { useCallback, useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { api } from "../../../../api/request";
import { USER_URL } from "../../../../constants";
import { useAuthToken } from "../../../../hooks/useAuthToken";
import { MessageForm } from "../Messages/Message";

interface TooltipProps {
     content: any;
}

const Tooltip = ({ content }: TooltipProps) => {
     return (
          <ul
               style={{
                    position: "absolute",
                    background: "white",
                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    listStyle: "none",
                    zIndex: "9999",
                    top: "3rem",
                    right: "2.5rem",
               }}
          >
               {content}
          </ul>
     );
};

const Request = () => {
     const { token } = useAuthToken();
     const [supports, setSupports] = useState<any[]>([]);
     const [toolTip, setToolTip] = useState<boolean>(false);
     const [selectedSupport, setSelectedSupport] = useState<any>({} as any);
     const [isMessage, setIsMessage] = useState<boolean>(false);

     const getSupportMessages = useCallback(async () => {
          try {
               const result = await api().get(`${USER_URL}/messages`, {
                    headers: {
                         Authorization: `Bearer ${token}`,
                    },
               });
               setSupports(result.data.data);
          } catch (error) {
               console.log("error", error);
          }
     }, []);

     useEffect(() => {
          getSupportMessages();
     }, [getSupportMessages]);

     useEffect(() => {
          document.addEventListener("click", () => {
               if (toolTip) {
                    setToolTip(false);
               }
          });

          return () => {
               document.removeEventListener("click", () => {
                    if (toolTip) {
                         setToolTip(false);
                    }
               });
          };
     }, [toolTip]);

     const handleTooltip = (support: any, e: any) => {
          e.stopPropagation();
          setSelectedSupport(support);
          setToolTip(!toolTip);
     };

     return (
          <>
               {supports.map((support, index) => {
                    const date = new Date(support.createdAt);
                    console.log(support);
                    return (
                         <React.Fragment key={support._id}>
                              <tr
                                   style={{
                                        cursor: "pointer",
                                        position: "relative",
                                   }}
                                   key={support?._id}
                              >
                                   <td>
                                        {(index + 1)
                                             .toString()
                                             .padStart(2, "0")}
                                   </td>
                                   <td>{support.user?.shop[0].shop_name}</td>
                                   <td>{support?.message}</td>
                                   <td>New</td>
                                   <td>{date.toLocaleString()}</td>
                                   <td>
                                        <SlOptionsVertical
                                             style={{
                                                  fontSize: "1.3rem",
                                             }}
                                             onClick={(e: any) =>
                                                  handleTooltip(support, e)
                                             }
                                        />
                                        {toolTip &&
                                             selectedSupport._id ===
                                                  support._id && (
                                                  <Tooltip
                                                       content={
                                                            <>
                                                                 <li
                                                                      style={{
                                                                           padding: "0.75rem 2rem",
                                                                      }}
                                                                      onClick={() =>
                                                                           setIsMessage(
                                                                                true
                                                                           )
                                                                      }
                                                                 >
                                                                      Read
                                                                 </li>
                                                                 <li
                                                                      style={{
                                                                           padding: "0.75rem 2rem",
                                                                      }}
                                                                 >
                                                                      Delete
                                                                 </li>
                                                            </>
                                                       }
                                                  />
                                             )}

                                        {isMessage &&
                                             selectedSupport._id ===
                                                  support._id && (
                                                  <MessageForm
                                                       isMessage={isMessage}
                                                       setIsMessage={
                                                            setIsMessage
                                                       }
                                                       support={support}
                                                  />
                                             )}
                                   </td>
                              </tr>
                         </React.Fragment>
                    );
               })}
          </>
     );
};

export default Request;
