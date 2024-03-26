import Head from "next/head";
import Intro from "@/components/Intro";
import Jury from "@/components/Jury";
import PastWinners from "@/components/PastWinners";
import Regulation from "@/components/Regulation";
import Contact from "@/components/Contact";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { prisma } from "@/server/client";
import dynamic from "next/dynamic";

const banner: string = "/bg_richter.jpg";

interface IindexText {
  index_1: string;
  index_2: string;
  index_3: string;
}

interface INoticeForms {
  noticePost: {
    id:string;
    noticeTitle:string;
    formatnoticeText:string;
    createdAt:string;
    updatedAt:string;
  }[]
}

export default function Home({noticePost}:INoticeForms) {
  const Notice = dynamic(() => import("@/components/Notice"), {
    ssr: false
  });
  const { locale } = useRouter();
  const [indexText, set_indexText] = useState<IindexText>();

  useEffect(() => {
    (async () => {
      const response = await fetch(`/locales/${locale}/index.json`);
      const json = await response.json();
      set_indexText(json);
    })();
  }, [locale]);
  return (
    <>
      <Head>
        <title>Richter Award</title>
      </Head>
      <div className="pt-44 pb-24 lg:px-80 px-8 bg-[rgb(12,12,12)] flex lg:justify-end lg:items-center lg:flex-row flex-col justify-center">
          <div className="absolute lg:top-80 lg:left-56 top-60 lg:space-y-10 space-y-5">
            <h1 className="text-white lg:text-5xl text-3xl font-thin">
              {indexText?.index_1}
              <br />
              <span className="text-red-400 font-bold lg:text-7xl text-5xl">
              {indexText?.index_2}
              </span>
            </h1>
            <p className="text-white lg:text-3xl text-lg font-thin tracking-wider">
            {indexText?.index_3}
            </p>
          </div>
          <div
            className="lg:w-[34rem] lg:h-[34rem] bg-cover w-[20rem] h-[20rem] rounded-full"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${banner})`,
            }}
          />
      </div>
      <Intro/>
      <Jury/>
      <PastWinners/>
      <Regulation/>
      <Notice noticePost={noticePost}/>
      <Contact/>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const noticePost = await prisma.$queryRaw`SELECT id, noticeTitle, REPLACE(noticeText, '\n', '\n') as formatnoticeText, createdAt, updatedAt FROM Notice ORDER BY updatedAt DESC`;
  return {
      props: { 
        noticePost: JSON.parse(JSON.stringify(noticePost))
      }

  }
}