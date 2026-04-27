import axios from "axios"

import { useEffect, useRef, useState } from "react"
import type { weatheData } from "./type"

const useFetch = (url: string, params: object)=>{
    const currentid = useRef(0)
    const [data, setData] = useState<weatheData>()
    const [loading, setLoading] = useState(false)
    const [checkFind, setcheckFind] = useState('')
    

    useEffect(()=>{
        clearInterval(currentid.current)
        function getdata() {
            axios.get(url,{
            params: params
            })
            .then((reponse)=>{            
                setcheckFind('trouvée')
                setData(reponse.data)
            })
            .catch((err)=>{
                console.log(">>>>>>>>>>>>>>>>>> " + err);
                setcheckFind('nontrouvée')
            })
            .finally(()=>{
                setLoading(false)
            })
        }

        getdata()

        currentid.current = setInterval(getdata, 60000)
       
    }, [params, url])

    return {data, loading, checkFind, }
}

export default useFetch