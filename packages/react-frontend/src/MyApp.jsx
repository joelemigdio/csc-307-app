import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";



function MyApp() {
  const [characters,setCharacters] = useState([]);

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

  return promise;
  }
  
  function updateList(person) {
    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
     .then((res) => {
       if (res.status === 201){
          return res.json();
       } else {
        throw new Error("User not created");
       }
     })
     .then((newUser) => {
        setCharacters([...characters, newUser]);
     })
     .catch((error) => {
       console.log(error);
    });
  }
  
  function removeOneCharacter(index) {
    fetch('http://localhost:8000/users/${id}',{
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204){
          setCharacters(characters.filter((user) => user.id !== id));
        }else if (response.status === 404){
          console.error("user not found on backend");
        }else{
          throw new Error("Delete failed");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Table 
      characterData={characters}
      removeCharacter={removeOneCharacter}
     />
     <Form handleSubmit={updateList}/>
    </div>
  );
}

export default MyApp;
