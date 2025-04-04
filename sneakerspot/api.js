import axios from "axios"

export const getData =async(url)=>{
        try{
            const res = await axios.get(url)
            return res.data
        }
        catch(err){return Promise.reject(err)}
    }