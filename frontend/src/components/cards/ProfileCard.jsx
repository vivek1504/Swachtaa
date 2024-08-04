import React from 'react'

function ProfileCard({name,number,adhaar,email}) {
  return (
    <>
       <div className="w-[1000px] h-[400px]  mx-auto bg-white rounded-xl shadow-lg space-y-6 sm:py-8 sm:flex sm:items-center sm:space-y-0 sm:space-x-8 mb-4">
      <img className="block mx-auto h-[200px] rounded-full sm:mx-0 sm:shrink-0" src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Download-Image.png" alt="Profile" />
      <div className="text-center space-y-4 pl-0 sm:text-left">
        
        <div className="flex flex-col pb-10 pl-0 sm:flex-row mt-8 sm:space-x-6 space-y-6 sm:space-y-4 text-gray-800">
          <div className=" text-xl font-sans space-y-3">
            <p> <strong>Name:</strong>{name}</p>  
            <p> <strong>Mobile No.:</strong> {number}</p>
            <p> <strong>Email:</strong> {email}</p>
            <p> <strong>Adhaar no:</strong>{adhaar}</p>
         </div>

        </div>
      </div>
    </div>
    </>

  )
}

export default ProfileCard