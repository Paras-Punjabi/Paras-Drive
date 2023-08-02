import React,{useState} from 'react';

const AboutPage = () => {
    const [tech,setTech] = useState([
      "Next.Js - A powerful React framework for server-side rendering and building modern web applications.",
      "React Icons and React Toastify - These are React packages that enables us to add icons and toast notifications/warnings in their application.",
      "Tailwind CSS - A utility-first CSS framework for rapidly designing responsive and custom-styled interfaces.",
      "Express.Js - A backend framework of Node.Js for making fast and robust servers.",
      "MongoDB - A Non-Relational (NoSQL) document database that provides support for JSON-like storage. Mongoose is the driver that is used to connect database with the server.",
      "Multer - A Node.Js middleware for handling multipart/form-data which is primarily used for uploading files.",
      "JWT - JsonWebToken is a authentication middleware which is used to securely transfer information over the web between server and client",
      "Bcrypt - It is password hashing algorithm used to create encrypted passwords based on Blowfish cipher.",
    ])
  return (
    <div className="p-8 rounded-lg title-font  shadow-md">
      <h1 className="text-6xl title-font font-mono text-gray-900 ml-6">About Us</h1>
      <div className="bg-white bg-opacity-75 p-6 rounded-lg">
        <p className="text-gray-900  text-lg mb-4">
          Paras-Drive is a modern and feature-rich file storage and sharing platform inspired by Google Drive. It helps you to store data which includes your important files and your important notes in cloud. It will help you make a backup of your data without using any external hard drives and store your data in encrypted form and help you to store it for lifetime.
        </p>
        
        <p className="text-3xl text-gray-900 title-font font-mono mb-3">
          Technologies Used:
        </p>
        <ul className="list-none list-inside mb-6">

          {
            tech && tech.map((item,idx)=>{
              return (<div key={idx} className="bg-gray-800 rounded-2xl mb-5 flex p-4 h-full items-center">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-400 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <span className="title-font font-medium text-white">{item}</span>
            </div>)
            })
          }
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
