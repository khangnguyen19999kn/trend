import logo from "@/assets/images/logo2.png";
import { Image } from "@mantine/core";
import { useState } from "react";
import style from "../styles/header.module.scss";
export default function Header() {
  const [activeItem, setActiveItem] = useState(0);
  const changeActiveItem = (index: number) => {
    setActiveItem(index);
  };
  const listItemNav = ["Home", "About", "Experience", "Contact"];
  return (
    <div className="w-full h-14 flex justify-center">
      <div className={style.mainNav}>
        <div className="w-1/5 flex justify-center items-center">
          <Image src={logo} width={56} height={56} />
        </div>
        <div className="w-4/5">
          <ul className="flex justify-end h-full items-center px-10">
            {listItemNav.map((item, index) => {
              return (
                <li key={index} className={style.itemNav}>
                  {activeItem === index && <div className={style.itemActive} />}
                  <button onClick={() => changeActiveItem(index)}>
                    {item}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
