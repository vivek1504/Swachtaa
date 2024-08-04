import { useCallback, useEffect, useState } from "react"
import ProfileCard from "../components/cards/ProfileCard"

export const OfficerCleanerPage = ()=>{
    const [cleaners, setCleaners] = useState([])
    const handleRequest = async ()=>{
        try {
            const response = await fetch("http://localhost:3000/officer/cleaners",{
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            })
            if (!response.ok) {
                console.log("error")
                return
            }

            const data = await response.json();
            console.log(data)
            setCleaners(data.cleaners);
        }
        catch(error){
            console.log('Error fetching complaints:');
        }
    }
    useEffect(()=>{
        handleRequest()
    },[])
    return <div>
        <div className="ml-4 mt-4 text-3xl font-bold">
            Cleaners
        </div>
        <div className="mt-4">
            {cleaners && cleaners.map((cleaner)=>{
                return <ProfileCard name={cleaner.username} number={cleaner.number} email={cleaner.email}adhaar={cleaner.adhaar}></ProfileCard>
            })} 
        </div>
    </div>
}