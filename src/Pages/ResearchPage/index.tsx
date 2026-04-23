import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import useFetch from '../../utils/useFetch';
import axios from "axios"
import type { weatheData } from "../../utils/type"

const ResearchPage = () => {
    const url = 'https://api.openweathermap.org/data/2.5/weather'
    const api_key = 'f00c38e0279b7bc85480c3fe775d518c'
    const units = 'metric'

    const [data, setData] = useState<weatheData>()
    const [loading, setLoading] = useState(false)
    const [town, setTown] = useState('')
    
    console.log(data);
    
    function handleChange(e : React.ChangeEvent<HTMLInputElement>){
        setTown(e.target.value)
    }

    function handleClick(){
        axios.get(url,{
            params: {
                q: town,
                appid: api_key,
                units : units
            }
        })
        .then((reponse)=>{
            setData(reponse.data)
        })
        .catch((err)=>{
            console.log("erreur>>>>>>>>>>>>>>>>>>>>>>>>>>> " + err);
            
        })
        .finally(()=>{
            setLoading(false)
        })
    }

    return (
        <div className='flex flex-col bg-linear-to-r from-blue-300 to-violet-600
                        box-border w-full size-dvh '>
            <div>
                <input type="text" placeholder='Recherher'
                className='bg-white m-3 w-130 h-10 rounded-full pl-5 ml-auto mr-auto' 
                value={town}
                onChange={(e)=>{handleChange(e)}} />
                <button 
                className='bg-blue-400 p-2 ml-6 text-white text-xl rounded-xl'
                onClick={(e)=>{
                    e.preventDefault()
                    handleClick()
                }}>Rechercher</button>
            </div>

            <span className='flex flex-row gap-6 m-10 font-mono '>
                <p className='text-2xl text-gray-200 '>{town}, {data?.sys.country}</p>
                <p className='text-3xl text-white'>22h30</p>
            </span>
            <div className='flex flex-row w-200 mx-auto '>
                <div className='flex-1 w-50 mr-5'>
                    <img 
                    src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`} 
                    alt={data?.weather[0].description} 
                    className='text-gray-200 mt-5 size-50' />
                </div>
                <div className='flex-2  '>
                    <div className='border-b-2 border-white p-5 mb-7'>
                        <h1 className='text-9xl text-white '>{data?.main.temp}°</h1>
                        <h1 className='text-[6vw] text-white'>{data?.weather[0].description}</h1>
                    </div>
                    <div>
                        <p className='text-gray-200'>humidity : {data?.main.humidity}%</p>
                        <p className='text-gray-200'>visibility : 10km</p>
                        <p className='text-gray-200'>wind : {data?.wind.speed}km/h</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResearchPage;