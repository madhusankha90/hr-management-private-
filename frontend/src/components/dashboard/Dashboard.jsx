import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../components/context/authContext";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";

const Dashboard = () => {
  const { employeeId } = useAuth();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isPunchIn, setIsPunchIn] = useState(false);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [punchInTime, setPunchInTime] = useState(null);

  const handlePunch = async () => {
    setSuccess("");
    setError("");

    if (isPunchIn) {
      if (window.confirm("Are you sure you want to Punch Out?")) {
        clearInterval(localStorage.getItem("timerId"));
        localStorage.removeItem("timerId");

        try {
          const punchTime = new Date();
          const response = await axios.post(
            "http://localhost:5000/api/dashboard/punch-out",
            { punchTime },
            {
              headers: {
                "employee-id": employeeId,
              },
            }
          );
          setSuccess(response.data.message);
          setIsPunchIn(false);
          setPunchInTime(null);
          localStorage.removeItem("punchInTime");
          localStorage.setItem("isPunchIn", false);
        } catch (error) {
          setError(
            error.response?.data?.message ||
              "Failed to punch out. Please try again"
          );
        }
      }
    } else {
      if (window.confirm("Are you sure you want to Punch In?")) {
        const punchInTime = new Date();
        setPunchInTime(punchInTime);
        localStorage.setItem("punchInTime", punchInTime.toISOString());
        localStorage.setItem("isPunchIn", true);
        setIsPunchIn(true);

        const intervalId = setInterval(() => {
          updateElapsedTime(punchInTime);
        }, 1000);
        localStorage.setItem("timerId", intervalId);
      }
    }
  };

  const updateElapsedTime = (punchInTime) => {
    const now = new Date();
    const elapsed = now - new Date(punchInTime);
    setHours(Math.floor(elapsed / 3600000));
    setMinutes(Math.floor(elapsed / 60000) % 60);
  };

  useEffect(() => {
    const savedPunchInTime = localStorage.getItem("punchInTime");
    const savedIsPunchIn = localStorage.getItem("isPunchIn") === "true";

    if (savedIsPunchIn && savedPunchInTime) {
      const punchInTime = new Date(savedPunchInTime);
      setPunchInTime(punchInTime);
      setIsPunchIn(true);

      updateElapsedTime(punchInTime);
      const intervalId = setInterval(() => {
        updateElapsedTime(punchInTime);
      }, 1000);
      localStorage.setItem("timerId", intervalId);
    }

    return () => {
      clearInterval(localStorage.getItem("timerId"));
    };
  }, []);

  const formatPunchInTime = (punchInTime) => {
    const punchInDate = new Date(punchInTime);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (punchInDate.toDateString() === today.toDateString()) {
      return `Today at ${punchInDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (punchInDate.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${punchInDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return `${punchInDate.toLocaleDateString()} at ${punchInDate.toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      )}`;
    }
  };

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
                {punchInTime
                  ? `Punched In ${formatPunchInTime(punchInTime)}`
                  : "Not Punched In Yet"}
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
