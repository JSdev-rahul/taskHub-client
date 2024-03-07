export const handleTimer = (setTimer: any, setTime: any, timer: any) => {
  setTimer(
    setInterval(() => {
      setTime((prevTime: any) => {
        if (prevTime <= 0) {
          clearInterval(timer) // Clear timer when time reaches 0
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
  )
}
