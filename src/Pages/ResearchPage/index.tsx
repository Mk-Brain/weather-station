import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const ResearchPage = () => {
    return (
        <div className='flex flex-col bg-linear-to-r from-blue-300 to-violet-600
                        box-border w-full size-dvh '>
            <input type="text" placeholder='Recherher'
            className='bg-white m-3 w-130 h-10 rounded-full pl-5 ml-auto mr-auto'  />
            <span className='flex flex-row gap-6 m-10 font-mono '>
                <p className='text-2xl text-gray-200 '>tokio, japan</p>
                <p className='text-3xl text-white'>22h30</p>
            </span>
            <div className='flex flex-row w-120 mx-auto '>
                <div className='flex-1 w-50 mr-5'>
                    <FontAwesomeIcon  icon={faMoon } 
                    className='text-gray-200 mt-10' size='9x'/>
                </div>
                <div className='flex-2  '>
                    <div className='border-b-2 border-white p-5 mb-7'>
                        <h1 className='text-9xl text-white '>29°</h1>
                        <h1 className='text-[6vw] text-white'>CLEAR</h1>
                    </div>
                    <div>
                        <p className='text-gray-200'>humidity 72%</p>
                        <p className='text-gray-200'>visibility 10km</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResearchPage;