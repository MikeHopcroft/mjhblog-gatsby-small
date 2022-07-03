import React from "react";

import Header from "./header";

import { container, content } from "./otherpage.module.css";

interface Props {
  children: React.ReactNode;
}

function OtherPage(props: Props) {
  return (
    <div>
      <Header />
      <div className={container}>
        <div className={content}>{props.children}</div>
      </div>
    </div>
  );
}

export default OtherPage;
