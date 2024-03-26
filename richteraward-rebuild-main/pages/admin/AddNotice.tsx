import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { cls } from "@/components/utils";

interface FormValues{
  noticeTitle: string;
  noticeText: string;
}


export default function AddNotice() {
  const re_render = useRouter();
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

  const onValid = async (data: any) => {
    set_loading(true);
    const body = { noticeTitle: data.noticeTitle, noticeText: data.noticeText }
    try { //데이터베이스 백엔드
    const DBResponse = await fetch("/api/notice", {
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
  alert("공지가 등록되었습니다.");
  set_loading(false); 
  reset();
  re_render.replace("/admin");
  }
  return (
    <>
    <div className=" bg-[whitesmoke] p-5">
      <form onSubmit={handleSubmit(onValid)} className="space-y-5 flex flex-col justify-center items-center">
          <input
            type="text"
            className="py-3 px-5 rounded-lg shadow-md bg-white transition text-sm w-full focus:bg-slate-100 tracking-tight"
            placeholder="제목"
            autoComplete="off"
            disabled={loading}
            {...register("noticeTitle", {
              required: "제목을 적어주세요.",
            })}
          />
           {errors.noticeTitle ? (
            <p className="text-xs mt-3 text-red-500 w-full">
              {errors.noticeTitle.message}
            </p>
          ) : null}
          <textarea
            className="py-3 px-5 rounded-lg shadow-md bg-white transition text-sm w-full focus:bg-slate-100 tracking-tight resize-none h-[50vh]"
            autoComplete="off"
            placeholder="본문"
            disabled={loading}
            {...register("noticeText", {
              required: "본문을 적어주세요.",
            })}
          />
           {errors.noticeText ? (
            <p className="text-xs mt-3 text-red-500 w-full">
              {errors.noticeText.message}
            </p>
          ) : null}
        <input type="submit" className={cls("text-white text-lg font-thin hover:bg-black transition px-10 py-2", loading ? "bg-black" : "bg-red-800")} value={loading ? "로딩중..." : "작성하기"} disabled={loading}/>
      </form>
    </div>
    </>
  )
}