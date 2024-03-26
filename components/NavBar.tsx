import { useRouter } from "next/router";
import { cls } from "./utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useAnimation, useScroll } from "framer-motion";

const navVarient = {
  top: {
    backgroundColor: "rgb(12,12,12,0.8)",
  },
  scroll: {
    backgroundColor: "rgba(8,8,8,0.8)",
  },
};

const ScrollUp = {
  top: {
    opacity: "0",
  },
  scroll: {
    opacity: "1",
  },
};

export default function NavigationBar() {
  const { locale, locales, push } = useRouter();
  const router = useRouter();
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();
  const buttonAnimation = useAnimation();
  const [lanToggle, set_lanToggle] = useState<"kr" | "en">("en");
  const [toggleMenu, set_toggleMenu] = useState<boolean>(false);

  const handleClick = (lan: any) => {
    set_lanToggle(lan);
    push("/", undefined, { locale: lan });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
        buttonAnimation.start("scroll");
      } else {
        navAnimation.start("top");
        buttonAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation, buttonAnimation]);

  const mobileMenu = () => {
    set_toggleMenu((prev) => !prev);
  };
  return (
    <>
      <div>
        <motion.nav
          variants={navVarient}
          animate={navAnimation}
          transition={{ duration: 0.1 }}
          initial={"top"}
          className="fixed top-0 w-full z-20 flex flex-col"
        >
          <div className="flex justify-between items-center xl:px-24 lg:px-24 px-5 py-8 ">
            <Link href="/">
              <motion.img
                whileHover={{ scale: 1.1 }}
                src="/mainlogo.png"
                className="lg:w-40 w-28"
              />
            </Link>
            <div className="lg:flex hidden justify-between text-sm items-center text-white space-x-10 ">
              {router.pathname === "/" ? (
                <>
                  <Link
                    href="#jury"
                    className="hover:text-red-400 transition-colors"
                  >
                    <span>{locale === "en" ? "JURY" : "심사위원"}</span>
                  </Link>
                  <Link
                    href="#past"
                    className="hover:text-red-400 transition-colors"
                  >
                    <span>
                      {locale === "en" ? "PAST WINNERS" : "역대 수상자"}
                    </span>
                  </Link>
                  <Link
                    href="#regulation"
                    className="hover:text-red-400 transition-colors"
                  >
                    <span>
                      {locale === "en" ? "REGULATION" : "콩쿠르 요강"}
                    </span>
                  </Link>
                  <Link
                    href="#notice"
                    className="hover:text-red-400 transition-colors"
                  >
                    <span>{locale === "en" ? "NOTICE" : "공지사항"}</span>
                  </Link>
                  <Link
                    href="#contact"
                    className="hover:text-red-400 transition-colors"
                  >
                    <span>{locale === "en" ? "CONTACT" : "오시는길"}</span>
                  </Link>
                </>
              ) : null}
            </div>
            <div className="lg:flex hidden justify-between items-center text-white text-xl">
              {router.pathname !== "/admin" ?
                <>
                  <button
                    onClick={() => handleClick("kr")}
                    className={cls(
                      "border-r border-white px-4 transition text-sm",
                      lanToggle === "kr" ? "text-red-400" : "hover:text-red-400"
                    )}
                  >
                    한국어
                  </button>
                  <button
                    onClick={() => handleClick("en")}
                    className={cls(
                      "border-l border-white px-4 transition text-sm",
                      lanToggle === "en" ? "text-red-400" : "hover:text-red-400"
                    )}
                  >
                    ENGLISH
                  </button>
                </>
                :
                <Link
                  href="/"
                  className="border-white px-4 transition text-sm hover:text-red-400"
                >
                  홈으로
                </Link>}
            </div>
            <button className="text-white lg:hidden block" onClick={mobileMenu}>
              {toggleMenu ? (
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </motion.svg>
              ) : (
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </motion.svg>
              )}
            </button>
          </div>
          {toggleMenu ? (
            <motion.div className="text-white lg:hidden flex flex-col text-xs justify-start items-end px-10 gap-10">
              {router.pathname === "/" ? (
                <>
                  <Link
                    href="#jury"
                    className="hover:text-red-400 transition-colors"
                  >
                    <span>JURY</span>
                  </Link>
                  <Link
                    href="#past"
                    className="hover:text-red-400 transition-colors"
                  >
                    <span>PAST WINNERS</span>
                  </Link>
                  <Link
                    href="#regulation"
                    className="hover:text-red-400 transition-colors"
                  >
                    <span>REGULATION</span>
                  </Link>
                  <Link
                    href="#notice"
                    className="hover:text-red-400 transition-colors"
                  >
                    <span>NOTICE</span>
                  </Link>
                  <Link
                    href="#contact"
                    className="hover:text-red-400 transition-colors"
                  >
                    <span>CONTACT</span>
                  </Link>
                </>
              ) : null}
              <div className="flex justify-center items-center text-white text-sm py-3 my-10">
                {router.pathname !== "/admin" ?
                  <>
                    <button
                      onClick={() => handleClick("kr")}
                      className={cls(
                        "border-r border-white px-4 transition",
                        lanToggle === "kr" ? "text-red-400" : "hover:text-red-400"
                      )}
                    >
                      한국어
                    </button>
                    <button
                      onClick={() => handleClick("en")}
                      className={cls(
                        "border-l border-white px-4 transition",
                        lanToggle === "en" ? "text-red-400" : "hover:text-red-400"
                      )}
                    >
                      ENGLISH
                    </button>
                  </>
                  :
                  <Link
                    href="/"
                    className="border-white px-4 transition text-sm hover:text-red-400"
                  >
                    홈으로
                  </Link>}
              </div>
            </motion.div>
          ) : null}
        </motion.nav>
      </div>
      <motion.button
        onClick={scrollToTop}
        variants={ScrollUp}
        initial={{ opacity: 0 }}
        animate={buttonAnimation}
        transition={{ duration: 0.1 }}
        className="fixed bottom-4 right-4 bg-white lg:p-5 p-3 rounded-full hover:bg-gray-300 shadow-xl z-30 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
      </motion.button>
    </>
  );
}
