import React from "react";

import Archive from "./archive";
import Featured from "./featured";
import TagCloud from "./tagcloud";

import { sidebar } from "./sidebar.module.css";

function Sidebar() {
  return (
    <div className={sidebar}>
      <Featured />
      <TagCloud />
      <Archive />
    </div>
  );
}

export default Sidebar;
