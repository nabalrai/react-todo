import React, { useState, useEffect } from "react";
import { databases, account,appwriteDatabaseId, appwriteCollectionId } from "../appwrite/appwriteConfig";
import { Trash, Trash2, Edit } from "lucide-react";
import { Query } from "appwrite";

function TodosForm() {
  const [todos, setTodos] = useState([]);
  const [loader, setLoader] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState(null);
  const [editedTodoId, setEditedTodoId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setLoader(true);
    const fetchTodos = async () => {
      try {
        const getCurrentAccount = await account.get(); // Gets currently logged in user data as JSON object.
        const currentUserId = getCurrentAccount.$id;
        // Only fetchs todolist if the logged-in user has changed
        if (userId !== currentUserId) {
          setUserId(currentUserId);
          const listTodos = await databases.listDocuments(
            appwriteDatabaseId,
            appwriteCollectionId,
            [Query.equal("userId", currentUserId)] //Qyery.equal fiters  and fetch the results by comparing the userId with the currentUserId
          );
          setTodos(listTodos.documents); //Sets the todos to the list of todos
        }
        setLoader(false);
      } catch (error) {
        console.log("failed to list the currentUserId documents:", error);
        setLoader(false);
      }
    };
    fetchTodos();
  }, [userId]);

  //BREAK: delete todo
  const deleteTodo = async (id) => {
    try {
      setDeletedItemId(id);
      await databases.deleteDocument(
        appwriteDatabaseId, // database ID
        appwriteCollectionId, // collection ID
        id
      );

      setTodos(todos.filter((todo) => todo.$id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const editTodo = (id) => {
    setEditedTodoId(id);
    const todoToEdit = todos.find((todo) => todo.$id === id);
    setEditedContent(todoToEdit.todo);
    setIsEditing(true);
  };

  const updateTodo = async (id) => {
    try {
      const updatedTodos = todos.map((todo) => {
        if (todo.$id === id) {
          return { ...todo, todo: editedContent };
        }
        return todo;
      });

      const updatedTodo = updatedTodos.find((todo) => todo.$id === id);
      const remainingTodos = updatedTodos.filter((todo) => todo.$id !== id);
      const updatedTodoList = [updatedTodo, ...remainingTodos];

      setTodos(updatedTodoList);
      setEditedTodoId(null);
      setEditedContent("");
      setIsEditing(false);

      await databases.updateDocument(
        appwriteDatabaseId, // database ID
        appwriteCollectionId, // collection ID
        id,
        { todo: editedContent }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="max-w-5xl flex flex-col mx-auto">
      <h1 className="self-center text-2xl font-bold mb-4 underline decoration-wavy underline-offset-4 decoration-yellow-600">
        Todo List
      </h1>
      {loader ? (
        <div className="grid place-items-center w-full h-screen">
          {/*COMMENT:Loaders */}
          <span className="loader" />
        </div>
      ) : (
        <section>
          {todos &&
            todos.map((item) => (
              <div key={item.$id}>
                <div className="p-4 flex items-center justify-between border-b-2 bg-gray-100 rounded-lg mb-1">
                  <div className="w-4/5 ">
                    {item.$id === editedTodoId && isEditing ? (
                      <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="border rounded-lg self-center px-4 py-0.5 focus:outline-none box-border w-full resize-none "
                        name="editedContent"
                        wrap="soft"
                        autoCorrect="on"
                      />
                    ) : (
                      <p>{item.todo}</p>
                    )}
                  </div>
                  <div className="flex space-x-6">
                    {item.$id === editedTodoId && isEditing ? (
                      <button
                        onClick={() => updateTodo(item.$id)}
                        className="text-semibold text-white bg-green-500 px-2 py-1 rounded-lg cursor-pointer ring-1 ring-offset-0 ring-green-500 active:ring-offset-2"
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <span className="border-2 border-gray-300 border-dashed"></span>
                        <span>
                          <Edit
                            className="text-yellow-600 cursor-pointer"
                            onClick={() => editTodo(item.$id)}
                          />
                        </span>
                      </>
                    )}
                    <span className="border-2 border-gray-300 border-dashed"></span>
                    <span>
                      {item.$id === deletedItemId ? (
                        <Trash2 className="text-red-500 cursor-pointer" />
                      ) : (
                        <Trash
                          className="text-red-500 cursor-pointer"
                          onClick={() => deleteTodo(item.$id)}
                        />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </section>
      )}
    </main>
  );
}

export default TodosForm;
