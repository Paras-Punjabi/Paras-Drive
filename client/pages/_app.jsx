import '../styles/globals.css'
import Head from 'next/head'
import {useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const [authToken,setAuthtoken] = useState("")
  const [loggedInStatus,setLoggedInStatus] = useState(false)

  useEffect(()=>{
    setAuthtoken(localStorage.getItem("authtoken"))
    if(authToken){
        setLoggedInStatus(true)
    }
  },[authToken])

  return (<>
   <Head>
      <title>Paras Drive</title>
      {/* <link rel="shortcut icon" href="/image.png" type="image/x-icon" /> */}
    </Head>
    <Navbar loggedInStatus={loggedInStatus}/>
  <Component loggedInStatus={loggedInStatus} setLoggedInStatus={setLoggedInStatus} {...pageProps} />
  </>)
}

export default MyApp
