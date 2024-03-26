import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from "framer-motion";

interface INoticeForms {
    noticePost: {
        id: string;
        noticeTitle: string;
        formatnoticeText: string;
        createdAt: string;
        updatedAt: string;
    }[]
}


export default function Notice({ noticePost }: INoticeForms) {
    const [clickNotice, set_clickNotice] = useState<number>(-1);
    const { locale } = useRouter();
    return (
        <>
            <div className="lg:px-48 px-5 bg-[whitesmoke] lg:pt-32 py-14" id="notice">
                <div className="flex flex-col justify-center items-center space-y-10">
                    <span className="lg:text-4xl text-lg font-thin tracking-widest border-b border-red-800 p-3">
                        {locale === "en" ? "Notice" : "공지사항"}
                    </span>

                    <div className="bg-white shadow-2xl flex flex-col w-full">
                        {noticePost ?
                            noticePost?.slice(0, 7).map((data, number) => (
                                <>
                                    <div
                                        className="hover:bg-slate-100 hover:text-slate-600 transition flex justify-between lg:px-12 px-5 py-5 cursor-pointer"
                                        key={data.id}
                                        onClick={() => set_clickNotice(number)}
                                    >
                                        <span className="tracking-tight lg:text-sm text-xs">{data.noticeTitle}</span>
                                        <span className="tracking-tight lg:text-sm text-xs">{data.updatedAt.substring(0, 10)}</span>
                                    </div>
                                </>
                            ))
                            :
                            <div className="lg:px-12 px-5 py-5 text-center text-gray-500 text-sm" >
                                {locale === "en" ? "No registered notices." : "등록된 공지가 없습니다."}
                            </div>
                        }
                    </div>
                </div>
            </div>
            {clickNotice >= 0 ?
                <motion.div
                    className="fixed w-full h-full bg-[rgba(0,0,0,0.6)] top-0 z-30 transtion flex justify-center items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => set_clickNotice(-1)}
                >
                    {clickNotice === 0 &&
                        <div className="bg-black text-white lg:w-[60vw] w-[95vw] pt-10 border border-gray-500">
                            <h1 className="pb-5 mx-5 lg:text-2xl text-xl font-thin tracking-wider border-b border-gray-500">
                                '{noticePost[0].noticeTitle}'
                                <p className="text-xs mt-3 text-gray-300 tracking-normal">{locale === "en" ? "Recent updated" : "최근 수정일"}: {noticePost[0].updatedAt.substring(0, 10)}</p>
                            </h1>
                            <p className="lg:h-[28rem] h-[18rem] p-5 font-thin text-sm overflow-y-scroll pb-5 whitespace-pre-wrap">
                                {noticePost[0].formatnoticeText}
                            </p>
                        </div>
                    }
                    {clickNotice === 1 &&
                        <div className="bg-black text-white lg:w-[60vw] w-[95vw] pt-10 border border-gray-500">
                            <h1 className="pb-5 mx-5 lg:text-2xl text-xl font-thin tracking-wider border-b border-gray-500">
                                '{noticePost[1].noticeTitle}'
                                <p className="text-xs mt-3 text-gray-300 tracking-normal">{locale === "en" ? "Recent updated" : "최근 수정일"}: {noticePost[1].updatedAt.substring(0, 10)}</p>
                            </h1>
                            <p className="lg:h-[28rem] h-[18rem] p-5 font-thin text-sm overflow-y-scroll pb-5 whitespace-pre-wrap">
                                {noticePost[1].formatnoticeText}
                            </p>
                        </div>
                    }
                    {clickNotice === 2 &&
                        <div className="bg-black text-white lg:w-[60vw] w-[95vw] pt-10 border border-gray-500">
                            <h1 className="pb-5 mx-5 lg:text-2xl text-xl font-thin tracking-wider border-b border-gray-500">
                                '{noticePost[2].noticeTitle}'
                                <p className="text-xs mt-3 text-gray-300 tracking-normal">{locale === "en" ? "Recent updated" : "최근 수정일"}: {noticePost[2].updatedAt.substring(0, 10)}</p>
                            </h1>
                            <p className="lg:h-[28rem] h-[18rem] p-5 font-thin text-sm overflow-y-scroll pb-5 whitespace-pre-wrap">
                                {noticePost[2].formatnoticeText}
                            </p>
                        </div>
                    }
                    {clickNotice === 3 &&
                        <div className="bg-black text-white lg:w-[60vw] w-[95vw] pt-10 border border-gray-500">
                            <h1 className="pb-5 mx-5 lg:text-2xl text-xl font-thin tracking-wider border-b border-gray-500">
                                '{noticePost[3].noticeTitle}'
                                <p className="text-xs mt-3 text-gray-300 tracking-normal">{locale === "en" ? "Recent updated" : "최근 수정일"}: {noticePost[3].updatedAt.substring(0, 10)}</p>
                            </h1>
                            <p className="lg:h-[28rem] h-[18rem] p-5 font-thin text-sm overflow-y-scroll pb-5 whitespace-pre-wrap">
                                {noticePost[3].formatnoticeText}
                            </p>
                        </div>
                    }
                    {clickNotice === 4 &&
                        <div className="bg-black text-white lg:w-[60vw] w-[95vw] pt-10 border border-gray-500">
                            <h1 className="pb-5 mx-5 lg:text-2xl text-xl font-thin tracking-wider border-b border-gray-500">
                                '{noticePost[4].noticeTitle}'
                                <p className="text-xs mt-3 text-gray-300 tracking-normal">{locale === "en" ? "Recent updated" : "최근 수정일"}: {noticePost[4].updatedAt.substring(0, 10)}</p>
                            </h1>
                            <p className="lg:h-[28rem] h-[18rem] p-5 font-thin text-sm overflow-y-scroll pb-5 whitespace-pre-wrap">
                                {noticePost[4].formatnoticeText}
                            </p>
                        </div>
                    }
                    {clickNotice === 5 &&
                        <div className="bg-black text-white lg:w-[60vw] w-[95vw] pt-10 border border-gray-500">
                            <h1 className="pb-5 mx-5 lg:text-2xl text-xl font-thin tracking-wider border-b border-gray-500">
                                '{noticePost[5].noticeTitle}'
                                <p className="text-xs mt-3 text-gray-300 tracking-normal">{locale === "en" ? "Recent updated" : "최근 수정일"}: {noticePost[5].updatedAt.substring(0, 10)}</p>
                            </h1>
                            <p className="lg:h-[28rem] h-[18rem] p-5 font-thin text-sm overflow-y-scroll pb-5 whitespace-pre-wrap">
                                {noticePost[5].formatnoticeText}
                            </p>
                        </div>
                    }
                    {clickNotice === 6 &&
                        <div className="bg-black text-white lg:w-[60vw] w-[95vw] pt-10 border border-gray-500">
                            <h1 className="pb-5 mx-5 lg:text-2xl text-xl font-thin tracking-wider border-b border-gray-500">
                                '{noticePost[6].noticeTitle}'
                                <p className="text-xs mt-3 text-gray-300 tracking-normal">{locale === "en" ? "Recent updated" : "최근 수정일"}: {noticePost[6].updatedAt.substring(0, 10)}</p>
                            </h1>
                            <p className="lg:h-[28rem] h-[18rem] p-5 font-thin text-sm overflow-y-scroll pb-5 whitespace-pre-wrap">
                                {noticePost[6].formatnoticeText}
                            </p>
                        </div>
                    }

                </motion.div>
                : null}
        </>
    );
}