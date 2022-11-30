import React from "react";
import "../Css/footer.css";

const Footer = () => {
  return (
    <div className="main-footer">
      <section className="reviews"></section>
      <div className="foot-section">
        <section className="foot">
          <h2>Legal</h2>
          <ul>
            <li>Privacy</li>
            <li>Terms</li>
            <li>Cookie Policy </li>
            <li>Intellectual Property</li>
          </ul>
        </section>
        <section className="foot">
          <h2>Careers</h2>
          <ul>
            <li>Careers Portal</li>
            <li>LinkedIn</li>
          </ul>
        </section>
        <section className="foot">
          <h2>Social</h2>
          <ul>
            <li>Insta</li>
            <li>Facebook</li>
            <li>youtube </li>
            <li>twitter</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Footer;
