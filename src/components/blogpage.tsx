import { StaticImage } from "gatsby-plugin-image";
import React from "react";

import {body, header, navbar, navitem, sidebar, container} from './blogpage.module.css';

import Archive from './archive';
import Featured from './featured';
import TagCloud from './tagcloud';

interface Props {
    children: React.ReactNode;
}

function BlogPage(props: Props) {
    return (
        <div>
            <div className={header}>
                <StaticImage alt="banner" src="../images/IMG_5231-Header.jpg"/>
                <div className={navbar}>
                    <span className={navitem}>Home</span>
                    <span className={navitem}>About</span>
                    <span className={navitem}>Contact</span>
                    <span className={navitem}>Gallery</span>
                    <span className={navitem}>Blog</span>
                </div>
            </div>
            <div className={container}>
                <div className={body}>
                    {props.children}
                </div>
                <div className={sidebar}>
                    <div style={{color:'black', fontWeight: 'bold'}}>Navbar</div>
                    <Featured/>
                    <TagCloud/>
                    <Archive/>
                </div>
            </div>
        </div>
    );
}

export default BlogPage