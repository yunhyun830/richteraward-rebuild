import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { cls } from "@/components/utils";
import { motion } from "framer-motion";
import AddNotice from "./AddNotice";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 150px 150px 150px 150px 300px 150px 300px 300px 150px 150px 150px 150px 150px 300px 150px;
  width: 95vw;
  overflow-x: scroll;
  background-color: white;
  text-align: center;
  :nth-child(-n + 16) {
    border-bottom: 1px solid lightgray;
    padding-bottom: 1.25rem;
    font-weight: bold;
  }
`;

interface IAdminPosts {
  appformPost: {
    id: number;
    site: string;
    firstName: string;
    lastName: string;
    birthday: string;
    section: string;
    ageCategory: string;
    email: string;
    videoLink: string;
    phone: string;
    teamMember: string;
    school: string;
    depostisor: string;
    teacher: string;
    teacherEmail: string;
    performingPiece: string;
    ageProof: string;
  }[];
  noticePost: {
    id: number;
    noticeTitle: string;
    noticeText: string;
    createdAt: string;
    updatedAt: string;
  }[];
  onNotice: {
    id: number;
    noticeTitle: string;
    formatnoticeText: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

interface FormValues {
  id: number;
  updateText: string;
}

export default function AdminMain({
  appformPost,
  noticePost,
  onNotice,
}: IAdminPosts) {
  const [formState, set_formState] = useState<"참가자" | "공지">("참가자");
  const [addNotice, set_addNotice] = useState<boolean>(false);
  const [selectedNotice, set_selectedNotice] = useState<null | number>(null);
  const [updateText, set_updateText] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "all",
  });
  const [loading, set_loading] = useState<boolean>(false);
  const history = useRouter();

  const onNoticeClicked = (noticeId: number) => {
    history.push(`/admin/?id=${noticeId}`);
    set_selectedNotice(noticeId);
  };
  const selectedNoticeClose = () => {
    set_selectedNotice(null);
    set_updateText(false);
    reset();
    history.push(`/admin`);
  };
  useEffect(() => {}, [onNotice]);

  const getUpdateText = () => {
    let yes = confirm("본문을 수정하시겠습니까?");
    if (yes) {
      set_updateText(true);
    } else {
      return false;
    }
  };

  const onValid = async (data: any) => {
    set_loading(true);
    const body = { id: Number(data.id), noticeText: data.updateText };
    try {
      //데이터베이스 백엔드
      const DBResponse = await fetch("/api/noticeUpdate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (DBResponse.status !== 200) {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log("there was an error submitting", error);
    }
    alert("공지가 수정되었습니다.");
    selectedNoticeClose();
    set_loading(false);
    history.replace("/admin");
  };

  const noticeDelete = async (id: number) => {
    set_loading(true);
    const body = { id: id };
      try { //데이터베이스 백엔드
      const DBResponse = await fetch("/api/noticeDelete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (DBResponse.status !== 200) {
        console.log("something went wrong");
      }

    } catch (error) {
      console.log("there was an error submitting", error);
    }
    alert("공지가 삭제되었습니다.");
    selectedNoticeClose();
    set_loading(false);
    history.replace('/admin');
  };
  return (
    <>
      <div className="bg-[whitesmoke] flex flex-col justify-center items-center py-[10rem]">
        <div className="flex justify-between items-center w-full px-10 mb-10 text-sm">
          <div className="flex justify-start items-center gap-10">
            <span className="cursor-pointer  w-24">
              <h2
                onClick={() => set_formState("참가자")}
                className={cls(
                  "text-center mb-1 transition",
                  formState === "참가자"
                    ? "font-bold text-red-800 scale-[1.02]"
                    : "font-normal mb-1"
                )}
              >
                참가자
              </h2>
              {formState === "참가자" && (
                <motion.hr
                  layoutId="MenuChange"
                  className="border border-red-800"
                />
              )}
            </span>
            <span className="cursor-pointer w-24">
              <h2
                onClick={() => set_formState("공지")}
                className={cls(
                  "text-center mb-1 transition",
                  formState === "공지"
                    ? "font-bold text-red-800 scale-[1.02]"
                    : "font-normal mb-1"
                )}
              >
                공지
              </h2>
              {formState === "공지" && (
                <motion.hr
                  layoutId="MenuChange"
                  className="border border-red-800"
                />
              )}
            </span>
          </div>
          <button
            onClick={() => {
              set_addNotice(true);
            }}
            className="px-3 py-1 bg-red-800 text-white hover:bg-black transition"
          >
            공지작성
          </button>
        </div>
        {formState === "참가자" ? (
          <>
            <GridContainer className="shadow-xl text-xs py-5">
              <span>순번</span>
              <span>신청사이트</span>
              <span>이름</span>
              <span>성</span>
              <span>생년월일</span>
              <span>경연부문</span>
              <span>나이부문</span>
              <span>이메일</span>
              <span>비디오링크</span>
              <span>전화번호</span>
              <span>팀 인적사항</span>
              <span>학교</span>
              <span>입금자명</span>
              <span>지도자</span>
              <span>지도자 이메일</span>
              <span>증명사진</span>
              {appformPost?.map((data) => (
                <>
                  <div className="text-center py-5" key={data.id}>
                    {data.id}
                  </div>
                  <div className="text-center py-5">{data.site}</div>
                  <div className="text-center py-5">{data.firstName}</div>
                  <div className="text-center py-5">{data.lastName}</div>
                  <div className="text-center py-5">{data.birthday}</div>
                  <div className="text-center py-5">{data.section}</div>
                  <div className="text-center py-5">{data.ageCategory}</div>
                  <div className="text-center py-5">{data.email}</div>
                  <Link
                    href={data.videoLink}
                    target="_blank"
                    className="text-center py-5 hover:text-red-800"
                  >
                    {data.videoLink}
                  </Link>
                  <div className="text-center py-5">{data.phone}</div>
                  <div className="text-center py-5">{data.teamMember}</div>
                  <div className="text-center py-5">{data.school}</div>
                  <div className="text-center py-5">{data.depostisor}</div>
                  <div className="text-center py-5">{data.teacher}</div>
                  <div className="text-center py-5">{data.teacherEmail}</div>
                  <Link
                    className="text-center py-5 text-red-500 hover:text-red-700 hover:scale-105 font-bold transition"
                    target="_blank"
                    href={data.ageProof}
                  >
                    이미지보기
                  </Link>
                </>
              ))}
            </GridContainer>
          </>
        ) : (
          <>
            <div className="bg-white shadow-2xl flex flex-col w-[95vw]">
              {noticePost?.map((data) => (
                <>
                  <div
                    key={data.id}
                    className="hover:bg-slate-100 hover:text-slate-600 transition flex justify-between px-12 py-5 cursor-pointer"
                    onClick={() => onNoticeClicked(data.id)}
                  >
                    <span className="tracking-tight text-xs">
                      {data.noticeTitle}
                    </span>
                    <span className="tracking-tight text-xs">
                      {data.createdAt.substring(0, 10)}
                    </span>
                  </div>
                </>
              ))}
            </div>
          </>
        )}
      </div>
      {addNotice ? (
        <>
          <motion.div
            className="fixed w-full h-full bg-[rgba(0,0,0,0.6)] top-0 z-30 transtion flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => history.push("/admin")}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="z-40 w-[70vw] flex flex-col mt-10"
            >
              <h1
                onClick={() => set_addNotice(false)}
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
              <h2 className="bg-red-800 p-3 text-center text-sm tracking-widest text-white font-thin">
                공지 작성
              </h2>
              <AddNotice />
            </motion.div>
          </motion.div>
        </>
      ) : null}
      {selectedNotice === null ? null : (
        <motion.div
          className="fixed w-full h-full bg-[rgba(0,0,0,0.6)] top-0 z-30 transtion flex flex-col justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1
            onClick={selectedNoticeClose}
            className="w-[60vw] flex justify-end lg:mb-3 mb-1 cursor-pointer"
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
          <form onSubmit={handleSubmit(onValid)}>
            <div className="bg-black text-white w-[60vw] pt-10 border border-gray-500">
              <h1 className="pb-5 mx-5 text-2xl font-thin tracking-wider border-b border-gray-500">
                {onNotice[0].noticeTitle}
                <p className="text-xs mt-3 text-gray-300 tracking-normal">
                  {onNotice[0].updatedAt.substring(0, 10)}
                </p>
              </h1>
              <div className="h-[28rem]">
                {updateText ? (
                  <>
                    <input
                      type="hidden"
                      value={onNotice[0].id}
                      {...register("id")}
                    />
                    <textarea
                      placeholder="본문"
                      className="p-5 font-thin text-sm overflow-y-scroll text-black resize-none w-full h-full"
                      {...register("updateText", {
                        required: true,
                      })}
                    />
                  </>
                ) : (
                  <>
                    <p
                      onClick={getUpdateText}
                      className="p-5 font-thin text-sm overflow-y-scroll whitespace-pre-wrap hover:bg-gray-900 transition cursor-pointer w-full h-full"
                    >
                      {onNotice[0].formatnoticeText}
                    </p>
                  </>
                )}
              </div>
              <div className="flex items-center justify-between p-3 border-t border-gray-500 text-sm font-light">
                <input
                  type="submit"
                  className={cls(
                    "px-6 py-2 transition",
                    updateText || !loading
                      ? "bg-blue-400 hover:bg-blue-800"
                      : "bg-blue-800 text-gray-500"
                  )}
                  disabled={!updateText || loading}
                  value="수정"
                />

                <input
                type="button"
                  className={cls(
                    "px-6 py-2 transition",
                    !loading
                      ? "bg-red-400 hover:bg-red-800"
                      : "bg-red-800 text-gray-500"
                  )}
                  onClick={() => noticeDelete(onNotice[0].id)}
                  disabled={loading}
                  value="삭제"
                />
              </div>
            </div>
          </form>
        </motion.div>
      )}
    </>
  );
}
