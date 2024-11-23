import React from 'react'

const Report = () => {
  return (
    <div>
        <div className='mx-auto rounded-xl overflow-auto shadow-md'>
        <div className='bg-white w-full p-6 lg:p-5 font-primary'>
            <h2 className='text-base lg:text-sm font-semibold mb-4'>
                Assigned Supervisors
            </h2>

            <div className='overflow-x-auto'>
                <table className='min-w-full table-auto font-secondary'>
                    <thead>
                        <tr>
                            <th className='px-4 py-2 text-xs'>Name</th>
                            <th className='px-4 py-2 text-xs'>Position</th>
                            <th className='px-4 py-2 text-xs'>Reporting Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="3" className='text-center px-4 py-3 text-xs bg-yellow-200'>
                                No records found
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Report