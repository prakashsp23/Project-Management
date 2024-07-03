'use client'
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ModeToggle } from "./ui/toggle-mode";
import { ProfileDropdown } from "./profile";
export const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const [selectedTab, setSelectedTab] = useState("");

  const handleMouseLeave = () => {
    const tabElement = document.querySelector(`[data-tab="${selectedTab}"]`);
    if (tabElement) {
      const { offsetLeft, offsetWidth } = tabElement;
      setPosition({
        left: offsetLeft,
        width: offsetWidth,
        opacity: 1,
      });
    }
  };

  return (
    <ul
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto flex w-fit rounded-full border-2 border-black dark:border-white bg-white dark:bg-black p-1"
    >
      <Link href="/">
        <Tab
          setPosition={setPosition}
          isSelected={selectedTab === "home"}
          onClick={() => setSelectedTab("home")}
          tabName="home"
        >
          Home
        </Tab>
      </Link>

      <Link href="/projects">
        <Tab
          setPosition={setPosition}
          isSelected={selectedTab === "projects"}
          onClick={() => setSelectedTab("projects")}
          tabName="projects"
        >
          Projects
        </Tab>
      </Link>

      <Link href="/team">
        <Tab
          setPosition={setPosition}
          isSelected={selectedTab === "team"}
          onClick={() => setSelectedTab("team")}
          tabName="team"
        >
          Team
        </Tab>
      </Link>

      <Link href="/chat">
        <Tab
          setPosition={setPosition}
          isSelected={selectedTab === "chat"}
          onClick={() => setSelectedTab("chat")}
          tabName="chat"
        >
          Chat
        </Tab>
      </Link>

      <Cursor position={position} />
      <div className="flex items-center justify-center gap-4 pl-2 ">
        <ModeToggle />
        <ProfileDropdown />
      </div>

    </ul>
  );
};
const Tab = ({ children, setPosition, isSelected, onClick, tabName }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      data-tab={tabName}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      onClick={() => {
        onClick();
        if (ref?.current) {
          const { width } = ref.current.getBoundingClientRect();
          setPosition({
            left: ref.current.offsetLeft,
            width,
            opacity: 1,
          });
        }
      }}
      className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white  mix-blend-difference md:px-5 md:py-3 md:text-base ${
        isSelected ? "font-bold text-black" : "text-gray-600"
      }`}
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-black dark:bg-white md:h-12"
    />
  );
 };
