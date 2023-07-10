import React, { useEffect, useState } from "react";
import { account } from "../appwrite/appwriteConfig";
import { useNavigate, Link } from "react-router-dom";
import TodoForm from "./TodoForm";
import TodosForm from "./TodosForm";

function Profile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState();
  useEffect(() => {
    const getData = account.get();
    getData.then(
      function (response) {
        setUserDetails(response);
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {userDetails ? (
        <>
          <header className=" h-12 w-full bg-yellow-900 shadow shadow-yellow-600">
            <ul className="flex h-full w-full justify-between">
              <li className="self-center">
                <h1 className="ml-12 md:ml-4 sm:ml-0 text-2xl font-medium text-gray-400 uppercase underline decoration-wavy underline-offset-4 decoration-yellow-600">
                  {userDetails.name}
                </h1>
              </li>
              <li className="text-2xl font-medium text-white underline decoration-solid underline-offset-4 self-center">
                TODO
              </li>
              <li className="self-center">
                <button
                  className="bg-red-600 text-white rounded-lg p-1 px-3 mr-6  content-center "
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </header>
          {/* COMMENT:todo Form */}
          <TodoForm />
          {/* COMMENT: TODOs BOX */}
          <TodosForm/>
        </>
      ) : (
        <>
          <div className="grid place-items-center loginSignupBackground">
            <p className="lg:text-2xl md:text-1xl sm:text-xl font-bold ">
              please login into Your account{""}
              <Link to="/">
                <span className="bg-yellow-900 p-2 cursor-pointer text-white ml-2 text-lg rounded-2xl ">
                  Login
                </span>
              </Link>
            </p>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
