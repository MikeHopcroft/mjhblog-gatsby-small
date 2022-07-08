import React from "react";

import Header from "./header";
import Sidebar from "./sidebar";

import 'normalize.css';

import { container, content } from "./blogpage.module.css";

interface Props {
  children: React.ReactNode;
}

function BlogPage(props: Props) {
  return (
    <div>
      <Header />
      <div className={container}>
        <div className={content}>{props.children}</div>
        <Sidebar />
      </div>
    </div>
  );
}

export default BlogPage;
