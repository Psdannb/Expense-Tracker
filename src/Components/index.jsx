import React from "react";
import { auth, provider } from "../Config/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
const index = () => {
  const navigate = useNavigate();
  const signINWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    const authInfo = {
      userId: results.user.uid,
      name: results.user.displayName,
      photo: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense");
  };
  return (
    <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-screen flex justify-center items-center ">
      <div className="">
        <div>
          <p className="text-4xl text-white">SignIn with Google to continue</p>
        </div>
        <div className=" text-center mt-6 " onClick={signINWithGoogle}>
          <button className=" border-2 rounded border-white p-4 hover:text-white">
            SignIn with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default index;
