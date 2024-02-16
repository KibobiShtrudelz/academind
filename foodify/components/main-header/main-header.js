"use client";

import Link from "next/link";
import Image from "next/image";

import NavLink from "./nav-link/nav-link";
import MainHeaderBackground from "./main-header-background/main-header-background";

import classes from "./main-header.module.css";

import logo from "@/assets/logo.png"; // Next import-ва картинката като обект, затова после го ползваме с dot notation: logo.src, АКО ще го подаваме на обикновен <img/> tag! Ако ще го подаваме на <Image /> от Next подаваме целият обект!

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />

      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          {/* <img src={logo.src} alt="Food on a plate" /> */}
          <Image src={logo} alt="Food on a plate" priority />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>

            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
