import { useState } from "react";


export function Edituser({ username, userpic, userid, getData, setedit }) {
  const [name, setName] = useState(username);


  const [pic, setPic] = useState(userpic);

  const editu = () => {
    alert("Updation Processing");
    setedit(false);
    fetch("https://instabackenddata.herokuapp.com/patchinsta/" + userid, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("access-token")
      },
      body: JSON.stringify({
        name: name,
        pic: pic
      })
    }).then(() => getData());


  };
  return (
    <div className="App">
      <div className="aaddcandid">
        <input
          className="edituserinput"
          value={name}
          onChange={(event) => setName(event.target.value)}

          placeholder="Enter your name" />

        <input
          className="edituserinput"
          value={pic}
          onChange={(event) => setPic(event.target.value)}
          placeholder="Enter your pic url" />
        <button className="editbutton" onClick={editu}>
          Edit User
        </button>
      </div>


    </div>
  );
}
