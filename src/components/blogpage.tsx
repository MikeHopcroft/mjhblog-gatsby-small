import React from "react";

import {body, header, navbar, container} from './blogpage.module.css';

interface Props {
    children: React.ReactNode;
}

function BlogPage(props: Props) {
    return (
        <div>
            <div className={header}>Header</div>
            <div className={container}>
                <div className={body}>
                    <h1>Body</h1>
                    {props.children}
                </div>
                <div className={navbar}>
                    <div>Navbar</div>
                </div>
            </div>
        </div>
    );
}

export default BlogPage