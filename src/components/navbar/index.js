import Image from "next/image";
import Link from "next/link";

import { navigation } from "../../constants";
import styles from "@/styles/Navbar.module.scss";

import logo from "../../../public/assets/book-reader-logo.png";
import menu from "../../../public/assets/hamburger.png";
import { useState } from "react";
import { useRouter } from "next/router";

const Navbar = (props) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  return (
    <div style={{ display: "flex" }}>
      <div
        className={styles.navbarComponent}
        style={{ width: isMenuOpen ? "18%" : "8%" }}
      >
        <Link href="/">
          <Image src={logo} width={100} height={80} alt="logo" />
        </Link>
        <div className={styles.navbarContainer}>
          {navigation.map((data, key) => {
            return (
              <Link href={data?.link} key={key}>
                {console.log("link", data.link)}
                <div
                  className={`${styles.navbarItems} ${
                    isMenuOpen ? styles.hoverItem : ""
                  }`}
                  style={{
                    backgroundColor:
                      router?.pathname === data?.link && isMenuOpen
                        ? "rgb(242, 153, 98)"
                        : "",
                  }}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setLinkValue(data.link);
                  }}
                >
                  <Image
                    src={data?.src}
                    width={22}
                    height={20}
                    alt={data?.title}
                    style={{
                      backgroundColor:
                        router?.pathname === data?.link
                          ? "rgb(242, 153, 98)"
                          : "",
                      borderRadius:
                        router?.pathname === data?.link ? "50%" : "100%",
                    }}
                  />
                  {isMenuOpen ? <p>{data?.title}</p> : ""}
                </div>
              </Link>
            );
          })}
          <Image
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ position: "fixed", bottom: "50px" }}
            src={menu}
            width={22}
            height={20}
            alt="menu"
          />
        </div>
      </div>
      <div style={{ width: isMenuOpen ? "82%" : "92%" }}>{props.children}</div>
    </div>
  );
};

export default Navbar;