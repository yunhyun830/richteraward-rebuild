import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AppForm from "./AppForm";

interface IregText {
  reg_title: string;
  reg_titleText_1: string;
  reg_titleText_2: string;
  prizes: string;
  section: string;
  repert: string;
  age: string;
  announce: string;
  awards: string;
  application: string;
  teacher: string;
  detail: string;
  prizes_1: string;
  prizes_2: string;
  section_1: string;
  section_2: string;
  section_3: string;
  section_4: string;
  section_5: string;
  section_6: string;
  repert_1: string;
  repert_2: string;
  repert_3: string;
  repert_4: string;
  repert_5: string;
  repert_6: string;
  repert_7: string;
  repert_8: string;
  age_1: string;
  age_2_1: string;
  age_2_2: string;
  age_3_1: string;
  age_3_2: string;
  age_4_1: string;
  age_4_2: string;
  age_5_1: string;
  age_5_2: string;
  age_6_1: string;
  age_6_2: string;
  age_7: string;
  age_8: string;
  announce_1: string;
  announce_2: string;
  announce_3: string;
  awards_1: string;
  awards_2: string;
  application_title: string;
  application_1: string;
  application_1_1: string;
  application_2: string;
  application_2_1: string;
  application_2_2: string;
  application_2_3: string;
  application_2_4: string;
  application_2_5: string;
  application_2_6: string;
  application_2_7: string;
  application_2_8: string;
  application_2_9: string;
  application_2_10: string;
  application_2_11: string;
  application_2_12: string;
  application_2_13: string;
  application_2_14: string;
  teacher_1: string;
  teacher_2: string;
  teacher_3: string;
  teacher_4: string;
  teacher_5: string;
  teacher_6: string;
  teacher_7: string;
  teacher_8: string;
  teacher_9: string;
  teacher_10: string;
  teacher_11: string;
  vote_1: string;
  vote_2: string;
  vote_3: string;
  detail_1: string;
  detail_2: string;
  detail_3: string;
  detail_4: string;
  detail_5: string;
  detail_6: string;
  detail_7: string;
  detail_8: string;
  detail_9: string;
  detail_10: string;
  detail_11: string;
}

