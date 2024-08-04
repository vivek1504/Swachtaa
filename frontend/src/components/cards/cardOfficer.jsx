export const CardOfficerComplaints = ({beforeImage, afterImage, address, raisedOn, raisedBy, cleanedOn, CleanedBy, evaluatedBy, evaluatedOn})=>{
    return <div className="border-2 border-solid border-black m-4 rounded-xl">
        <div className="flex justify-center items-center">
            <div className="mr-4">
                <img src={beforeImage}> 
                </img>
                <button className="bg-red-500 flex justify-center">
                    Before
                </button>
            </div>
            <div>
                <img src={afterImage}>
                </img>
                <button className="bg-green-500 flex justify-center">
                    After
                </button>
            </div>
        </div>

        <div className="flex justify-center items-center" >
            <strong>Address : </strong> {address.flat + ", " + address.area + ", " + address.city + ", " + address.pincode + ", " + address.state}
        </div>

        <div className="flex justify-center items-center">
            <strong>Raised by : </strong> {raisedBy}
            <span className="ml-2">
                <strong>On : </strong> {raisedOn}
            </span>
        </div>

        <div className="flex justify-center items-center">
            <strong>Cleaned by : </strong> {CleanedBy}
            <span className="ml-2">
                <strong>On :</strong>  {cleanedOn}
            </span> 
        </div>
        
    </div>
}