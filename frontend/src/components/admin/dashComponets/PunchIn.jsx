import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../../../imges/background.png";
import axios from "axios";

const PunchInCard = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [punchNote, setPunchNote] = useState("");
  const [error, setError] = useState(null);
  const [punchNotes, setPunchNotes] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/create-punch",
        {
          date,
          time,
          punchNote,
        }
      );
      if (response.status === 201) {
        alert("punch out successfull");
        navigate("/admin-dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const handlePunchOutCancel = () => {
    alert("Punched out cancelled");
    navigate("/admin-dashboard");
  };

  useEffect(() => {
    const fetchPunchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/get-punch");
        const sortpunches = res.data.getpunches.sort(
          (a, b) =>
            new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time)
        );
        setPunchNotes(sortpunches);
      } catch (error) {
        setError("Failed to load punches");
        console.error(error);
      }
    };
    fetchPunchNotes();
  }, []);

  return (
    <div
      className="fixed inset-0 items-center justify-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
        <h3 className="text-xl font-semibold text-center mb-4">Punch Out</h3>

        <div className="text-center mb-4">
          <p className="text-sm text-gray-700">Punched in time</p>
          <p className="text-lg font-semibold text-black">
            2024-08-10 - 02:17 PM (GMT +02:00)
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
          </div>

          {/* Time Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
          </div>

          {/* Note Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Note
            </label>
            <textarea
              value={punchNote}
              onChange={(e) => setPunchNote(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
              rows="3"
              placeholder="Add a note (optional)"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
              type="submit"
            >
              Punch Out
            </button>
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
              onClick={handlePunchOutCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      
      <div>
        <h3>Upcoming Shedules</h3>
        {error & <p className="text-red-500">{error}</p>}
        <ul className="mt-4 space-y-4">
          {punchNotes.map((item, index) => (
            <li key={index} className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-lg w-12 h-12 flex flex-col justify-center items-center">
                <span className="text-lg font-bold text-blue-600">
                  {new Date(item.date).getDate()}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(item.date).toLocaleString("default", {
                    month: "short",
                  })}
                </span>
              </div>
              <div className="ml-4 flex-1">
                <h4 className="text-gray-800 font-semibold">
                  {item.punchNote}
                </h4>
              </div>
              <div className="ml-auto bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium">
                {item.time}
              </div>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  );
};

export default PunchInCard;
