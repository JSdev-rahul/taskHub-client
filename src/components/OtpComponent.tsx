import React, { memo } from "react"
import OtpInput from "react-otp-input"
import { iOtpComponentProps } from "../utils/componentProps"

const OtpComponent: React.FC<iOtpComponentProps> = ({
  otp,
  setOtp,
  time,
  timer,
  setTime,
  handleRegenerateOTP,
  handleOtpVerification,
  setIsOtpPage,
  isOtpSubmit,
}) => {
  const formattedTime = `${String(Math.floor(time / 60)).padStart(
    2,
    "0"
  )}:${String(time % 60).padStart(2, "0")}`

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="flex w-[95%] sm:w-[30%] rounded-2xl flex-col shadow-2xl  items-center border dark:bg-slate-900 dark:border-gray-700 border-gray-950 bg-slate-50 p-10">
        <h2 className="text-lg font-semibold mb-4 dark:text-white text-black">
          Enter your OTP
        </h2>
        <p className="mb-4 text-center dark:text-white text-black">
          OTP sent to your registered email id. Please check.
        </p>
        <div className="flex w-56 h-28 justify-center items-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            shouldAutoFocus={true}
            renderSeparator={<span className="mx-1">-</span>}
            renderInput={(props, i) => (
              <input
                {...props}
                style={{ width: "40px" }}
                className="w-16 h-12 text-center text-lg border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            )}
          />
        </div>
        {time === 0 ? (
          <p className="text-sm text-blue-600 dark:text-white ">
            Click to regnarte new otp
          </p>
        ) : (
          <h1 className="dark:text-white text-black">Time:{formattedTime}</h1>
        )}
        <div className="flex mt-4">
          <button
            disabled={time === 0 ? false : true}
            className="px-4 text-xs font-semibold disabled:cursor-not-allowed disabled:bg-slate-400 py-2 bg-blue-500 text-white rounded mr-2"
            onClick={() => handleRegenerateOTP()}
          >
            Regenerate OTP
          </button>
          <button
            disabled={otp.length >= 4 ? false : isOtpSubmit ? false : true}
            onClick={() => handleOtpVerification()}
            className="px-4 py-2 text-xs font-semibold disabled:bg-slate-400 disabled:cursor-not-allowed shadow-2xl bg-green-500 text-white rounded"
          >
            Submit
          </button>
        </div>
        <button
          onClick={() => {
            clearInterval(timer)
            setTime((prev: any) => 180)
            setIsOtpPage(false)
          }}
          className="underline text-xs text-blue-500 mt-2 cursor-pointer"
        >
          Back to SignIn
        </button>
      </div>
    </div>
  )
}

export default memo(OtpComponent)
