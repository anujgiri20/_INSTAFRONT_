import { useState } from "react";
import { useHistory } from 'react-router-dom';
import user from "./img/user.png"
export function Adduser({ getData }) {
  const [name, setName] = useState();

  const [pic, setPic] = useState();
  const [bio, setbio] = useState();
  const [email, setemail] = useState();
  const [number, setnumber] = useState();
  const history = useHistory();


  const addUser = () => {
    

    fetch("https://instabackenddata.herokuapp.com/insertToinsta", {
      method: "POST",
      // header reamains same in all update operations
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("access-token")
      },

      body: JSON.stringify({
        name: name,
        pic: pic,
        
      })
    }).then((response) => {
      if (response.status !== 400) {
        getData();
        alert("Add user processing");
      }
      else {

        history.push("/");
        alert("you are not authorize user");
      }

    }).catch((err) => history.push("/"));


    setPic("");
    setName("");
  
  };
  return (
    <>
      <div className="aaddcandid">
        <img width="30%" style={{margin:"auto"}} src={user} />
        <input
        style={{marginTop:"60px"}}
          className="input1"
          value={name}
          onChange={(event) => setName(event.target.value)}

          placeholder="Enter your name" />

        <input
        
          className="input1"
          value={pic}
          onChange={(event) => setPic(event.target.value)}
          placeholder="Enter your pic url" />
      
   

        <button style={{ marginTop: "50px" }} className="btn" onClick={addUser}>
          Add User
        </button>

      </div>

    </>
  );
}
