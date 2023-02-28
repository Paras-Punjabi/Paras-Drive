import Link from "next/link";
import React, { useEffect, useState } from "react";
import Style from "../styles/Home.module.css";

const UserHomePage = () => {
  const [data, setData] = useState();

  async function getUser() {
    let rawData = await fetch(`${process.env.SERVER_HOSTNAME}/api/user/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authtoken"),
      },
    });
    const json = await rawData.json();
    setData(json);
  }

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <section className="text-gray-600 border body-font">
        <div className="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
          {/* <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600"> */}
          <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
            <h1
              className={`sm:text-4xl mb-4 font-medium font-mono text-gray-900 ${Style.heading}`}
            >
              Welcome {data && data.name}...
            </h1>
            <p className="mb-8 text-lg leading-relaxed">{data && data.bio}</p>

            <div className="flex w-full justify-around items-end">
              <Link href={"/notes"}>
                <div className="xl:w-1/3 md:w-1/2 p-4">
                  <div className="border border-gray-400 hover:scale-125 p-6 cursor-pointer transition-transform rounded-lg">
                    <h2 className="text-2xl text-mono text-gray-900 font-medium title-font mb-2 font-mono">
                      Your Notes
                    </h2>
                    <p className="leading-relaxed text-base font-bold">
                      Lets go and create a note to save important todo&apos;s of
                      your day
                    </p>
                  </div>
                </div>
              </Link>

              <Link href={"/uploads"}>
                <div className="xl:w-1/3 md:w-1/2 p-4">
                  <div className="border border-gray-400 p-6 cursor-pointer transition-transform hover:scale-125 rounded-lg">
                    <h2 className="text-2xl text-mono text-gray-900 font-medium title-font mb-2 font-mono">
                      Your Uploads
                    </h2>
                    <p className="leading-relaxed text-base font-bold">
                      Lets go and upload your important file to save it on cloud
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserHomePage;
