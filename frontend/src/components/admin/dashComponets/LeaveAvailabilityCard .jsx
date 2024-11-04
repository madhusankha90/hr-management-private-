import React from 'react';
import login from '../../../imges/login.png'

const LeaveAvailabilityCard = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-xs sm:max-w-md lg:max-w-lg mx-auto">
      <h3 className="text-gray-500 text-sm font-semibold">LEAVE AVAILABILITY</h3>
      <div className='flex gap-5'>
      <div className="mt-4">
        <div className="text-lg font-semibold">
          <span>Annual Leave</span>
          <p className="text-green-600 text-2xl">34 Remaining</p>
        </div>
        <div className="mt-2 text-lg font-semibold">
          <span>Casual / Sick Leave</span>
          <p className="text-green-600 text-2xl">40 Remaining</p>
        </div>
      </div>
      <div className="">
        <img
          src={login}
          alt="Leave Image"
          className=""
        />
      </div>
      </div>
    </div>
  );
};

export default LeaveAvailabilityCard;
