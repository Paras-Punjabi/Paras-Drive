import React,{useState, useEffect,useRef} from 'react'
import{toast,ToastContainer} from 'react-toastify'
import emailjs from '@emailjs/browser';

const Contact = () => {
  const btn = useRef()
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [message,setMessage] = useState("")

  useEffect(()=>{
    (function() {
        emailjs.init('7CkKyBAZTYjKs9Ror');
    })();
  },[]);

  async function submitForm(){
    btn.current.disabled = true
    let res = await emailjs.send("service_s4u9grf","template_47rjp3l",{
      from_name: name,
      message: message,
      email_id: email,
    });
    btn.current.disabled = false

    if(res.status === 200){
      toast.success('Message Send Sucessfully', {
        position: "top-right",autoClose: 3000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,});
      setName("")
      setEmail("")
      setMessage("")
    }
    else{
      toast.error('Error Occured!', {
        position: "top-right",autoClose: 3000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,});
    }
  }
  
  return (
    <>
    <section className="text-gray-600 body-font relative">
  <div className="container px-5 py-6 mx-auto ">
    <div className="flex flex-col text-center w-full mb-12 ">
      <h1 className="text-6xl font-mono title-font text-gray-900">Reach Us</h1>
    </div>
    <div className="lg:w-10/12 md:w-2/3 mx-auto  font-semibold border-gray-900 bg-gray-50 rounded-lg p-10 flex flex-col md:ml-auto w-full md:mt-0 shadow-2xl shadow-gray-700">
      <div className="flex flex-wrap -m-2">
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="name" className="leading-7 text-lg text-gray-600">Name</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="email" className="leading-7 text-lg text-gray-600">Email</label>
            <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 w-full">
          <div className="relative">
            <label htmlFor="message" className="leading-7 text-lg text-gray-600">Message</label>
            <textarea name="message" value={message} onChange={(e)=>setMessage(e.target.value)} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
        <div className="p-2 w-full flex flex-col items-center">
          <button ref={btn} onClick={submitForm} className="text-2xl tracking-wider font-mono bg-slate-600 hover:bg-slate-700 text-white border-0 py-2 px-6 focus:outline-none rounded text-center">Submit</button>
        </div>
        
      </div>
    </div>
  </div>
</section>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} />
    </>
  )

  }
export default Contact