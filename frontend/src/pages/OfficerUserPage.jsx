import { useCallback, useEffect, useState } from "react"
import ProfileCard from "../components/cards/ProfileCard"

export const OfficerUserPage = ()=>{
    const [users, setUsers] = useState([])
    const handleRequest = async ()=>{
        try {
            const response = await fetch("http://localhost:3000/officer/users",{
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
            setUsers(data.users);
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
            Users
        </div>
        <div className="mt-4">
            {users && users.map((user)=>{
                return <ProfileCard name={user.username} number={user.number} email={user.email}adhaar={user.adhaar}></ProfileCard>
            })} 
        </div>
    </div>
}