import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className={styles.container}>
      <nav>
        <Link href="/">
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={100}
            height={37}
            priority
          />
        </Link>
        <ul>
          <Link href="/">Web Chat</Link>
          <Link href="/charts">Grafícos</Link>
        </ul>
      </nav>
    </header>
  );
};
