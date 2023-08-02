import React, { useEffect } from "react";
import UserFiles from "../components/UserFiles";
import Head from 'next/head'

const  UploadsPage = ({ loggedInStatus }) => {
  return <>
    <Head>
      <title>Paras Drive - Uploads</title>
    </Head>
  {loggedInStatus && <UserFiles />}
  </>;
};

export default UploadsPage;

