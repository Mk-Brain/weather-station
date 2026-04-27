
import  { useEffect, useState } from 'react';
import type { weatheData } from './type';

function useConstantFetch(url: string, params: object) {
    const [data, setData] = useState<weatheData>()
    const [loading, setLoading] = useState(false)
    const [check, setCheck] = useState('')

    useEffect(()=>{
        const socket = new WebSocket(url)

        socket.onopen = ()=>{
            setCheck('Connected')
            setLoading(true)
            console.log('Connected')
        }

        socket.onmessage = (e) =>{
            try {
                const reponse = JSON.parse(e.data)
                setData(reponse)
                
            } catch (error) {
                console.log('>>>>>>>>>>Erreur de conversion : '+error);
                
            }
        }

        socket.onerror = (err)=>{
            console.log('>>>>>>>>>> Erreur web socket : ' + err);

            
        }

        socket.onclose = ()=>{
            console.log("Fin de la connexion");
            setLoading(false)
            
        }
        
        return ()=>{
            socket.close()
        }
    }, [params, url])

    return {data, loading, check};
}

export default useConstantFetch;