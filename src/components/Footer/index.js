import React, { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Footer.module.sass";
import Group from "./Group";
import Image from "../Image";
import Form from "../Form";
import Theme from "../Theme";

const items = [
  // {
  //   title: "Crypter.",
  //   menu: [
  //     {
  //       title: "Discover",
  //       url: "/search01",
  //     },
  //     {
  //       title: "Connect wallet",
  //       url: "/connect-wallet",
  //     },
  //   ],
  // },
  {
    title: "Info",
    menu: [
      {
        url: "/marketCollect",
        title: "Discover",
      },
      {
        url: "/faq",
        title: "How it Works",
      },
    
      {
        url: "/whitepaper",
        title: "Whitepaper",
      },
      {
        url: "/explain",
        title: "Why LOFI",
      },
      {
        url: "/tokenomics",
        title: "Tokenomics",
      },
      {
        url: "/roadmap",
        title: "Roadmap",
      },
      {
        url: "/team",
        title: "Team",
      },
      {
        url: "/merch",
        title: "Merch",
      },
      {
        url: "/en",
        title: "En",
      },
    
      {
        url: "/item",
        title: "Create item",
      },
      {
        url: "/profile",
        title: "Profile",
      },
    ],
  },
];

const Footers = (props) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    alert();
  };

  return (
    <footer className={styles.footer} style={{ opacity: `${props.opacity}` }}>
      <div className={cn("container", styles.container)}>
        <div className={styles.row}>
          <div className={styles.col}>
            <Link className={styles.logo} to="/">
              <Image
                className={styles.pic}
                src="/images/LOFI-DEFI-Logo-Black-Vertical.svg"
                srcDark="/images/LOFI-DEFI-Logo-White-Vertical.svg"
                alt="BlockFox"
              />
            </Link>
            {/* <div className={styles.info}>The metaverse marketplace.</div> */}
            <div className={styles.version}>
              <a className={styles.details} href="https://lofi-defi.com" target="_blank">Website</a>
              <a className={styles.details} href="https://t.me/lofi_defi" target="_blank">Telegram</a>
              <a className={styles.details} href="https://discord.com/invite/HqF4dwAdNN" target="_blank">Discord</a>
              <a className={styles.details} href="https://medium.com/lofi-defi" target="_blank">Medium</a>
              {/* <Theme className="theme-big" /> */}
            </div>
            <div className={styles.version}>
              <div className={styles.details} href="https://www.reddit.com/r/lofi_defi" target="_blank">Reddit</div>
              <div className={styles.details} href="https://www.youtube.com/c/lofi-defi" target="_blank">YouTube</div>
              <div className={styles.details} href="https://github.com/LOFIDEFI" target="_blank">GitHub</div>
              <div className={styles.details} href="https://twitch.tv/lofi_defi" target="_blank">Twitch</div>
              {/* <Theme className="theme-big" /> */}
            </div>
            <div className={styles.version}>
              <div className={styles.details} href="https://twitter.com/lofi_defi" target="_blank">Twitter</div>
              <div className={styles.details} href="https://facebook.com/lofidefi" target="_blank">Facebook</div>
              <div className={styles.details} href="https://instagram.com/lofi_defi" target="_blank">Instagram</div>
              {/* <Theme className="theme-big" /> */}
            </div>
          </div>
          <div className={styles.col}>
            {items.map((x, index) => (
              <Group className={styles.group} item={x} key={index} />
            ))}
          </div>
          {/* <nav className={styles.nav}>
            {items.map((x, index) => (
              <Link
                className={styles.link}
                // activeClassName={styles.active}
                to={x.url}
                key={index}
              >
                {x.title}
              </Link>
            ))}
          </nav> */}
          {/* <div className={styles.col}>
            <div className={styles.category}>Join Newsletter</div>
            <div className={styles.text}>
              Subscribe our newsletter to get more free design course and
              resource
            </div>
            <Form
              className={styles.form}
              value={email}
              setValue={setEmail}
              onSubmit={() => handleSubmit()}
              placeholder="Enter your email"
              type="email"
              name="email"
            />
          </div> */}
        </div>
        {/* <div className={styles.foot} style={{ display: 'flex', justifyContent: 'center' }}>
          <div className={styles.copyright}>
            Copyright © 2021 BlockFox. All rights reserved
          </div>
          <div className={styles.note}>
            We use cookies for better service. <a href="/#">Accept</a>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footers;
