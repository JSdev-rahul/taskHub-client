import React, { memo } from "react"
import OtpInput from "react-otp-input"

interface otpComponentProps {
  otp: string
  setTime: React.Dispatch<any>
  setOtp: React.Dispatch<string>
  time: number
  handleRegenerateOTP: () => void
  handleOtpVerification: () => void
  timer: any
  setIsOtpPage: React.Dispatch<boolean>
}

const OtpComponent: React.FC<otpComponentProps> = ({
  otp,
  setOtp,
  time,
  handleRegenerateOTP,
  handleOtpVerification,
  timer,
  setTime,
  setIsOtpPage,
}) => {
  const formattedTime = `${String(Math.floor(time / 60)).padStart(
    2,
    "0"
  )}:${String(time % 60).padStart(2, "0")}`

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex w-[95%] sm:w-[30%] rounded-2xl flex-col items-center border border-gray-950 bg-slate-50 p-10">
        <h2 className="text-lg font-semibold mb-4">Enter your OTP</h2>
        <p className="mb-4 text-center">
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
        {time == 0 ? (
          <p className="text-sm text-blue-600">Click to regnarte new otp</p>
        ) : (
          <h1>Time:{formattedTime}</h1>
        )}
        <div className="flex mt-4">
          <button
            disabled={time == 0 ? false : true}
            className="px-4 text-xs font-semibold disabled:cursor-not-allowed disabled:bg-slate-400 py-2 bg-blue-500 text-white rounded mr-2"
            onClick={() => handleRegenerateOTP()}
          >
            Regenerate OTP
          </button>
          <button
            disabled={otp.length >= 4 ? false : true}
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
