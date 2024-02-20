import React,{useState,useEffect,useRef} from "react";
import {BsArrowRight} from 'react-icons/bs'
import {AiFillEdit} from 'react-icons/ai'
import {RiLogoutCircleRLine} from 'react-icons/ri'
import {MdSaveAlt} from 'react-icons/md'
import Link from 'next/link'
import Head from 'next/head'
import {useRouter} from 'next/router'
import { ToastContainer,toast } from 'react-toastify'

const Account = ({setLoggedInStatus}) => {
    const [data, setData] = useState();
    const router = useRouter()
    const [contentEditable,setContentEditable] = useState(false)
    const nameReference = useRef(null)
    const bioReference = useRef(null)

    async function getUser() {
      let rawData = await fetch(`${process.env.SERVER_HOSTNAME}/api/user/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authtoken: localStorage.getItem("authtoken"),
        },
      });
      const json = await rawData.json();
      console.log(json);
      setData(json);
    }

    async function updateProfile(){
      setContentEditable(false)
      let rawData = await fetch(`${process.env.SERVER_HOSTNAME}/api/user/update`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "authtoken":localStorage.getItem("authtoken")
        },
        body:JSON.stringify({newName:nameReference.current.innerHTML,newBio:bioReference.current.innerHTML})
      })
      let json = await rawData.json()
      if(json.status){
        toast.success('Profile Updated Sucessfully!', {
        position: "top-right",autoClose: 2000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,});
      }else{
        toast.error('Error Occured!', {
        position: "top-right",autoClose: 2000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,});
      }
    }

    function logout(){
        localStorage.removeItem("authtoken")
        setLoggedInStatus(false)
        toast.success('Logged Out Sucessfully!', {
          position: "top-right",autoClose: 2000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,});
          setTimeout(()=>{
            router.push("/")
          },2000)
    }
  
    useEffect(() => {
      if(!localStorage.getItem("authtoken")){
        router.push("/")
        return
      }
      getUser();
    }, []);
  return (
    <>
      <Head>
        <title>Paras Drive - Account</title>
      </Head>
        <div
          id="profile"
          className="w-full relative mt-7 lg:w-3/5 mx-auto bg-gray-200 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl opacity-75"
        >
            {!contentEditable && <AiFillEdit onClick={()=>{setContentEditable(true)}} title="Edit Profile" className="absolute text-3xl cursor-pointer font-bold right-2 top-2"/>}

            {contentEditable && <MdSaveAlt onClick={()=>{updateProfile()}} title="Save Profile" className="absolute text-3xl cursor-pointer font-bold right-2 top-2"/>}

          <div className="p-4 md:p-12 text-center lg:text-left">
            {/* <div
              className="block lg:hidden rounded-full shadow-2xl shadow-slate-900 mx-auto h-48 w-48 bg-cover bg-center"
            ></div> */}

            <h1 ref={nameReference} contentEditable={contentEditable} className="text-6xl font-mono font-bold pt-8 lg:pt-0">{data && data.name}</h1>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <span>Bio : </span>
                <span ref={bioReference} contentEditable={contentEditable} >{data && data.bio}</span>
            </p>
            <p className="pt-8 text-md font-bold">Joined on <span className="text-lg">{data && data.date}</span></p>
            <div className="pt-12 pb-8 flex flex-col  justify-between">
				<Link href={"/"} ><button className={`bg-green-700 text-center text-xl flex justify-center items-center hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full`}>
                    <span className="mr-3">Move to Home Page</span> <BsArrowRight className="font-extrabold"/>
				</button> 
                </Link>

				<button onClick={logout} className={`bg-red-600 text-center text-xl mt-3 hover:bg-red-700 text-white flex justify-center items-center font-bold py-2 px-4 rounded-full`}>
                    <span className="mr-3">Logout</span> <RiLogoutCircleRLine className="font-extrabold"/>
				</button> 
			</div>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} />
    </>
  );
};

export default Account;
