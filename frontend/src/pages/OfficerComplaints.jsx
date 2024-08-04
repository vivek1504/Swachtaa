import { useEffect, useState } from "react"
import { CardOfficerComplaints } from "../components/cards/cardOfficer"

export const OfficerComplaints = ()=>{
    const [complaints ,setComplaints] = useState([]);

    const handleRequest = async ()=>{
        console.log("request sent")
        try {
            const response = await fetch("http://localhost:3000/officer/complaints",{
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            })
            if (!response.ok) {
                console.log("error")
                return
            }

            const data = await response.json();
            console.log(data.complaints)
            setComplaints(data.complaints);
        }
        catch(error){
            console.log('Error fetching complaints:');
        }
    }

    function formatDate(isoString) {
        const date = new Date(isoString);
      
        if (isNaN(date.getTime())) {
          return "Invalid date";
        }
      
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
      
        return `${day}/${month}/${year}`;
      }
      

    useEffect(()=>{handleRequest()},[])
    return <div>
        <div className="text-2xl font-bold">
            Complaints History
        </div>
        <div className="mt-4">
        {complaints && complaints.map((complaint)=>{
            return <CardOfficerComplaints
            key={complaint.id}
            beforeImage={complaint.beforeImage}
            afterImage={complaint.afterImage}
            raisedBy={complaint.raisedBy ? complaint.raisedBy.username : "Unknown"}
            raisedOn={formatDate(complaint.createdOn) }
            cleanedOn={formatDate(complaint.finishedOn) ? complaint.finishedOn : "xx-xx-xxxx"}
            CleanedBy={complaint.cleanedBy ? complaint.cleanedBy.username : "Not yet cleaned"}
            address={complaint.address}
          />
        })}
        </div>
    </div>
}