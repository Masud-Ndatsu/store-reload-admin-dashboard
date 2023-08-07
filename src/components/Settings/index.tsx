import { useState } from "react";
import { Input } from "../Input";
import profile from "../../assets/profile.jpg";
import "./style.css";
export const Settings = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <h2>Settings</h2>

      <div className="admin-settings">
        <div className="tabs">
          <h4>My Profile</h4>
        </div>
        <div>
          <div className="image">
            <img src={profile} alt="" />
          </div>
          <form action="">
            <Input
              type="text"
              name="email"
              value={email}
              placeholder="mrjude@gmail.com"
              handleChange={(e) => setEmail(e.target.value)}
              label="Your Email Address"
            />
            <Input
              type="text"
              name="email"
              value={password}
              placeholder="Storereload"
              handleChange={(e) => setPassword(e.target.value)}
              label="Your Password"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
