import React from 'react'

import TimeAtWorkCard from './dashComponets/TimeAtWorkCard'
import WorkingHoursCard from './dashComponets/WorkingHoursCard'
import QuickLaunchCard from './dashComponets/QuickLaunchCard'
import ScheduleCard from './dashComponets/ScheduleCard '

const AdminDashboard = () => {
  return (
    <div>
         <div>
            <TimeAtWorkCard/>
        </div>
        
        <div>
            <WorkingHoursCard/>
        </div>

        <div>
            <QuickLaunchCard/>
        </div> 
        {/* <div>
          <LeaveAvailabilityCard/>
        </div> */}
         <div>
          <ScheduleCard/>
        </div>
        
    </div>
  )
}

export default AdminDashboard