import { useCallback, useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { api } from "../../../../api/request";
import { USER_URL } from "../../../../constants";
import { useAuthToken } from "../../../../hooks/useAuthToken";

const Request = () => {
     const { token } = useAuthToken();
     const [supports, setSupports] = useState<any[]>([]);
     const [toolTip, setToolTip] = useState<boolean>(false);

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

     return (
          <>
               {supports.map((support, index) => {
                    const date = new Date(support.createdAt);
                    return (
                         <tr style={{ cursor: "pointer" }} key={support?._id}>
                              <td>{(index + 1).toString().padStart(2, "0")}</td>
                              <td>{support.user?.shop[0].shop_name}</td>
                              <td>{support?.message}</td>
                              <td>New</td>
                              <td>{date.toLocaleString()}</td>
                              <td style={{ position: "relative" }}>
                                   <SlOptionsVertical
                                        height={"100%"}
                                        width={"100%"}
                                        onClick={() => setToolTip(!toolTip)}
                                   />

                                   {toolTip && (
                                        <ul
                                             style={{
                                                  position: "absolute",
                                                  backgroundColor: "whitesmoke",
                                                  listStyle: "none",
                                             }}
                                        >
                                             <li
                                                  style={{
                                                       padding: ".75rem 1rem",
                                                  }}
                                             >
                                                  Read
                                             </li>
                                             <li
                                                  style={{
                                                       padding: ".75rem 1rem",
                                                  }}
                                             >
                                                  Delete
                                             </li>
                                        </ul>
                                   )}
                              </td>
                         </tr>
                    );
               })}
          </>
     );
};

export default Request;
