import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { cls } from "./utils";

interface FormValues {
  firstName: string;
  lastName: string;
  birthday: string;
  school: string;
  ageProof: string;
  ageProofText: string;
  teamMember: string;
  section: string;
  ageCategory: string;
  email: string;
  phone: string;
  videoLink: string;
  depostisor: string;
  teacher: string;
  teacherEmail: string;
  performingPiece: string;
  performingDuration: string;
}

export default function AppForm() {
  const { locale } = useRouter();
  const [submitLoading, set_submitLoading] = useState<boolean>(false);
  const [submitPopup, set_submitPopup] = useState<boolean>(false);
  const [selectImg, set_selectImg] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "all",
  });

  const onVaild = async (data: any) => {
    set_submitLoading(true);
    const formData = new FormData();
    for( const file of data.ageProof){
      formData.append('file', file);
    }
    formData.append('upload_preset', 'richter');
    const datas = await fetch('https://api.cloudinary.com/v1_1/dv7hpu5oq/image/upload', {
      method: 'POST',
      body: formData
    }).then(r => r.json());

    const body = {
      firstName: data.firstName,
      lastName: data.lastName,
      birthday: data.birthday,
      school: data.school,
      ageProof: datas.secure_url,
      teamMember: data.teamMember,
      section: data.section,
      ageCategory: data.ageCategory,
      email: data.email,
      phone: data.phone,
      videoLink: data.videoLink,
      depostisor: data.depostisor,
      teacher: data.teacher,
      teacherEmail: data.teacherEmail,
      performingPiece: data.performingPiece,
      performingDuration: data.performingDuration,
    };
    try {
      const response = await fetch("/api/appForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (response.status !== 200) {
        console.log("something went wrong");
        //set an error banner here
      }
      //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log("there was an error submitting", error);
    }
    set_submitLoading(false);
    set_submitPopup(true);
    reset();
    set_selectImg("");
  };
  const popupClose = () => set_submitPopup(false);
  return (
    <>
      <h2 className="bg-red-800 text-white p-3 text-center tracking-widest lg:text-2xl text-base font-thin">
        {locale === "en" ? "APPLICATION" : "참가 신청서"}
      </h2>
      <form onSubmit={handleSubmit(onVaild)}>
        <div className="bg-[whitesmoke] lg:h-[38rem] h-[36rem] flex flex-col justify-start lg:p-10 p-3 overflow-y-scroll tracking-tighter">
          <h2 className="font-bold text-sm">
            {locale === "en" ? "* Required Field" : "* 필수 입력 항목"}
          </h2>
          <input
            placeholder={locale === "en" ? "* First Name" : "* 이름"}
            type="text"
            className="py-3 px-5 rounded-lg shadow-md focus:bg-[#f0f0f0] transition lg:text-sm text-xs mt-10 mb-2 tracking-tighter"
            autoComplete="off"
            {...register("firstName", {
              required: locale === "en" ? "Please write down your name." : "이름을 적어주세요.",
              validate: {
                textCheck: (value) =>
                  !value.includes(">" || "<" || "?" || "/" || "@" || "=") ||
                  "Cannot special text.",
              },
            })}
          />
          {errors.firstName ? (
            <p className="text-xs mt-3 text-red-500">
              {errors.firstName.message}
            </p>
          ) : null}
          <input
            placeholder={locale === "en" ? "* Last Name" : "* 성"}
            type="text"
            className="py-3 px-5 rounded-lg shadow-md focus:bg-[#f0f0f0] transition lg:text-sm text-xs mt-10 mb-2 tracking-tighter"
            autoComplete="off"
            {...register("lastName", {
              required: locale === "en" ? "Please write down your surname." : "성을 적어주세요.",
              validate: {
                textCheck: (value) =>
                  !value.includes(">" || "<" || "?" || "/" || "@" || "=") ||
                  "Cannot special text.",
              },
            })}
          />
          {errors.lastName ? (
            <p className="text-xs mt-3 text-red-500">
              {errors.lastName.message}
            </p>
          ) : null}
          <input
            type="text"
            placeholder={locale === "en" ? "* Birthday" : "* 생년월일"}
            className="py-3 px-5 rounded-lg shadow-md focus:bg-[#f0f0f0] transition lg:text-sm text-xs mt-10 mb-2 tracking-tighter"
            autoComplete="off"
            {...register("birthday", {
              required: locale === "en" ? "Please write down your birthday." : "생년월일을 적어주세요.",
            })}
          />
          {errors.birthday ? (
            <p className="text-xs mt-3 text-red-500">
              {errors.birthday.message}
            </p>
          ) : null}
          <input
            type="text"
            placeholder={locale === "en" ? "Current School" : "소속 학교"}
            className="py-3 px-5 rounded-lg shadow-md focus:bg-[#f0f0f0] transition lg:text-sm text-xs mt-10 mb-2 tracking-tighter"
            autoComplete="off"
            {...register("school")}
          />
          <div className="flex justify-start items-center lg:gap-5 gap-2">
            <input
              type="text"
              autoComplete="off"
              readOnly
              className={cls(
                "py-3 px-5 rounded-lg shadow-md bg-[#f0f0f0] transition lg:text-sm text-xs tracking-tighter w-3/4 mt-10",
                errors.ageProof ? "text-red-500" : "text-gray-500"
              )}
              {...register("ageProofText", {
                required: true,
              })}
              value={selectImg === "" ? 
              locale === "en" ? "* Upload your Image file." : "* 이미지를 업로드 하세요."
              : selectImg}
            />
            <label
              htmlFor="uploadImg"
              className="mt-10 cursor-pointer w-1/4 text-center lg:text-sm text-xs bg-red-800 py-3 rounded-lg text-white tracking-wider hover:bg-black transition"
            >
              {locale === "en" ? "File" : "파일"}
            </label>
            <input
              type="file"
              accept="image/*"
              id="uploadImg"
              className="opacity-0 w-[0.1px]"
              {...register("ageProof", {
                required: true,
              })}
              onChange={({ target }: any) => {
                const file = target.files[0].name;
                if (file) {
                  set_selectImg(file);
                  return false;
                }
              }}
            />
          </div>
          <p className="lg:text-xs text-[0.5rem] mt-2 tracking-tighter">
          {locale === "en" ?
          "Attachment for the proof your age ( Scan the first page of your passport.)" : 
          "나이 증명서 첨부 (주민등록증, 여권 등)"
            }
          </p>
          <input
            type="text"
            placeholder={locale === "en"
            ? "Team Member Personal Information"
            : "팀원 인적사항"}
            className="py-3 px-5 rounded-lg shadow-md focus:bg-[#f0f0f0] transition lg:text-sm text-xs mt-10 mb-2 tracking-tighter"
            autoComplete="off"
            {...register("teamMember")}
          />
          <select 
          className="focus:outline-none py-3 px-5 rounded-lg shadow-md focus:bg-[#f0f0f0] transition lg:text-sm text-xs mt-10 mb-2 tracking-tighter text-gray-400"
          {...register("section", {
            required: locale === "en" ? "Please choose your section." : "경연부문을 선택하세요.",
          })}
          >
            <option selected className="py-5" value="">{locale === "en" ? "* Section" : "* 경연부문"}</option>
            <option value="Piano Solo">Piano Solo</option>
            <option value="Piano Duo ( 4 Hands & 2 Piano )">Piano Duo ( 4 Hands & 2 Piano )</option>
            <option value="Piano with Orchestra or Second Piano">Piano with Orchestra or Second Piano</option>
            <option value="Piano Duet ( Chamber )">Piano Duet ( Chamber )</option>
            <option value="Piano Trio ( Chamber )">Piano Trio ( Chamber )</option>
            <option value="Piano Quartet ( Chamber )">Piano Quartet ( Chamber )</option>
            <option value="Piano Quintet ( Chamber )">Piano Quintet ( Chamber )</option>
          </select>
          {errors.section ? (
            <p className="text-xs mt-3 text-red-500">
              {errors.section.message}
            </p>
          ) : null}
          <select 
          className="focus:outline-none py-3 px-5 rounded-lg shadow-md focus:bg-[#f0f0f0] transition lg:text-sm text-xs mt-10 mb-2 tracking-tighter text-gray-400"
          {...register("ageCategory", {
            required: locale === "en" ? "Please choose your category." : "나이별 부문을 선택하세요.",
          })}
          >
            <option selected className="py-5" value="">{locale === "en" ? "* Age Category" : "* 나이별 부문"}</option>
            <option value="Junior">Junior</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Young Master">Young Master</option>
            <option value="Senior">Senior</option>
            <option value="Artist">Artist</option>
          </select>
          {errors.ageCategory ? (
            <p className="text-xs mt-3 text-red-500">
              {errors.ageCategory.message}
            </p>
          ) : null}
          <input
            type="text"
            placeholder={locale === "en" ? "* E-mail" : "* 이메일"}
            className="py-3 px-5 rounded-lg shadow-md focus:bg-[#f0f0f0] transition lg:text-sm text-xs mt-10 mb-2 tracking-tighter"
            autoComplete="off"
            {...register("email", {
              required: locale === "en" ? "Please write down your Email." : "이메일을 적어주세요",
              validate: {
                must: (value) => value.includes("@") || "Email must have '@'",
              },
            })}
          />
          {errors.email ? (
            <p className="text-xs mt-3 text-red-500">{errors.email.message}</p>
          ) : null}
          <input
            type="text"
            placeholder={locale === "en"
            ? "* Phone-number ( with the Country Code )"
            : "* 전화번호"}
            className="py-3 px-5 rounded-lg shadow-md focus:bg-[#f0f0f0] transition lg:text-sm text-xs mt-10 mb-2 tracking-tighter"
            autoComplete="off"
            {...register("phone", {
              required: locale === "en" ? "Please write down your phone number." : "전화번호를 적어주세요.",
            })}
          />
          {errors.phone ? (
            <p className="text-xs mt-3 text-red-500">{errors.phone.message}</p>
          ) : null}
          <input
            type="text"
            placeholder={locale === "en" ? "* Video link of your performance" : "* 비디오 링크"}
            className="py-3 px-5 rounded-lg shadow-md focus:bg-[#f0f0f0] transition lg:text-sm text-xs mt-10 mb-2 tracking-tighter"
            autoComplete="off"
            {...register("videoLink", {
              required: locale === "en" ? "Please write down your link." : "비디오 링크를 적어주세요.",
            })}
          />
          {errors.videoLink ? (
            <p className="text-xs mt-3 text-red-500">
              {errors.videoLink.message}
            </p>
          ) : null}
          <input
            type="text"
            placeholder={locale === "en"
            ? "* Name of the depositor ( Application Fee )"
            : "* 입금자명"}
            className="py-3 px-5 rounded-lg shadow-md focus:bg-[#f0f0f0] transition lg:text-sm text-xs mt-10 mb-2 tracking-tighter"
            autoComplete="off"
            {...register("depostisor", {
              required: locale === "en" ? "Please write down depostisor name." : "입금자명을 적어주세요.",
            })}
          />
          {errors.depostisor ? (
            <p className="text-xs mt-3 text-red-500">
              {errors.depostisor.message}
            </p>
          ) : null}
          <input
            type="text"
            placeholder={locale === "en" ? "* Current Teacher" : "* 지도자 (현재)"}
            className="py-3 px-5 rounded-lg shadow-md focus:bg-[#f0f0f0] transition lg:text-sm text-xs mt-10 mb-2 tracking-tighter"
            autoComplete="off"
            {...register("teacher", {
              required: locale === "en" ? "Please write down your name of current teacher." : "현재 지도자의 성함을 적어주세요.",
            })}
          />
          {errors.teacher ? (
            <p className="text-xs mt-3 text-red-500">
              {errors.teacher.message}
            </p>
          ) : null}
          <input
            type="text"
            placeholder={locale === "en"
            ? "* E-mail address of the Current Teacher"
            : "* 지도자 이메일"}
            className="py-3 px-5 rounded-lg shadow-md focus:bg-[#f0f0f0] transition lg:text-sm text-xs mt-10 mb-2 tracking-tighter"
            autoComplete="off"
            {...register("teacherEmail", {
              required: locale === "en" ? "Please write down teacher_email." : "지도자의 이메일을 적어주세요.",
              validate: {
                must: (value) => value.includes("@") || "Email must have '@'",
              },
            })}
          />
          {errors.teacherEmail ? (
            <p className="text-xs mt-3 text-red-500">
              {errors.teacherEmail.message}
            </p>
          ) : null}
          <div className="flex gap-5">
            <input
              type="text"
              className="py-3 px-5 rounded-lg shadow-md focus:bg-[#f0f0f0] transition lg:text-sm text-xs mt-10 mb-2 tracking-tighter w-1/2"
              placeholder={locale === "en" ? "* Piece" : "* 연주곡목"}
              autoComplete="off"
              {...register("performingPiece", {
                required: locale === "en" ? "Please write down your performing piece." : "연주곡목을 적어주세요.",
              })}
            />
            <input
              type="text"
              className="py-3 px-5 rounded-lg shadow-md focus:bg-[#f0f0f0] transition lg:text-sm text-xs mt-10 mb-2 tracking-tighter w-1/2"
              placeholder={
                locale === "en"
                  ? "* Duration ( mm : ss )"
                  : "* 연주길이 ( mm : ss )"
              }
              autoComplete="off"
              {...register("performingDuration", {
                required: locale === "en" ? "Please write down your performing duration." : "연주길이를 적어주세요.",
              })}
            />
          </div>
          {errors.performingPiece ? (
            errors.performingDuration ? (
              <p className="text-xs mt-3 text-red-500">
                {errors.performingDuration.message}
              </p>
            ) : (
              <p className="text-xs mt-3 text-red-500">
                {errors.performingPiece.message}
              </p>
            )
          ) : errors.performingDuration ? (
            <p className="text-xs mt-3 text-red-500">
              {errors.performingDuration.message}
            </p>
          ) : null}
          <input
            type="submit"
            disabled={submitLoading}
            className={cls(
              "mt-24 mb-14 mx-auto text-white font-thin tracking-tight lg:text-2xl text-lg lg:w-52 w-36 lg:py-5 py-3 hover:bg-black transition rounded-xl",
              submitLoading ? "bg-black" : "bg-red-800"
            )}
            value={
              submitLoading
                ? locale === "en"
                  ? "Loading..."
                  : "로딩중..."
                : locale === "en"
                ? "SUBMIT"
                : "제출"
            }
          />
        </div>
      </form>
      {submitPopup ? (
        <>
          <motion.div
            className="absolute w-full h-full bg-[rgba(0,0,0,0.6)] top-0 z-40 transtion flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
          <motion.div
          className="fixed top-[40%] z-40 w- bg-[whitesmoke] lg:px-24 px-16 py-10 flex flex-col justify-center items-center gap-10 rounded-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <h1 className="text-gray-800 font-thin tracking-wider">{locale === "en" ? "Application has been completed.": "신청이 완료되었습니다."}</h1>
            <button 
            className="text-lg text-red-800 hover:text-black transition tracking-tighter"
            onClick={popupClose}
            >
              {locale === "en" ? "Check": "확인"}
            </button>
          </motion.div>
          </motion.div>
        </>
      ) : null}
    </>
  );
}
