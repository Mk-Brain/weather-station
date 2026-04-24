import axios from "axios"

import { useEffect, useState } from "react"
import type { weatheData } from "./type"

const useFetch = (url: string, params: object)=>{
    const [data, setData] = useState<weatheData>()
    const [loading, setLoading] = useState(false)
    const [check, setCheck] = useState('')

    useEffect(()=>{
        axios.get(url,{
            params: params
        })
        .then((reponse)=>{
            setCheck('trouvée')
            setData(reponse.data)
        })
        .catch((err)=>{
            console.log("erreur>>>>>>>>>>>>>>>++>>>>>>>>>>>> " + err);
            setCheck('nontrouvée')
        })
        .finally(()=>{
            setLoading(false)
        })
    }, [params, url])

    return {data, loading, check}
}

export default useFetch