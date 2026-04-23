import axios from "axios"

import { useEffect, useState } from "react"

const useFetch = (url: string, api_key: string, town: string, units: string)=>{
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
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
    }, [api_key, town, units, url])

    return {data, loading}
}

export default useFetch