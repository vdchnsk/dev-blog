import {useState, useCallback} from 'react'

export const useHttp = () => {
    const [inProcess, setInProcess] = useState(false)
    const [error, setError] = useState(null)
    

    const request = useCallback(async  (url , method = "GET", body = null, headers = {}) =>{
        setInProcess(true)
        try {
            if ( body ){
                body = JSON.stringify(body) //приводим body к строке
                headers["Content-Type"] = "application/json" //доабление хедера запросу
            }
            const responce = await fetch(url, {method, body, headers})
            
            const data = await responce.json()

            if(!responce.ok){
                throw new Error(data.message || "Что-то пошло не так!")
            }
            setInProcess(false)

            return data
        }catch(e){
            setInProcess(false)
            setError(e.message)
            throw e
        }
    }, [])
    const clearErrors = () => setError(null, [])

    
    return {inProcess , error , request, clearErrors}
    
}