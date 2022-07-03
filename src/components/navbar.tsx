import {Link} from 'gatsby';
import React from "react";

import { navbar, navitem } from "./navbar.module.css";

function Navbar() {
  return (
    <div className={navbar}>
      <Link className={navitem} to='/'>Home</Link>
      <Link className={navitem} to='/about'>About</Link>
      <Link className={navitem} to='/contact'>Contact</Link>
      <Link className={navitem} to='/gallery'>Gallery</Link>
      <Link className={navitem} to='/blog'>Blog</Link>
    </div>
  );
}

export default Navbar;
