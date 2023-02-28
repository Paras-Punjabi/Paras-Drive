import React, { useEffect } from "react";
import UserFiles from "../components/UserFiles";
import { useRouter } from "next/router";
import Head from 'next/head'

const  UploadsPage = ({ loggedInStatus }) => {
  const router = useRouter();
  // useEffect(() => {
  //   if (!loggedInStatus) {
  //     router.push("/");
  //   }
  // });
  return <>
    <Head>
      <title>Paras Drive - Uploads</title>
    </Head>
  {loggedInStatus && <UserFiles />}
  </>;
};

export default UploadsPage;

