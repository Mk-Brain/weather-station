import { Oval } from 'react-loader-spinner';
import React, { useEffect, useState } from 'react';

import axios from "axios"
import useFetch from '../../utils/useFetch';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
    const url = 'https://api.openweathermap.org/data/2.5/weather'

    const [town, setTown] = useState('')
    const [country, setcountry] = useState([{translations : {fra : {common : ''}}}])
    const [paramettres, setParamettres] = useState({})
    const {data, loading, checkFind} = useFetch(url, paramettres)
    const [isOnline, setIsOnline] = useState(navigator.onLine)

    
    useEffect(()=>{
        async function handleStatusChange(){
            setIsOnline(navigator.onLine)
        }

        window.addEventListener('online', handleStatusChange);
        window.addEventListener('offline', handleStatusChange);

        return ()=>{
            window.removeEventListener('online', handleStatusChange);
            window.removeEventListener('offline', handleStatusChange);
        }
    },[isOnline])


    function handleChange(e : React.ChangeEvent<HTMLInputElement>){
        setTown(e.target.value)
    }

    function handleClick(){
           setParamettres({     
                appid: 'f00c38e0279b7bc85480c3fe775d518c',
                units: 'metric', 
                q: town
            })    
    }

    useEffect(()=>{
        async function getCoutry(){
            try {
                const reponse = await axios.get(`https://restcountries.com/v3.1/alpha/${data?.sys.country}`)    
                setcountry(reponse.data)        
            } catch (error) {
                console.log(error)        
            }
        }
            getCoutry()
        },[data?.sys.country])
   

    useEffect(()=>{
        function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(success, error);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
        }

        function success(position: { coords: { latitude: unknown; longitude: unknown; }; }) {
            if(!town){
                setParamettres({         
                appid: 'f00c38e0279b7bc85480c3fe775d518c',
                units: 'metric', 
                lat : position.coords.latitude ,
                lon: position.coords.longitude,
            })
            }
        }

        function error(error: GeolocationPositionError) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.")
            break;
            case error.POSITION_UNAVAILABLE:
            console.log( "Location information is unavailable.")
            break;
            case error.TIMEOUT:
            console.log ("The request to get user location timed out.")
            break;
            default: 
            console.log("unknown error")
            break;
        }
        }
        getLocation()
    },[town])
    

    const datetime = data && new Date((data?.dt + data?.timezone) * 1000)
    const [val, setval] = useState(false)
    
    useEffect(()=>{
        async function changeVal() {
            if(data?.clouds.all && data?.clouds.all > 50){
                setval( true)
            }else{
                setval(false) 
            }
        }
        
        changeVal()
          
    },[data?.clouds.all])


    
    

    //console.log(data)
    //console.log(isOnline)
    //console.log(navigator.onLine)
//flex flex-col bg-linear-to-r  from-blue-500 to-violet-800  from-blue-300 to-violet-600 w-full h-screen

    return (
        <>
        {
            isOnline ? 
            <div className={"flex flex-col w-full h-screen box-border bg-linear-to-r ".concat(val ? "from-blue-500 to-violet-800" : "from-blue-300 to-violet-600") }  >
            <div className='ml-auto mr-auto'>
                <input type="text" placeholder='Recherher'
                className='bg-white m-3 w-130 h-10 rounded-full pl-5 ' 
                value={town}
                onChange={(e)=>{handleChange(e)}} />
                <button 
                className='bg-blue-400 p-2 ml-6 text-white text-xl rounded-xl '
                onClick={(e)=>{
                    e.preventDefault()
                    handleClick()
                }}>Rechercher</button>
            </div>
            {
                checkFind === "nontrouvée" && <p className='text-red-600 m-auto'>Aucune ville ou pays ne correspond a votre recherche</p>
            }
            <span className='flex flex-row gap-6 m-10 font-mono justify-between'>
                <p className='text-2xl text-gray-200 '>{data?.name}, {country[0].translations.fra.common}</p>
                <p className='text-3xl text-white'>{datetime?.toUTCString()}</p>
            </span>
            {loading ? <Oval/> :
            <div className='flex flex-row w-250 mx-auto '>
                <div className='flex-1 w-50 '>
                    <img 
                    src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`} 
                    alt={data?.weather[0].description} 
                    className='text-gray-200 -mt-9 size-80' />
                </div>
                <div className='flex-2  '>
                    <div className='border-b-2 border-white p-5 mb-7'>
                        <h1 className='text-9xl text-white '>{data?.main.temp}°</h1>
                        <h1 className='text-7xl text-white'>{data?.weather[0].description}</h1>
                    </div>
                    <div>
                        <p className='text-gray-200'>Ressenti : {data?.main.feels_like}°C</p>
                        <p className='text-gray-200'>Humidité : {data?.main.humidity}%</p>
                        <p className='text-gray-200'>Pression : {data?.main.pressure} hPa</p>
                        <p className='text-gray-200'>Visibilité : {data?.visibility != null ? data.visibility / 1000 : '-'} km</p>
                        <p className='text-gray-200'>Vent : {data?.wind.speed} km/h</p>
                        <p className='text-gray-200'>Ciel nuageux à  : {data?.clouds.all}%</p>

                    </div>
                </div>
            </div>}
        </div> : <Navigate to='/internetSatus'/>
        }
        </>
    );
};

export default HomePage;