import { useState } from "react";
import { useHistory } from 'react-router-dom';
import love from "./img/love.png";
import { Edituser } from "./Edituser";

export function User({key, username, userpic,bio, email,number, userid, getData1 }) {
  const history = useHistory();
  const [pro, setpro] = useState(false);
  const deletUser = () => {
    fetch("https://instabackenddata.herokuapp.com/deleteFrominsta/" + userid,
      {
        method: "DELETE",
        headers: { "access-token": localStorage.getItem("access-token") }
      }).then((response) => {
        if (response.status !== 400) {
          getData1();
          alert("User delete succesfull");
        }
        else {
          alert("you are not authorize user");
          history.push("/");
        }

      }).catch((err) => history.push("/"));

  };
  const [edit, setedit] = useState(false);
  const [like, setlike] = useState(Math.round(Math.random() * 200));
  function unlike() {
    if (like > 0) {
      setlike(like - 1);
    }
  }
  function profile() {
    setpro(!pro);
  }
 

  return (
    <>
      <div className='main_container'>

        <div style={{ marginBottom: "0px", marginTop: "30px" }} className="container">

          <img className="img" height="120" width="120" src={userpic} alt={username} />
          <div className="namediv">
            <h1 style={{ fontFamily: "sans-serif" }} className="name" style={{ marginBottom: "0px", textAlign: "center" }}>{username} </h1>
            <h1 style={{ fontFamily: "sans-serif" }} className="name" style={{ marginBottom: "0px", textAlign: "center" }}>{email} </h1>
            <h3 className='likespan' style={{ fontSize: "1.5rem", marginTop: "5px", marginBottom: "5px" }}><img style={{ width: "15px" }} src={love} /> {like}</h3>
            <button style={{ marginRight: "5px", marginBottom: "10px" }} className='btn' onClick={() => setlike(like + 1)}>Like</button>
            <button style={{ marginRight: "5px", marginBottom: "10px" }} className='btn' onClick={unlike}>Dislike</button>

            <> <button style={{ marginRight: "5px", marginBottom: "10px" }} className="btn" onClick={deletUser}>Delete user</button>

              <button style={{ marginRight: "5px", marginBottom: "10px", marginRight: "0px" }} className="btn" onClick={() => setedit(!edit)}>{edit ? "cansel " : ""}Edit</button>
            </>



          </div>
        </div>
        {edit ? <Edituser username={username} userpic={userpic} userid={userid} getData={getData1}
          setedit={setedit} /> : ""}

      </div>

    </>
  );
}
