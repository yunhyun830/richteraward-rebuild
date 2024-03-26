import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { jury } from "@/components/Descriptions";
import { useRouter } from "next/router";
import Head from "next/head";

export default function PastJury() {
  const { locale } = useRouter();
  const [juryCard, set_juryCard] = useState<string | null>(null);
  const [juryTurn, set_juryTurn] = useState<number>();

  useEffect(() => {}, [juryCard, juryTurn]);
  const getOverlay = (id: string, number: number) => {
    set_juryCard(id + number);
    set_juryTurn(number);
  };
  const overlayClose = () => {
    set_juryCard(null);
  };
  return (
    <>
    <Head>
    <title>Richter Award | Jury</title>
    </Head>
      <div className="lg:px-16 px-5 bg-[whitesmoke] lg:pt-32 py-14" id="jury">
        <div className="flex flex-col justify-center items-center space-y-10">
          <span className="lg:text-4xl text-lg font-thin tracking-widest border-b border-red-800 p-3">
            {locale === "en" ? "Past Jury Members" : "역대 심사위원"}
          </span>
          <h2 className="border-b border-red-800 p-2 lg:text-lg text-xs font-bold tracking-tighter">2020</h2>
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-6">
            {[jury[4], jury[5], jury[8], jury[9]] .map((data, number) => (
              <motion.div
                key={number}
                layoutId={data.id + 1}
                whileHover={{ scale: 1.05, zIndex: 2 }}
                className="lg:w-64 lg:h-96 w-32 h-52 mx-auto bg-cover bg-no-repeat relative cursor-pointer shadow-xl"
                style={{ backgroundImage: `url(${data.photo})` }}
                onClick={() => getOverlay(data.id, 1)}
              >
                <div className="w-full h-full bg-[rgba(0,0,0,0.6)] absolute flex justify-start items-end hover:bg-[rgba(0,0,0,0.2)] transition">
                  <h4 className="text-left lg:text-base text-[0.5rem] lg:p-10 p-3 text-white font-thin tracking-tighter">
                    {data.name}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
          <h2 className="border-b border-red-800 p-2 lg:text-lg text-xs font-bold tracking-tighter pt-24">2021</h2>
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-6">
            {[jury[5], jury[10], jury[6], jury[7]].map((data, number) => (
              <motion.div
                key={number}
                layoutId={data.id + 2}
                whileHover={{ scale: 1.05, zIndex: 2 }}
                className="lg:w-64 lg:h-96 w-32 h-52 mx-auto bg-cover bg-no-repeat relative cursor-pointer shadow-xl"
                style={{ backgroundImage: `url(${data.photo})` }}
                onClick={() => getOverlay(data.id, 2)}
              >
                <div className="w-full h-full bg-[rgba(0,0,0,0.6)] absolute flex justify-start items-end hover:bg-[rgba(0,0,0,0.2)] transition">
                  <h4 className="text-left lg:text-base text-[0.5rem] lg:p-10 p-3 text-white font-thin tracking-tighter">
                    {data.name}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
          <h2 className="border-b border-red-800 p-2 lg:text-lg text-xs font-bold tracking-tighter pt-24">2022</h2>
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-6">
            {jury.slice(4, 8).map((data, number) => (
              <motion.div
                key={number}
                layoutId={data.id + 3}
                whileHover={{ scale: 1.05, zIndex: 2 }}
                className="lg:w-64 lg:h-96 w-32 h-52 mx-auto bg-cover bg-no-repeat relative cursor-pointer shadow-xl"
                style={{ backgroundImage: `url(${data.photo})` }}
                onClick={() => getOverlay(data.id, 3)}
              >
                <div className="w-full h-full bg-[rgba(0,0,0,0.6)] absolute flex justify-start items-end hover:bg-[rgba(0,0,0,0.2)] transition">
                  <h4 className="text-left lg:text-base text-[0.5rem] lg:p-10 p-3 text-white font-thin tracking-tighter">
                    {data.name}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        
        </div>
      </div>
      {juryCard ? (
        <>
          <motion.div
            className="fixed w-full h-full bg-[rgba(0,0,0,0.6)] top-0 z-30 flex justify-center items-center transtion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => overlayClose()}
          >
            <div className="fixed flex bg-[#080808]">
              {juryCard === jury[4].id + juryTurn && (
                <>
                  <motion.div
                    layoutId={juryCard}
                    style={{ backgroundImage: `url(${jury[4].photo})` }}
                    className="lg:w-72 lg:h-[28rem] w-32 h-52 bg-cover bg-no-repeat"
                  />
                  <div className="text-white p-3 font-thin tracking-tight lg:w-[40rem] w-64 lg:h-[28rem] h-52 lg:text-sm text-[0.5rem] overflow-y-scroll">
                    <p className="mb-5 lg:text-lg text-xs">
                      {jury[4].name} ( {jury[4].country} )
                    </p>
                    <p className="lg:text-base text-xs lg:p-5 p-2 whitespace-pre-wrap">
                      {jury[4].description}
                    </p>
                  </div>
                </>
              )}
              {juryCard === jury[5].id + juryTurn && (
                <>
                  <motion.div
                    layoutId={juryCard}
                    style={{ backgroundImage: `url(${jury[5].photo})` }}
                    className="lg:w-72 lg:h-[28rem] w-32 h-52 bg-cover bg-no-repeat"
                  />
                  <div className="text-white p-3 font-thin tracking-tight lg:w-[40rem] w-64 lg:h-[28rem] h-52 lg:text-sm text-[0.5rem] overflow-y-scroll">
                    <p className="mb-5 lg:text-lg text-xs">
                      {jury[5].name} ( {jury[5].country} )
                    </p>
                    <p className="lg:text-base text-xs lg:p-5 p-2 whitespace-pre-wrap">
                      {jury[5].description}
                    </p>
                  </div>
                </>
              )}
              {juryCard === jury[6].id + juryTurn && (
                <>
                  <motion.div
                    layoutId={juryCard}
                    style={{ backgroundImage: `url(${jury[6].photo})` }}
                    className="lg:w-72 lg:h-[28rem] w-32 h-52 bg-cover bg-no-repeat"
                  />
                  <div className="text-white p-3 font-thin tracking-tight lg:w-[40rem] w-64 lg:h-[28rem] h-52 lg:text-sm text-[0.5rem] overflow-y-scroll">
                    <p className="mb-5 lg:text-lg text-xs">
                      {jury[6].name} ( {jury[6].country} )
                    </p>
                    <p className="lg:text-base text-xs lg:p-5 p-2 whitespace-pre-wrap">
                      {jury[6].description}
                    </p>
                  </div>
                </>
              )}
              {juryCard === jury[7].id + juryTurn && (
                <>
                  <motion.div
                    layoutId={juryCard}
                    style={{ backgroundImage: `url(${jury[7].photo})` }}
                    className="lg:w-72 lg:h-[28rem] w-32 h-52 bg-cover bg-no-repeat"
                  />
                  <div className="text-white p-3 font-thin tracking-tight lg:w-[40rem] w-64 lg:h-[28rem] h-52 lg:text-sm text-[0.5rem] overflow-y-scroll">
                    <p className="mb-5 lg:text-lg text-xs">
                      {jury[7].name} ( {jury[7].country} )
                    </p>
                    <p className="lg:text-base text-xs lg:p-5 p-2 whitespace-pre-wrap">
                      {jury[7].description}
                    </p>
                  </div>
                </>
              )}
               {juryCard === jury[8].id + juryTurn && (
                <>
                  <motion.div
                    layoutId={juryCard}
                    style={{ backgroundImage: `url(${jury[8].photo})` }}
                    className="lg:w-72 lg:h-[28rem] w-32 h-52 bg-cover bg-no-repeat"
                  />
                  <div className="text-white p-3 font-thin tracking-tight lg:w-[40rem] w-64 lg:h-[28rem] h-52 lg:text-sm text-[0.5rem] overflow-y-scroll">
                    <p className="mb-5 lg:text-lg text-xs">
                      {jury[8].name} ( {jury[8].country} )
                    </p>
                    <p className="lg:text-base text-xs lg:p-5 p-2 whitespace-pre-wrap">
                      {jury[8].description}
                    </p>
                  </div>
                </>
              )}
               {juryCard === jury[9].id + juryTurn && (
                <>
                  <motion.div
                    layoutId={juryCard}
                    style={{ backgroundImage: `url(${jury[9].photo})` }}
                    className="lg:w-72 lg:h-[28rem] w-32 h-52 bg-cover bg-no-repeat"
                  />
                  <div className="text-white p-3 font-thin tracking-tight lg:w-[40rem] w-64 lg:h-[28rem] h-52 lg:text-sm text-[0.5rem] overflow-y-scroll">
                    <p className="mb-5 lg:text-lg text-xs">
                      {jury[9].name} ( {jury[9].country} )
                    </p>
                    <p className="lg:text-base text-xs lg:p-5 p-2 whitespace-pre-wrap">
                      {jury[9].description}
                    </p>
                  </div>
                </>
              )}
               {juryCard === jury[10].id + juryTurn && (
                <>
                  <motion.div
                    layoutId={juryCard}
                    style={{ backgroundImage: `url(${jury[10].photo})` }}
                    className="lg:w-72 lg:h-[28rem] w-32 h-52 bg-cover bg-no-repeat"
                  />
                  <div className="text-white p-3 font-thin tracking-tight lg:w-[40rem] w-64 lg:h-[28rem] h-52 lg:text-sm text-[0.5rem] overflow-y-scroll">
                    <p className="mb-5 lg:text-lg text-xs">
                      {jury[10].name} ( {jury[10].country} )
                    </p>
                    <p className="lg:text-base text-xs lg:p-5 p-2 whitespace-pre-wrap">
                      {jury[10].description}
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      ) : null}
    </>
  );
}
