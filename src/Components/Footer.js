import React from "react";
import { BsFacebook, BsYoutube, BsTwitter, BsInstagram } from "react-icons/bs";
import "./Footer.css";

function Footer() {
  return (
    <div className="foot_contain">
      <div className="logos">
        <BsFacebook className="footer_icon" />
        <BsInstagram className="footer_icon" />
        <BsTwitter className="footer_icon" />
        <BsYoutube className="footer_icon" />
      </div>
      <div class="sub-links">
        <ul>
          <li>Jobs</li>
          <li>Terms of Use</li>
          <li>Privacy</li>
          <li>Legal Notices</li>
          <li>Corporate Infomation</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <footer>
        <p>©2000-2022 Crypto Raider, Inc.</p>
        <p>©Sahil</p>
      </footer>
    </div>
  );
}

export default Footer;
