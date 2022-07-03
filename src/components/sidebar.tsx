import React from "react";

import Archive from "./archive";
import Featured from "./featured";
import TagCloud from "./tagcloud";

import { sidebar } from "./sidebar.module.css";

function Sidebar() {
  return (
    <div className={sidebar}>
      <div style={{ color: "black", fontWeight: "bold" }}>Navbar</div>
      <Featured />
      <TagCloud />
      <Archive />
    </div>
  );
}

export default Sidebar;
