import axios from "axios"

import { useEffect, useState } from "react"
import type { weatheData } from "./type"

const useFetch = (url: string, params: object)=>{
    const [data, setData] = useState<weatheData>()
    const [loading, setLoading] = useState(false)
    const [finded, setFinded] = useState(true)

    useEffect(()=>{
        axios.get(url,{
            params: params
        })
        .then((reponse)=>{
            setFinded(true)
            setData(reponse.data)
        })
        .catch((err)=>{
            console.log("erreur>>>>>>>>>>>>>>>++>>>>>>>>>>>> " + err);
            setFinded(false)
        })
        .finally(()=>{
            setLoading(false)
        })
    }, [params, url])

    return {data, loading, finded}
}

export default useFetch