export default function Regulation() {
  const { locale } = useRouter();
  const [regText, set_regText] = useState<IregText>();
  const [apply, set_apply] = useState(false);
  const getOverlay = () => set_apply(true);
  const closeOverlay = () => set_apply(false);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/locales/${locale}/regulation.json`);
      const json = await response.json();
      set_regText(json);
    })();
  }, [locale]);

  return (
    <>
      <div
        className="lg:px-24 px-5 bg-[whitesmoke] lg:pt-32 py-14"
        id="regulation"
      >
        <div className="flex flex-col justify-center items-center space-y-10">
          <span className="lg:text-4xl text-lg font-extralight tracking-widest border-b border-red-800 p-3">
            {regText?.reg_title}
          </span>
          <div className="flex flex-col justify-center items-center">
            <p className="lg:text-xl text-xs font-extralight text-center">
              {regText?.reg_titleText_1}
              <br />
              {regText?.reg_titleText_2}
            </p>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 mt-10">
              <div className="lg:col-span-2 flex flex-col justify-center items-center space-y-6 shadow-2xl lg:p-7 p-3 bg-white">
                <h1 className="lg:text-2xl text-sm font-extralight tracking-widest border-b border-red-800 p-3 text-center">
                  {regText?.prizes}
                </h1>
                <p className="lg:text-3xl text-xl font-bold tracking-tight text-yellow-600">
                  {regText?.prizes_1}
                </p>
                <p className="lg:text-lg text-sm tracking-tight font-extralight">
                  {regText?.prizes_2}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center space-y-6 shadow-2xl lg:p-7 p-3 bg-white">
                <h1 className="lg:text-2xl text-sm font-extralight tracking-widest border-b border-red-800 p-3 text-center">
                  {regText?.section}
                </h1>
                <p className="lg:text-lg text-sm tracking-tight font-extralight">
                  {regText?.section_1}
                  <br />
                  {regText?.section_2}
                  <br />
                  {regText?.section_3}
                  <br />
                  {regText?.section_4}
                  <br />
                  <span className="ml-5 lg:text-sm text-xs">
                    {regText?.section_5}
                  </span>
                  <br />
                  <span className="ml-5 lg:text-sm text-xs">
                    {regText?.section_6}
                  </span>
                </p>
              </div>
              <div className="flex flex-col justify-center items-center space-y-6 shadow-2xl lg:p-7 p-3 bg-white">
                <h1 className="lg:text-2xl text-sm font-extralight tracking-widest border-b border-red-800 p-3 text-center">
                  {regText?.repert}
                </h1>
                <p className="lg:text-lg text-sm tracking-tight font-extralight">
                  {regText?.repert_1} <br />
                  <br />
                  {regText?.repert_2}
                  <br />
                  {regText?.repert_3}
                  <br />
                  {regText?.repert_4}
                  <br />
                  {regText?.repert_5}
                  <br />
                  {regText?.repert_6}
                  <br />
                  <br />
                  <span className="lg:text-sm text-xs">
                    {regText?.repert_7}
                  </span>
                  <br />
                  <span className="lg:text-sm text-xs">
                    {regText?.repert_8}
                  </span>
                </p>
              </div>
              <div className="flex flex-col justify-center items-center space-y-6 shadow-2xl lg:p-7 p-3 bg-white">
                <h1 className="lg:text-2xl text-sm font-extralight tracking-widest border-b border-red-800 p-3 text-center">
                  {regText?.age}
                </h1>
                <p className="lg:text-sm text-xs tracking-tight font-extralight">
                  {regText?.age_1}
                </p>
                <div className="grid lg:grid-cols-3 grid-cols-1 justify-between items-center gap-5 font-extralight lg:text-lg text-xs text-center">
                  <div>
                    <p>{regText?.age_2_1}</p>
                    <p>{regText?.age_2_2}</p>
                  </div>
                  <div>
                    <p>{regText?.age_3_1}</p>
                    <p>{regText?.age_3_2}</p>
                  </div>
                  <div>
                    <p>{regText?.age_4_1}</p>
                    <p>{regText?.age_4_2}</p>
                  </div>
                  <div>
                    <p>{regText?.age_5_1}</p>
                    <p>{regText?.age_5_2}</p>
                  </div>
                  <div>
                    <p>{regText?.age_6_1}</p>
                    <p>{regText?.age_6_2}</p>
                  </div>
                </div>
                <p className="lg:text-sm text-xs tracking-tight font-extralight">
                  {regText?.age_7}
                  <br />
                  {regText?.age_8}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center space-y-6 shadow-2xl lg:p-7 p-3 bg-white">
                <h1 className="lg:text-2xl text-sm font-extralight tracking-widest border-b border-red-800 p-3 text-center">
                  {regText?.announce}
                </h1>
                <p className="lg:text-lg text-sm tracking-tight font-extralight">
                  <span>{regText?.announce_1}</span>
                  <br />
                  <br />
                  {regText?.announce_2}
                  <br />
                  {regText?.announce_3}
                </p>
              </div>
              <div className="lg:col-span-2 flex flex-col justify-center items-center space-y-6 shadow-2xl lg:p-7 p-3 bg-white">
                <h1 className="lg:text-2xl text-sm font-extralight tracking-widest border-b border-red-800 p-3 text-center">
                  {regText?.awards}
                </h1>
                <p className="lg:text-lg text-sm tracking-tight font-extralight">
                  {regText?.awards_1} <br />
                  <br />
                  {regText?.awards_2}
                </p>
              </div>
              <div className="lg:col-span-2 flex flex-col justify-center items-center space-y-6 shadow-2xl lg:p-7 p-3 bg-white">
                <h1 className="lg:text-2xl text-sm font-extralight tracking-widest border-b border-red-800 p-3 text-center">
                  {regText?.application}
                </h1>
                <p className="lg:text-lg text-sm tracking-tight font-extralight">
                  {regText?.application_title}
                </p>
                <p className="lg:text-lg text-sm tracking-tight font-extralight">
                  {regText?.application_1}
                  <br />
                  <span className="lg:text-base text-xs">
                    {regText?.application_1_1}
                  </span>
                  <br />
                  <br />
                  {regText?.application_2}
                  <br />
                  <span className="lg:text-base text-xs">
                    {regText?.application_2_1}
                    <br />
                    {regText?.application_2_2}
                    <br />
                    {regText?.application_2_3}
                    <br />
                    {regText?.application_2_4}
                    <br />
                    <span className="lg:text-sm text-xs">
                      {regText?.application_2_5}
                      <br />
                      {regText?.application_2_6}
                      <br />
                      {regText?.application_2_7}
                      <br />
                      {regText?.application_2_8}
                      <br />
                    </span>
                    {regText?.application_2_9}
                    <br />
                    {regText?.application_2_10}
                    <br />
                    {regText?.application_2_11}
                    <br />
                    {regText?.application_2_12}
                    <br />
                    {regText?.application_2_13}
                    <br />
                    {regText?.application_2_14}
                  </span>
                </p>
              </div>
              <div className="lg:col-span-2 flex flex-col justify-center items-center space-y-6 shadow-2xl lg:p-7 p-3 bg-white">
                <h1 className="lg:text-2xl text-sm font-extralight tracking-widest border-b border-red-800 p-3 text-center">
                  {regText?.teacher}
                </h1>
                <p className="lg:text-lg text-sm tracking-tight font-extralight">
                  {regText?.teacher_1}
                </p>
                </div>
                <div className="lg:col-span-2 flex flex-col justify-center items-center space-y-6 shadow-2xl lg:p-7 p-3 bg-white">
                <h1 className="lg:text-2xl text-sm font-extralight tracking-widest border-b border-red-800 p-3 text-center">
                {regText?.teacher_2}
                </h1>
                <p className="lg:text-base text-xs tracking-tight font-extralight">
                  <br />
                  {regText?.teacher_3}
                  <br />
                  {regText?.teacher_4}
                  <br />
                  {regText?.teacher_5}
                </p>
                <p className="lg:text-xl text-sm tracking-widest font-extralight border-b border-red-800 pt-8">
                  {regText?.teacher_6}
                </p>
                <p className="lg:text-lg text-sm tracking-tight font-extralight">
                  {regText?.teacher_7}
                  <br />
                  {regText?.teacher_8}
                </p>
                <p className="lg:text-xl text-sm tracking-widest font-extralight border-b border-red-800 pt-8">
                  
                {regText?.teacher_9}
                </p>
                <p className="lg:text-lg text-sm tracking-tight font-extralight">
                {regText?.teacher_10} <br/>
                  {regText?.teacher_11}
                </p>
                <p className="lg:text-xl text-sm tracking-widest font-extralight border-b border-red-800 pt-8">        
                {regText?.vote_1}
                </p>
                <p className="lg:text-lg text-sm tracking-tight font-extralight">
                {regText?.vote_2} <br/>
                  {regText?.vote_3}
                </p>
              </div>
              <div className="lg:col-span-2 flex flex-col justify-center items-center space-y-6 shadow-2xl lg:p-7 p-3 bg-white">
                <h1 className="lg:text-2xl text-sm font-extralight tracking-widest border-b border-red-800 p-3 text-center">
                  {regText?.detail}
                </h1>
                <p className="lg:text-lg text-sm tracking-tight font-extralight">
                  {regText?.detail_1}
                  <br />
                  {regText?.detail_2}
                  <br />
                  {regText?.detail_3}
                  <br />
                  {regText?.detail_4}
                  <br />
                  {regText?.detail_5}
                  <br />
                  {regText?.detail_6}
                  <br />
                  {regText?.detail_7}
                  <br />
                  {regText?.detail_8}
                  <br />
                  {regText?.detail_9}
                  <br />
                  {regText?.detail_10}
                  <br />
                  {regText?.detail_11}
                </p>
              </div>
              <div className="lg:col-span-2 flex justify-center items-center">
                <button
                  onClick={getOverlay}
                  className="bg-red-800 text-white font-extralight tracking-tight lg:text-2xl text-lg lg:w-72 w-52 py-5 hover:bg-black transition rounded-xl"
                >
                  {locale === "en" ? "APPLY" : "신청하기"}
                </button>
              </div>
            </div>
            {apply ? (
              <>
                <motion.div
                  className="fixed w-full h-full bg-[rgba(0,0,0,0.6)] top-0 z-30 transtion"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="fixed lg:top-8 top-5 z-40 lg:w-[65%] w-[90%]"
                >
                  <h1
                    onClick={closeOverlay}
                    className="flex justify-end lg:mb-3 mb-1 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="white"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </h1>
                  <AppForm />
                </motion.div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
