import { ReactNode, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import style from "./styles/layout.module.scss";
export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className="relative min-h-screen">
      <div className="absolute top-1 w-full z-10">
        <Header />
      </div>
      <div className={style.container}>
        <div className="w-[80%] mt-20">
          {children}
        </div>
      </div>
    </div>
  );
}
