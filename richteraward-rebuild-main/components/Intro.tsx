
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IintroText {
  intro_title: string;
  intro_1: string;
  intro_2: string;
  intro_3: string;
}

export default function Intro() {
  const { locale } = useRouter();
  const [introText, set_introText] = useState<IintroText>();

  useEffect(() => {
    (async () => {
      const response = await fetch(`/locales/${locale}/intro.json`);
      const json = await response.json();
      set_introText(json);
    })();
  }, [locale]);
  return (
    <>
      <div className="lg:px-36 bg-[#0c0c0c] py-36">
        <div className="flex flex-col lg:justify-start justify-center lg:items-start items-center space-y-10 lg:w-2/3">
            <h1 className="text-white lg:text-4xl text-2xl tracking-tighter lg:text-left text-center border-b-2 border-b-red-400 pb-3">" {introText?.intro_title} "</h1>
          <p className="text-white lg:text-xl tracking-tight text-xs lg:mx-0 mx-16 font-thin">
            {introText?.intro_1}<br/>
            {introText?.intro_2}<br/>
            {introText?.intro_3}
          </p>
        </div>
      </div>
    </>
  );
}
