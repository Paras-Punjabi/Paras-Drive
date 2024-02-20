import React, { useEffect } from "react";
import UserFiles from "../components/UserFiles";
import Head from 'next/head'
import { useRouter } from "next/router";

const  UploadsPage = ({ loggedInStatus }) => {
  const router = useRouter()
  useEffect(()=>{
    if(!localStorage.getItem("authtoken")){
      router.push("/")
      return
    }
  })
  return <>
    <Head>
      <title>Paras Drive - Uploads</title>
    </Head>
  {loggedInStatus && <UserFiles />}
  </>;
};

export default UploadsPage;

