import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IcontactText {
  manager: string;
  email: string;
  location: string;
  location_text1: string;
  location_text2: string;
}

export default function Contact() {
  const { locale } = useRouter();
  const [contactText, set_contactText] = useState<IcontactText>();

  useEffect(() => {
    (async () => {
      const response = await fetch(`/locales/${locale}/contact.json`);
      const json = await response.json();
      set_contactText(json);
    })();
  }, [locale]);
  return (
    <>
      <div
        className="lg:px-16 px-5 bg-[#080808] lg:pt-14 py-14 flex flex-col justify-center items-center space-y-10"
        id="contact"
      >
        <span className="lg:text-4xl text-lg font-thin tracking-widest border-b border-red-800 p-3 text-white">
          {locale === "en" ? "Contact" : "오시는길"}
        </span>
        <div className="flex justify-center items-center lg:gap-24 gap-5 lg:flex-row flex-col">
          <motion.div
            whileHover={{ y: -7 }}
            className="border border-white flex flex-col justify-center items-center w-72 lg:h-72 h-32"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="white"
              className="lg:w-10 lg:h-10 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <h2 className="text-white font-thin tracking-tight lg:text-lg text-xs">
              {contactText?.manager}
            </h2>
            <h2 className="text-white font-thin tracking-tight lg:text-2xl text-xs lg:mt-10 mt-5">
              Anna Kim
            </h2>
          </motion.div>

          <motion.div
            whileHover={{ y: -7 }}
            className="border border-white flex flex-col justify-center items-center w-72 lg:h-72 h-32"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="white"
              className="lg:w-10 lg:h-10 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>

            <h2 className="text-white font-thin tracking-tight lg:text-lg text-xs">
            {contactText?.email}
            </h2>
            <h2 className="text-white font-thin tracking-tight lg:text-xl text-xs lg:mt-10 mt-5">
            kmat@nationalux.cafe24.com
            </h2>
          </motion.div>

          <motion.div
            whileHover={{ y: -7 }}
            className="border border-white flex flex-col justify-center items-center w-72 lg:h-72 h-32"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="white"
              className="lg:w-10 lg:h-10 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>

            <h2 className="text-white font-thin tracking-tight lg:text-lg text-xs">
            {contactText?.location}
            </h2>
            <h2 className="text-white font-thin tracking-tight lg:text-sm text-xs lg:mt-10 mt-5">
            {contactText?.location_text1}<br/>
            {contactText?.location_text2}
            </h2>
          </motion.div>
        </div>
      </div>
    </>
  );
}
