import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";

const boxVar = {
  entry: (isBack: boolean) => ({
    x: isBack ? -500 : 500,
    opacity: 0,

  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.2
    }
  },
  hide: (isBack: boolean) => ({
    x: isBack ? 500 : -500,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  })
};

export default function PastWinners() {
  const { locale } = useRouter();
  const [visible, set_visible] = useState(0);
  const [back, set_back] = useState(false);
  const nextCard = () => {
    set_visible((prev) => (prev === 2 ? 2 : prev + 1));
    set_back(false);
  }
  const prevCard = () => {
    set_visible((prev) => (prev === 0 ? 0 : prev - 1));
    set_back(true);
  }
  const [winnerList, set_winnerList] = useState<string[]>([]);
  const getMyAwards = (year: number, award: string) => {
    if (year === 0) {
      switch (award) {
        case "GRAND PRIZE":
          set_winnerList(["2020", "Grand"]);
          break;
        case "1ST PRIZE":
          set_winnerList(["2020", "First"]);
          break;
        case "2ND PRIZE":
          set_winnerList(["2020", "Second"]);
          break;
        case "3RD PRIZE":
          set_winnerList(["2020", "Third"]);
          break;
        case "SPECIAL PRIZE":
          set_winnerList(["2020", "Special"]);
          break;
      }
    } else if (year === 1) {
      switch (award) {
        case "GRAND PRIZE":
          set_winnerList(["2021", "Grand"]);
          break;
        case "1ST PRIZE":
          set_winnerList(["2021", "First"]);
          break;
        case "2ND PRIZE":
          set_winnerList(["2021", "Second"]);
          break;
        case "3RD PRIZE":
          set_winnerList(["2021", "Third"]);
          break;
        case "SPECIAL PRIZE":
          set_winnerList(["2021", "Special"]);
          break;
      }
    } else if (year === 2) {
      switch (award) {
        case "GRAND PRIZE":
          set_winnerList(["2022", "Grand"]);
          break;
        case "1ST PRIZE":
          set_winnerList(["2022", "First"]);
          break;
        case "2ND PRIZE":
          set_winnerList(["2022", "Second"]);
          break;
        case "3RD PRIZE":
          set_winnerList(["2022", "Third"]);
          break;
        case "SPECIAL PRIZE":
          set_winnerList(["2022", "Special"]);
          break;
      }
    }
    set_winnerCard(true);
  }
  const [winnerCard, set_winnerCard] = useState<boolean>(false);
  return (
    <>
      <div className="lg:px-3 px-1 bg-[whitesmoke] lg:pt-32 py-14" id="past">
        <div className="flex flex-col justify-center items-center space-y-10">
          <span className="lg:text-4xl text-lg font-thin tracking-widest border-b border-red-800 p-3">
            {locale == "en" ? "Past Winners" : "역대 수상자"}
          </span>
          <h2 className="border-b border-red-800 p-2 lg:text-lg text-xs font-bold tracking-tighter">{2020 + visible}</h2>
          <div
            className="flex flex-col w-full justify-center items-center relative lg:h-72 h-40 overflow-x-hidden"
          >
            <AnimatePresence mode="wait" custom={back}>
              {[0, 1, 2].map((i) => i === visible ? (
                <motion.div
                  custom={back}
                  variants={boxVar}
                  initial="entry"
                  animate="center"
                  exit="hide"
                  key={visible}
                  className="absolute flex justify-between lg:gap-16 gap-5 top-0 z-10">
                  {["GRAND PRIZE", "1ST PRIZE", "2ND PRIZE", "3RD PRIZE", "SPECIAL PRIZE"].map((awardName, number) => (
                    <div className="flex flex-col lg:gap-6 gap-2 mt-12 justify-center items-center" key={number}>
                      <motion.div
                        className="cursor-pointer lg:w-36 lg:h-36 w-12 h-12 rounded-full bg-cover bg-no-repeat relative"
                        whileHover={{ scale: 1.02 }}
                        style={{ backgroundImage: `url('/${awardName}.jpg')` }}
                        onClick={() => getMyAwards(i, awardName)}
                        
                      >
                        <div className="w-full h-full bg-[rgba(0,0,0,0.4)] rounded-full absolute hover:bg-[rgba(0,0,0,0)] transition" />
                      </motion.div>
                      <p className="text-center lg:text-lg text-[0.5rem]">{awardName.split(" ")[0]}<br/>{awardName.split(" ")[1]}</p>
                    </div>
                  ))}
                </motion.div>
              ) : null
              )}
            </AnimatePresence>
            <div className="absolute flex justify-between w-full lg:top-[8rem] top-[4rem]">
              <button onClick={prevCard}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={visible === 0 ? `none` : `rgb(153, 27, 27)`} className="lg:w-12 lg:h-12 w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button onClick={nextCard}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={visible === 2 ? `none` : `rgb(153, 27, 27)`} className="lg:w-12 lg:h-12 w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {winnerCard ?
        <motion.div
          className="fixed w-full h-full bg-[rgba(0,0,0,0.6)] top-0 z-30 transtion flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => set_winnerCard(false)}
        >
          {winnerList[0] === "2020" &&
            <div className="text-white bg-black font-thin tracking-tight overflow-y-scroll lg:w-[55rem] lg:max-h-96 w-[90vw] px-5 lg:px-16 py-10 max-h-72">
              <h1 className="lg:text-3xl pb-14 text-xl">The 1st online {winnerList[1]} Prize Result</h1>
              {winnerList[1] === "Grand" &&
                <div className="lg:text-lg space-y-5 text-sm">
                  <div className="flex justify-between items-start gap-5">
                    <span>Seongju Noah Kim</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/DeHnVs" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="flex justify-between items-start gap-5">
                    <span>Kang Tae Kim</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/qDcE88" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/I8KUr2" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              }
              {winnerList[1] === "First" &&
                <div className="lg:text-lg space-y-5 text-sm">

                  <h1 className="lg:text-xl text-base text-red-300 border-b border-red-300 lg:w-72 w-52">Junior Division</h1>
                  <div className="flex justify-between items-start gap-5">
                    <span>Khoi Ho</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/7VDhnn" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <h1 className="lg:text-xl text-base text-red-300 border-b border-red-300 lg:w-72 w-52 pt-8">Intermediate Division</h1>
                  <div className="flex justify-between items-start gap-5">
                    <span>Arthur Grigoryan</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/RwNc4y" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/NLyTHG" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <h1 className="lg:text-xl text-base text-red-300 border-b border-red-300 lg:w-72 w-52 pt-8">Senior Division</h1>
                  <div className="flex justify-between items-start gap-5">
                    <span>Zihao Ye</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/DZYdW1" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              }
              {winnerList[1] === "Second" &&
                <div className="lg:text-lg space-y-5 text-sm">

                  <h1 className="lg:text-xl text-base text-red-300 border-b border-red-300 lg:w-72 w-52">Junior Division</h1>
                  <div className="flex justify-between items-start gap-5">
                    <span>Ryoon Ha</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/Nh6Kzw" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <span>Tomoko Nakanishi</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/fkkNED" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <span>Haruto Nakayama</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/o943sm" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/aWPDTX" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <h1 className="lg:text-xl text-base text-red-300 border-b border-red-300 lg:w-72 w-52 pt-8">Intermediate Division</h1>
                  <div className="flex justify-between items-start gap-5">
                    <span>Khoa Ho</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/v1Bznl" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <span>Hinako Iso</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/xXnDg3" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <span>An-chi Mai</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/D7uBNo" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <h1 className="lg:text-xl text-base text-red-300 border-b border-red-300 lg:w-72 w-52 pt-8">Senior Division</h1>
                  <div className="flex justify-between items-start gap-5">
                    <span>Hana Igawa</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/HQ1P1i" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/3bp8ft" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/86HcjG" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <span>Daeyoung Kim</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/NBYRKn" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/JfmvAM" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <span>Marcin Wieczorek</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/TqrTD9" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                </div>
              }
              {winnerList[1] === "Third" &&
                <div className="lg:text-lg space-y-5 text-sm">

                  <h1 className="lg:text-xl text-base text-red-300 border-b border-red-300 lg:w-72 w-52">Junior Division</h1>
                  <div className="flex justify-between items-start gap-5">
                    <span>Chanwook Kim</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/pa9CZA" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <span>Yoon Seo Shim</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/PztSNA" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/2IFI2F" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <h1 className="lg:text-xl text-base text-red-300 border-b border-red-300 lg:w-72 w-52 pt-8">Intermediate Division</h1>
                  <div className="flex justify-between items-start gap-5">
                    <span>Mateusz Dubiel</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/xYiLcF" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/YtGt1d" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <span>Yinuo Lu</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/GvhL8J" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <span>Ningxin Zhan</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/NnVaqN" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/RJHRT4" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <h1 className="lg:text-xl text-base text-red-300 border-b border-red-300 lg:w-72 w-52 pt-8">Senior Division</h1>
                  <div className="flex justify-between items-start gap-5">
                    <span>Dongkyu Leo Kim</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/j1YLyb" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/lvffSY" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/Rvtgtc" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/IWbagx" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <span>Maria Narodytska</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/mBzSbG" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/kCZdtR" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/QQQwTy" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <span>Polina Sasko</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/iXpoww" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/nsbN5s" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/XNJg99" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <span>Xinran Wang</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/jXi5HC" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              }
              {winnerList[1] === "Special" &&
                <div className="lg:text-lg space-y-5 text-sm">

                  <h1 className="lg:text-xl text-base text-red-300 border-b border-red-300 lg:w-72 w-52">Most beloved Artist</h1>
                  <div className="flex justify-between items-start gap-5">
                    <span>Maria Narodytska</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/mBzSbG" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/kCZdtR" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/QQQwTy" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <h1 className="lg:text-xl text-base text-red-300 border-b border-red-300 lg:w-72 w-52 pt-8">Most popular Artist</h1>
                  <div className="flex justify-between items-start gap-5">
                    <span>Kang Tae Kim</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/j1YLyb" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/lvffSY" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/Rvtgtc" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/IWbagx" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
  
                </div>
              }
            </div>
          }
           {winnerList[0] === "2021" &&
            <div className="text-white bg-black font-thin tracking-tight overflow-y-scroll lg:w-[55rem] lg:max-h-96 w-[90vw] px-5 lg:px-16 py-10 max-h-72">
              <h1 className="lg:text-3xl pb-14 text-xl">The 2nd online {winnerList[1]} Prize Result</h1>
              {winnerList[1] === "Grand" &&
                <div className="lg:text-lg space-y-5 text-sm">
                  <div className="flex justify-between items-start gap-5">
                    <span>Seongju Noah Kim</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/DeHnVs" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="flex justify-between items-start gap-5">
                    <span>Kang Tae Kim</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/qDcE88" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/I8KUr2" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              }
              {winnerList[1] === "First" &&
                <div className="lg:text-lg space-y-5 text-sm">

                  <h1 className="lg:text-xl text-base text-red-300 border-b border-red-300 lg:w-72 w-52">Junior Division</h1>
                  <div className="flex justify-between items-start gap-5">
                    <span>Khoi Ho</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/7VDhnn" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <h1 className="lg:text-xl text-base text-red-300 border-b border-red-300 lg:w-72 w-52 pt-8">Intermediate Division</h1>
                  <div className="flex justify-between items-start gap-5">
                    <span>Arthur Grigoryan</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/RwNc4y" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/NLyTHG" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <h1 className="lg:text-xl text-base text-red-300 border-b border-red-300 lg:w-72 w-52 pt-8">Senior Division</h1>
                  <div className="flex justify-between items-start gap-5">
                    <span>Zihao Ye</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/DZYdW1" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              }
              {winnerList[1] === "Second" &&
                <div className="lg:text-lg space-y-5 text-sm">

                  <h1 className="lg:text-xl text-base text-red-300 border-b border-red-300 lg:w-72 w-52">Junior Division</h1>
                  <div className="flex justify-between items-start gap-5">
                    <span>Ryoon Ha</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/Nh6Kzw" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <span>Tomoko Nakanishi</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/fkkNED" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <span>Haruto Nakayama</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/o943sm" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/aWPDTX" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <h1 className="lg:text-xl text-base text-red-300 border-b border-red-300 lg:w-72 w-52 pt-8">Intermediate Division</h1>
                  <div className="flex justify-between items-start gap-5">
                    <span>Khoa Ho</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/v1Bznl" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <span>Hinako Iso</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/xXnDg3" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <span>An-chi Mai</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/D7uBNo" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <h1 className="lg:text-xl text-base text-red-300 border-b border-red-300 lg:w-72 w-52 pt-8">Senior Division</h1>
                  <div className="flex justify-between items-start gap-5">
                    <span>Hana Igawa</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/HQ1P1i" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/3bp8ft" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/86HcjG" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <span>Daeyoung Kim</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/NBYRKn" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/JfmvAM" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <span>Marcin Wieczorek</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/TqrTD9" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                </div>
              }
              {winnerList[1] === "Third" &&
                <div className="lg:text-lg space-y-5 text-sm">

                  <h1 className="lg:text-xl text-base text-red-300 border-b border-red-300 lg:w-72 w-52">Junior Division</h1>
                  <div className="flex justify-between items-start gap-5">
                    <span>Chanwook Kim</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/pa9CZA" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <span>Yoon Seo Shim</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/PztSNA" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/2IFI2F" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <h1 className="lg:text-xl text-base text-red-300 border-b border-red-300 lg:w-72 w-52 pt-8">Intermediate Division</h1>
                  <div className="flex justify-between items-start gap-5">
                    <span>Mateusz Dubiel</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/xYiLcF" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/YtGt1d" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <span>Yinuo Lu</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/GvhL8J" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <span>Ningxin Zhan</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/NnVaqN" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/RJHRT4" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <h1 className="lg:text-xl text-base text-red-300 border-b border-red-300 lg:w-72 w-52 pt-8">Senior Division</h1>
                  <div className="flex justify-between items-start gap-5">
                    <span>Dongkyu Leo Kim</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/j1YLyb" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/lvffSY" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/Rvtgtc" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/IWbagx" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <span>Maria Narodytska</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/mBzSbG" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/kCZdtR" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/QQQwTy" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <span>Polina Sasko</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/iXpoww" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/nsbN5s" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/XNJg99" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-5">
                    <span>Xinran Wang</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/jXi5HC" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              }
              {winnerList[1] === "Special" &&
                <div className="lg:text-lg space-y-5 text-sm">

                  <h1 className="lg:text-xl text-base text-red-300 border-b border-red-300 lg:w-72 w-52">Most beloved Artist</h1>
                  <div className="flex justify-between items-start gap-5">
                    <span>Maria Narodytska</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/mBzSbG" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/kCZdtR" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/QQQwTy" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <h1 className="lg:text-xl text-base text-red-300 border-b border-red-300 lg:w-72 w-52 pt-8">Most popular Artist</h1>
                  <div className="flex justify-between items-start gap-5">
                    <span>Kang Tae Kim</span>
                    <div className="flex lg:gap-6 gap-3 items-center justify-center">
                      <a href="https://nationalux.com/v/j1YLyb" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/lvffSY" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/Rvtgtc" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                      <a href="https://nationalux.com/v/IWbagx" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6 hover:scale-125 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </a>
                    </div>
                  </div>
  
                </div>
              }
            </div>
          }
           {winnerList[0] === "2022" &&
            <div className="text-white bg-black font-thin tracking-tight overflow-y-scroll lg:w-[55rem] lg:max-h-96 w-[90vw] px-5 lg:px-16 py-10 max-h-72">
              <h1 className="lg:text-3xl pb-14 text-xl">The 3rd online {winnerList[1]} Prize Result</h1>
            </div>
          }
        </motion.div>
        : null}
    </>
  );
}
// <h1 className="text-xl text-red-300 border-b border-red-300 w-32">Junior Division</h1>
