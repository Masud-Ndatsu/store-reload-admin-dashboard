import { AiOutlineCalendar } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsEnvelope } from "react-icons/bs";
import "./style.css";
import logo from "../../assets/image4.jpg";

export const Navbar = (): JSX.Element => {
     const today = new Date();
     const formattedDate = today.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
     });
     return (
          <nav className="navbar">
               <div className="nav-left">
                    <input
                         type="search"
                         name="search"
                         autoComplete="off"
                         placeholder="Search for something"
                    />
               </div>
               <div className="nav-right">
                    <div
                         style={{
                              border: "1px solid #b3b3b3",
                              padding: ".5rem",
                              borderRadius: "3px",
                         }}
                    >
                         <AiOutlineCalendar />
                         <span>{formattedDate.replace(/\//g, ". ")}</span>
                    </div>
                    <div style={{ display: "flex" }}>
                         <BsEnvelope />
                         <IoIosNotificationsOutline />
                    </div>
                    <div>
                         <div
                              style={{
                                   width: "30px",
                                   height: "30px",
                                   backgroundColor: "red",
                                   borderRadius: "50%",
                              }}
                         >
                              <img
                                   src={logo}
                                   alt=""
                                   style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "50%",
                                   }}
                              />
                         </div>
                         <div>
                              <p>John Doe</p>
                              <small>Admin</small>
                         </div>
                    </div>
               </div>
          </nav>
     );
};
