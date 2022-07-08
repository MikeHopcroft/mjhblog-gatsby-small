import { StaticImage } from "gatsby-plugin-image";
import React from "react";

import Navbar from "./navbar";

import { header } from "./header.module.css";

function Header() {
  return (
    <div className={header}>
      <StaticImage alt="banner" src="../../content/images/IMG_5231-Header.jpg" />
      <Navbar />
    </div>
  );
}

export default Header;
