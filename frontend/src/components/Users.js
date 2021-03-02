import React, { useState } from "react";
import axios from "axios";


function Users() {

  // Used for POST
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState(0);


  // Used for GET
  const [userList, setUserList] = useState([]);


  // Used for UPDATE
  const [newAge, setNewAge] = useState(0);


  // POST USER TO DATABASE
  const addUser = () => {
    //console.log(fname, lname, age)
    axios
      .post("http://localhost:5000/create", {
        fname: fname,
        lname: lname,
        age: age,
      })
      .then(() => {
          setUserList([...userList, {           // Auto update list whena new user is added
              fname: fname,
              lname: lname,
              age: age,
          }])
        //console.log("sucess");
      });
  };


  // GET USERS FROM THE DATABASE
  const getUsers = () => {
      axios.get("http://localhost:5000/users").then((response) => {         //response will contain what we recieve from the backend
          //console.log(response)
          setUserList(response.data)
      })
  }


  // UPDATE USERS IN THE DATABASE
  const updateUserAge = (id) => {
      axios.put("http://localhost:5000/update", {
          age: newAge,
           id: id
        }).then((response) => {
            setUserList(userList.map((val) => {
                return val.id === id ? {
                    id: val.id, 
                    fname: val.fname, 
                    lname: val.lname, 
                    age: newAge} 
                    : val 
            }))
            //alert('Update');
        })
  }


  // Delete user from the database
  const deleteUser = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`).then((response) => {
        setUserList(userList.filter((val) => {
            return val.id !== id;
        }))
    })
  }

  return (
    <>
      <div className="container">

        {/* POST DATA TO BACKEND */}

        <form className="form" >
          <label htmlFor="">Create User</label>
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => {
              setFname(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => {
              setLname(e.target.value);
            }}
          />
          <input
            type="number"
            placeholder="Age"
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
          <button onClick={addUser}>Add User</button>
        </form>
        *************************************************************
        {/* GET DATA FROM BACKEND */}

        <label htmlFor="">Get Users</label>
        <div className="users">
          <button className="show" onClick={getUsers} >Show users</button>

            {/* Render userList */}
            {userList.map((val, key) => {
                return<div className="user">
                    <h3>Name: {val.fname} {val.lname}</h3>
                    <h2>Age: {val.age}</h2>
                    {/* Update */}
                    <div>
                        <input type="text" 
                        placeholder="Change Age" 
                        onChange={(e) => setNewAge(e.target.value)} />
                        <button onClick={() => {updateUserAge(val.id)}} >
                            Update Age</button>    
                    {/* Delete */}
                    <button onClick={() => {deleteUser(val.id)}} >Delete</button>
                    </div>
                </div>
            })}

        </div>
      </div>
    </>
  );
}

export default Users;
