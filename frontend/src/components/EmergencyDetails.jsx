import axios from 'axios';
import React, { useState } from 'react'

const EmergencyDetails = () => {

    const [name, setName] = useState('');
    const [relationship, setRelationship] = useState('');
    const [mobile, setMobile] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('',{
                name,
                relationship,
                mobile
            })
        } catch (error) {
            
        }
    }

    
    
  return (
    <div>
        <div className='flex mx-auto rounded-xl overflow-auto shadow-md'>
            <div className='bg-white p-6 lg:p-5 w-full font-primary'>
                <h2 className='text-base lg:text-sm font-semibold mb-6'>Emergency Contact Details</h2>
                
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                    <div>
                        <label className='block text-xs font-medium text-gray-700'>
                            Name
                        </label>
                        <input
                            type='text'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none'
                        />
                    </div>
                    <div>
                        <label className='block text-xs font-medium text-gray-700'>
                            Relationship
                        </label>
                        <input
                            type='text'
                            placeholder='Relationship'
                            value={relationship}
                            onChange={(e)=> setRelationship(e.target.value)}
                            className='mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none'
                        />
                    </div>
                    <div>
                        <label className='block text-xs font-medium text-gray-700'>
                            Mobile
                        </label>
                        <input
                            type='text'
                            placeholder='Enter Mobile'
                            value={mobile}
                            onChange={(e)=> setMobile(e.target.value)}
                            className='mt-1 block w-full p-4 md:p-3 lg:p-3 border border-gray-300 rounded-xl focus:border-yellow-500 text-xs focus:outline-none'
                        />
                    </div>
                    <div className='text-sm lg:text-xs mt-6'>
                        <button className='bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-full'>
                            Add
                        </button>
                    </div>
                    </div>
                </form>
            </div>
            </div>

            <div className='bg-white mt-5 p-6 lg:p-5 w-full font-primary mx-auto rounded-xl shadow-md min-h-[10rem] lg:min-h-[18rem]'>
                <h2 className='text-base lg:text-sm font-semibold mb-4'>
                    Records Found
                </h2>

            </div>
    </div>
  )
}

export default EmergencyDetails