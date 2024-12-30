import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from '../../components/context/authContext';
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";

const Dashboard = () => {
  const { employeeId } = useAuth() 
    
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");  
  const [isPunchIn, setIsPunchIn] = useState(false);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [hours, setHours] = useState(0); // Track elapsed hours
  const [minutes, setMinutes] = useState(0); // Track elapsed minutes
  const [timerInterval, setTimerInterval] = useState(null); // Store interval ID

//   const handlePucnh = async () => {
//     if (isPunchIn) {
//       if (window.confirm("Are you sure you want to Punch Out?")) {
//         clearInterval(timerInterval); // Stop the timer
//         setTimerInterval(null);
//         setIsPunchIn(false);
//       }
//     } else {
//       if (window.confirm("Are you sure you want to Punch In?")) {
//         const interval = setInterval(() => {
//             setMinutes((prevMinutes) => {
//               if (prevMinutes === 59) {
//                 setHours((prevHours) => prevHours + 1);
//                 return 0; // Reset minutes to 0 after 59
//               }
//               return prevMinutes + 1;
//             });
//           }, 60000); // Increment minutes every 60,000ms (1 minute)
//           setTimerInterval(interval);
//           setIsPunchIn(true);
//       }
//     }
//   };

const handlePunch = async () => {
    setSuccess("");
    setError("");
    if (isPunchIn) {
        if (window.confirm("Are you sure you want to Punch Out?")) {
            clearInterval(timerInterval);
            setTimerInterval(null);

            const punchTime = new Date();
            try {
                const response = await axios.post("http://localhost:5000/api/dashboard/punch-out",
                    {punchTime},{
                    headers: {
                        "employee-id": employeeId,
                    }
            });
                setSuccess(response.data.message);
                setError("");
                setIsPunchIn(false);
            } catch (error) {
                setSuccess("");
                setError(
                    error.response?.data?.message || "Failed to punch out. Please try again"
                  );
            }
        }
    }else {
        if (window.confirm("Are you sure you want to Punch In?")) {
            const interval = setInterval(() => {
              setMinutes((prevMinutes) => {
                if (prevMinutes === 59) {
                  setHours((prevHours) => prevHours + 1);
                  return 0; // Reset minutes to 0 after 59
                }
                return prevMinutes + 1;
              });
            }, 60000); // Increment minutes every 60,000ms (1 minute)
            setTimerInterval(interval);
            setIsPunchIn(true);
          }
    }
}

  useEffect(() => {
    if (!isPunchIn) {
      setHours(0);
      setMinutes(0);
    }
  }, [isPunchIn]);
  

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="flex flex-col lg:flex-row overflow-auto gap-4 font-body">
        <div className="flex flex-col bg-white p-6 lg:p-5 w-full mx-auto rounded-xl shadow-md font-body lg:w-[46%]">
          <h2 className="text-base lg:text-sm font-semibold text-gray-500">
            TIME AT WORK
          </h2>
          {error && (
            <p className="text-red-500 mb-4 text-xs font-semibold">{error}</p>
          )}
          {success && (
            <p className="text-green-500 mb-4 text-xs font-semibold">
              {success}
            </p>
          )}
          <p className="text-[3rem] text-center font-bold mx-auto w-auto mt-5">
            {time}
          </p>
          <button
            onClick={handlePunch}
            className={`mt-4 text-center text-lg font-bold ${
              isPunchIn
                ? "bg-red-500 hover:bg-red-600"
                : "bg-yellow-500 hover:bg-yellow-600"
            } rounded-lg py-2`}
          >
            {isPunchIn ? "PUNCH OUT" : "PUNCH IN"}
          </button>
        </div>
        <div className="bg-white p-6 lg:p-5 w-full mx-auto rounded-xl shadow-md font-body">
          <h2 className="text-base lg:text-sm font-semibold text-gray-500">
            WORKING HOURS
          </h2>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 overflow-auto font-body">
        <div className="flex flex-col w-full">
          <div className="flex flex-col lg:flex-row gap-4 mt-5">
            <div className="bg-white p-6 lg:p-5 w-full mx-auto rounded-xl shadow-md">
              <h2 className="text-base lg:text-sm font-semibold text-gray-500">
                QUICK LAUNCH
              </h2>
              <div className="flex flex-row justify-center items-center mx-auto mt-5 gap-4 mb-5">
                <div className="text-center">
                  <ExitToAppOutlinedIcon
                    className=" bg-green-500 hover:bg-green-600 cursor-pointer text-white rounded-lg p-1"
                    style={{ fontSize: "3rem" }}
                  />
                  <p className="text-xs mt-3 text-black">APPLY LEAVE</p>
                </div>
                <div className="text-center">
                  <PortraitOutlinedIcon
                    className="bg-green-500 hover:bg-green-600 cursor-pointer text-white rounded-lg p-1"
                    style={{ fontSize: "3rem" }}
                  />
                  <p className="text-xs mt-3 text-black">MY LEAVE</p>
                </div>
                <div className="text-center">
                  <TimerOutlinedIcon
                    className="bg-green-500 hover:bg-green-600 cursor-pointer text-white rounded-lg p-1"
                    style={{ fontSize: "3rem" }}
                  />
                  <p className="text-xs mt-3 text-black">START TIME</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 lg:p-5 w-full mx-auto rounded-xl shadow-md">
              <h2 className="text-base lg:text-sm font-semibold text-gray-500">
                APPLY AWAY FROM KEY BOARD
              </h2>
              <p className="text-sm lg:text-xs font-semibold text-gray-500 mt-3">
                Punched In Todat at 6.65 A.M
              </p>
              <h2 className="text-[2rem] text-center font-bold mx-auto w-auto mt-3">
              {hours}h {minutes}m Today
              </h2>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 mt-5">
            <div className="bg-white p-6 lg:p-5 w-full mx-auto rounded-xl shadow-md">
              <h2 className="text-base lg:text-sm font-semibold text-gray-500">
                MY NOTE
              </h2>
            </div>
            <div className="bg-white p-6 lg:p-5 w-full mx-auto rounded-xl shadow-md">
              <h2 className="text-base lg:text-sm font-semibold text-gray-500">
                LEAVE AVAILABILITY
              </h2>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 lg:p-5 w-full mx-auto rounded-xl shadow-md mt-5 lg:w-[50%]">
          <h2 className="text-base lg:text-sm font-semibold text-gray-500">
            UPCOMING SHEDULE
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
