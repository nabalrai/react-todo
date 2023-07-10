import { React, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  databases,
  account,
  appwriteDatabaseId,
  appwriteCollectionId,
} from "../appwrite/appwriteConfig";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    //get the current login user data in json format from the appwrite by using account.get()
    account
      .get()
      .then((response) => {
        setUserId(response.$id); // set userId to the current userId
        console.log(response); //sucess
      })
      .catch((error) => {
        console.log("Failed to fetch user account:", error); //faliure
      });
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const promise = databases.createDocument(
      appwriteDatabaseId,
      appwriteCollectionId,
      uuidv4(),
      {
        userId,
        todo,
      }
    );
    console.log(promise);
    promise.then(
      function (response) {
        window.location.reload();
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
    e.target.reset();
  };
  return (
    <>
      <div className="max-w-7xl mx-auto mt-10">
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex justify-center mb-10"
        >
          <label htmlFor="todo">{""}</label>
          <input
            type="text"
            name=""
            id="todo" //COMMENT:ID todo
            placeholder="What's need to be done?"
            className="border p-2 w-2/3 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-600 focus:ring-offset-1"
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />
          <button
            className="bg-yellow-600 p-2 text-white ml-2 rounded-md"
            type="submit"
          >
            Add Todo
          </button>
        </form>
      </div>
    </>
  );
}

export default TodoForm;
