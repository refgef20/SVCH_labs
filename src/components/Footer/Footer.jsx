import "../Footer/footer.css";
import "../../index.css";
import React, { Component } from "react";
import MenuCard from "./MenuCard";
import Navigation from "./Navigation";

const Footer = () => {
  return (
    <footer>
      <div className="container-for-footer">
        <MenuCard />
        <Navigation />
      </div>
    </footer>
  );
};

export default Footer;
