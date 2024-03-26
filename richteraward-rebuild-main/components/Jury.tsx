import { motion } from "framer-motion";
import { useState } from "react";
import { jury } from "./Descriptions";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Jury() {
  const { locale } = useRouter();
  const [juryCard, set_juryCard] = useState<string | null>(null);
  const getOverlay = (id: string) => {
    set_juryCard(id);
  };
  const overlayClose = () => {
    set_juryCard(null);
  };
  return (
    <>
      <div className="lg:px-16 px-5 bg-[whitesmoke] lg:pt-32 py-14" id="jury">
        <div className="flex flex-col justify-center items-center space-y-10">
          <span className="lg:text-4xl text-lg font-thin tracking-widest border-b border-red-800 p-3">
            {locale === "en" ? "Jury Members" : "심사위원"}
          </span>
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-6">
            {jury.slice(0, 4).map((data, number) => (
              <motion.div
                key={number}
                layoutId={data.id}
                whileHover={{ scale: 1.05, zIndex: 2 }}
                className="lg:w-64 lg:h-96 w-32 h-52 mx-auto bg-cover bg-no-repeat relative cursor-pointer shadow-xl"
                style={{ backgroundImage: `url(${data.photo})` }}
                onClick={() => getOverlay(data.id)}
              >
                <div className="w-full h-full bg-[rgba(0,0,0,0.6)] absolute flex justify-start items-end hover:bg-[rgba(0,0,0,0.2)] transition">
                  <h4 className="text-left lg:text-base text-[0.5rem] lg:p-10 p-3 text-white font-thin tracking-tighter">
                    {data.name}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
          
            <Link href={`/pastJury`} 
              className="text-center bg-white lg:w-64 px-8 py-4 shadow-lg hover:scale-[0.95] hover:bg-[#f0f0f0] transition font-light lg:text-sm text-xs tracking-wider">
            <p>{locale === "en" ? "Past Jury Members" : "역대 심사위원"}</p>
            </Link>
            
          
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
              {juryCard === jury[0].id && (
                <>
                  <motion.div
                    layoutId={juryCard}
                    style={{ backgroundImage: `url(${jury[0].photo})` }}
                    className="lg:w-72 lg:h-[28rem] w-32 h-52 bg-cover bg-no-repeat"
                  />
                  <div className="text-white p-3 font-thin tracking-tight lg:w-[40rem] w-64 lg:h-[28rem] h-52 lg:text-sm text-[0.5rem] overflow-y-scroll">
                    <p className="mb-5 lg:text-lg text-xs">
                      {jury[0].name} ( {jury[0].country} )
                    </p>
                    <p className="lg:text-base text-xs lg:p-5 p-2 whitespace-pre-wrap">
                      {jury[0].description}
                    </p>
                  </div>
                </>
              )}
              {juryCard === jury[1].id && (
                <>
                  <motion.div
                    layoutId={juryCard}
                    style={{ backgroundImage: `url(${jury[1].photo})` }}
                    className="lg:w-72 lg:h-[28rem] w-32 h-52 bg-cover bg-no-repeat"
                  />
                  <div className="text-white p-3 font-thin tracking-tight lg:w-[40rem] w-64 lg:h-[28rem] h-52 lg:text-sm text-[0.5rem] overflow-y-scroll">
                    <p className="mb-5 lg:text-lg text-xs">
                      {jury[1].name} ( {jury[1].country} )
                    </p>
                    <p className="lg:text-base text-xs lg:p-5 p-2">
                      {jury[1].description}
                    </p>
                  </div>
                </>
              )}
              {juryCard === jury[2].id && (
                <>
                  <motion.div
                    layoutId={juryCard}
                    style={{ backgroundImage: `url(${jury[2].photo})` }}
                    className="lg:w-72 lg:h-[28rem] w-32 h-52 bg-cover bg-no-repeat"
                  />
                  <div className="text-white p-3 font-thin tracking-tight lg:w-[40rem] w-64 lg:h-[28rem] h-52 lg:text-sm text-[0.5rem] overflow-y-scroll">
                    <p className="mb-5 lg:text-lg text-xs">
                      {jury[2].name} ( {jury[2].country} )
                    </p>
                    <p className="lg:text-base text-xs lg:p-5 p-2">
                      {jury[2].description}
                    </p>
                  </div>
                </>
              )}
              {juryCard === jury[3].id && (
                <>
                  <motion.div
                    layoutId={juryCard}
                    style={{ backgroundImage: `url(${jury[3].photo})` }}
                    className="lg:w-72 lg:h-[28rem] w-32 h-52 bg-cover bg-no-repeat"
                  />
                  <div className="text-white p-3 font-thin tracking-tight lg:w-[40rem] w-64 lg:h-[28rem] h-52 lg:text-sm text-[0.5rem] overflow-y-scroll">
                    <p className="mb-5 lg:text-lg text-xs">
                      {jury[3].name} ( {jury[3].country} )
                    </p>
                    <p className="lg:text-base text-xs lg:p-5 p-2">
                      {jury[3].description}
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
