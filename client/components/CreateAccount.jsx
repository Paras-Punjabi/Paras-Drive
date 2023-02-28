import React,{useState} from 'react'
import {GrOnedrive} from 'react-icons/gr'
import {useRouter} from 'next/router'
import { ToastContainer,toast } from 'react-toastify'

const CreateAccount = ({setLoggedInStatus}) => {
    const [data, setData] = useState({name:"",email:"",password:"",cpassword:""})
    const router  = useRouter()

    async function createAccount(){
        if(data.password === data.cpassword){
            const rawData = await fetch(`${process.env.SERVER_HOSTNAME}/api/user/create`,{
              method:"POST",
              headers:{
                "Content-Type":"application/json",
              },
              body:JSON.stringify({name:data.name,email:data.email,password:data.password})
            })
            const jsonData = await rawData.json()
            console.log(jsonData);
            if(jsonData.status){
              localStorage.setItem("authtoken",jsonData.authtoken)
              toast.success('Account Created Sucessfully', {position: "top-right",autoClose: 3000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,});
              setTimeout(()=>{
                setLoggedInStatus(true)
                router.push("/")
              })
            }else{
              console.log("Error Occured");
              toast.error('Error Occured', {position: "top-right",autoClose: 3000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,});
            }
            setData({name:"",email:"",password:"",cpassword:""})
        }
    }
  return (
    <>
    
    <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
    <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
      <h1 className="title-font font-mono text-5xl tracking-tighter text-gray-900">Welcome to Paras Drive <GrOnedrive className='inline text-6xl'/></h1>
      <p className="leading-relaxed mt-4">Drive that helps you to store data which includes your important files ( like photos, pdf&apos;s, text-files, etc.) and your important notes in cloud. It will help you make a backup of your data without using any external hard drives and store your data in encrypted form and help you to store it for lifetime. It will also help you to transfer your files easily from one device to another device without physically connecting the two devices.</p>
    </div>
    <div className="lg:w-1/3 md:w-1/2 bg-gray-50 rounded-lg p-8 flex flex-col md:ml-auto w-full md:mt-0 shadow-2xl">
      <h2 className="text-gray-900 text-center text-2xl font-mono mb-1 font-medium title-font">Create Account</h2>
      <div className="relative mb-4">
        <label htmlFor="name" className="font-mono leading-7 text-sm text-gray-600">Full Name</label>
        <input placeholder='John Wats' value={data.name} onChange={(e)=>{setData({name:e.target.value,email:data.email,password:data.password,cpassword:data.cpassword})}} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>

      <div className="relative mb-4">
        <label htmlFor="email"  className="font-mono leading-7 text-sm text-gray-600">Email</label>
        <input placeholder='johnwats@yahoo.com' type="email" value={data.email} onChange={(e)=>{setData({email:e.target.value,name:data.name,password:data.password,cpassword:data.cpassword})}} id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label htmlFor="password"  className="font-mono leading-7 text-sm text-gray-600">Password</label>
        <input type="password" placeholder='john12-56' value={data.password} onChange={(e)=>{setData({password:e.target.value,email:data.email,name:data.name,cpassword:data.cpassword})}} id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label htmlFor="cPassword" className="font-mono leading-7 text-sm text-gray-600">Confirm Password</label>
        <input type="password" placeholder='john12-56' value={data.cpassword} onChange={(e)=>{setData({cpassword:e.target.value,email:data.email,password:data.password,name:data.name})}} id="cPassword" name="cPassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
        {(data.cpassword!=="" || data.password !== "" )&& 
        <span className={`${data.password !== data.cpassword ? "text-red-600" : "text-green-600"} -mt-3 mb-2 text-base`}>{data.password !== data.cpassword ? "*Password's doesn't match" : "Password's matched"}</span>}
      <button onClick={createAccount} className="text-lg font-mono bg-slate-600 hover:bg-slate-700 text-white border-0 py-2 px-6 focus:outline-none rounded text-center">Create</button>
    </div>
    </div>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} />
    </>
  )
}

export default CreateAccount