import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className=" flex justify-center items-center w-full h-[90vh]">
            <div className="grid grid-cols-[1fr_2fr] gap-7  h-[550px] ">
                    <iframe src="https://lottie.host/embed/d618fe1c-8224-4a27-b280-e57174efa05f/CrTfXiaFeb.json"
                        className='w-full h-full rounded-xl shadow-[6px_9px_6px_0px_rgba(0,_0,_0,_0.2)] transition hover:shadow-[6px_9px_6px_0px_rgba(0,_0,_0,_0.3)] cursor-pointer'
                        title='ghost'></iframe>
                <div className="flex flex-col justify-center">
                    <h1 className="text-[3rem] font-spaceMono font-bold">404 - Page Not Found :(</h1>
                    <p className="font-spaceMono">The page you are looking for does not exist,{" "}
                        <Link to={`/vote`} className="font-spaceMono font-semibold underline hover:text-[#76ABAE]">go back</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
