import { useRef, useState, useCallback } from "react";
import { FiEdit2 } from "react-icons/fi";
import "./style.css";
import { useAuthToken } from "../../hooks/useAuthToken";
import { api } from "../../api/request";
import { USER_URL } from "../../constants";
import profile from "../../assets/profile.jpg";
import Loading from "../Loading";

export const Settings = () => {
     const { token } = useAuthToken();
     const [_preview, setPreview] = useState<string>("");
     const [loading, setLoading] = useState<boolean>(false);
     const inputFileRef = useRef<HTMLInputElement>(null);
     const passwordRef = useRef<HTMLInputElement>(null);
     const emailRef = useRef<HTMLInputElement>(null);
     const [disabled, setDisabled] = useState<{
          email: boolean;
          password: boolean;
     }>({ email: true, password: true });
     const [email, setEmail] = useState<string>("");
     const [password, setPassword] = useState<string>("");

     const handlePasswordRef = () => {
          setDisabled({ ...disabled, password: false });
          passwordRef.current?.focus();
     };

     const handleEmailRef = () => {
          setDisabled({ ...disabled, email: false });
          emailRef.current?.focus();
     };

     const handleInputFileRef = () => {
          inputFileRef.current?.click();
     };

     const handleAvatarUpload = useCallback(async (e: any) => {
          try {
               const dataString = URL.createObjectURL(e.target.files[0]);
               setPreview(dataString);

               const fd = new FormData();

               for (const file of e.target.files || []) {
                    fd.append("avatar", file);
               }
               setLoading(true);
               await api().put(`${USER_URL}/me`, fd, {
                    headers: {
                         "Content-Type": "multipart/form-data",
                         Authorization: `Bearer ${token}`,
                    },
               });
               setLoading(false);
          } catch (error) {
               setLoading(false);
               console.log({ error });
          }
     }, []);

     const handleSubmit = async (e: any) => {
          e.preventDefault();
          try {
               setLoading(true);
               if (email) {
                    const response = await api().put(
                         `${USER_URL}/me`,
                         {
                              email,
                         },
                         {
                              headers: {
                                   "Content-Type": "multipart/form-data",
                                   Authorization: `Bearer ${token}`,
                              },
                         }
                    );
                    setEmail("");
                    console.log("RESPONSE: ", response);
               }

               if (password) {
                    const response = await api().put(
                         `${USER_URL}/me`,
                         {
                              password,
                         },
                         {
                              headers: {
                                   "Content-Type": "multipart/form-data",
                                   Authorization: `Bearer ${token}`,
                              },
                         }
                    );
                    setPassword("");
                    console.log("RESPONSE: ", response);
               }

               setLoading(false);
          } catch (error) {
               setLoading(false);
               console.log({ error });
          }
     };

     return (
          <div>
               <h2>Settings</h2>

               <div className="admin-settings">
                    <div className="tabs">
                         <h4>My Profile</h4>
                    </div>
                    <div>
                         <div
                              className="image"
                              style={{ position: "relative" }}
                         >
                              <input
                                   type="file"
                                   ref={inputFileRef}
                                   onChange={handleAvatarUpload}
                                   hidden
                              />
                              {loading ? (
                                   <Loading />
                              ) : (
                                   <img src={profile} alt="" />
                              )}
                              {true ? (
                                   <div
                                        className="edit-icon"
                                        onClick={handleInputFileRef}
                                   >
                                        +
                                   </div>
                              ) : (
                                   <div className="edit-icon">
                                        <FiEdit2 />
                                   </div>
                              )}
                         </div>
                         <form action="" onSubmit={handleSubmit}>
                              <div>
                                   <label htmlFor="email">
                                        Enter your email
                                   </label>
                                   <div className="input-wrapper">
                                        <input
                                             type="text"
                                             name="email"
                                             value={email}
                                             ref={emailRef}
                                             placeholder="mrjude@gmail.com"
                                             disabled={disabled.email}
                                             onChange={(e) =>
                                                  setEmail(e.target.value)
                                             }
                                        />
                                        <FiEdit2 onClick={handleEmailRef} />
                                   </div>
                              </div>
                              <div>
                                   <label htmlFor="password">
                                        Enter your password
                                   </label>
                                   <div className="input-wrapper">
                                        <input
                                             type="text"
                                             name="password"
                                             value={password}
                                             placeholder="Storereload"
                                             ref={passwordRef}
                                             disabled={disabled.password}
                                             onChange={(e) =>
                                                  setPassword(e.target.value)
                                             }
                                        />
                                        <FiEdit2 onClick={handlePasswordRef} />
                                   </div>
                              </div>
                              <div>
                                   {email || password ? (
                                        <button type="submit">Save</button>
                                   ) : (
                                        ""
                                   )}
                              </div>
                         </form>
                    </div>
               </div>
          </div>
     );
};
