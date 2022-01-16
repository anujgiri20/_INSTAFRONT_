import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import Axios from "axios"
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import like_ from "./img/likelike.png"
import dislike from "./img/dislike.png"
import Loginuser from './loginform';
import Profile from './Auth';
import { useHistory } from 'react-router-dom';
import NewFile from "./newfile"
import { Adduser } from './Adduser';
import { User } from './User';
import burger from "./img/burger.png"
export default function Main() {
  const history = useHistory()
  function logout() {
    localStorage.removeItem("access-token")
    history.push("/")
  }
  return (
    <>
      <div>
        <Link to="/" />
       
        
      </div>
      <div>

        <Switch>
          <Route exact path="/">
            <Loginuser />
          </Route>



          <Route  path="/personalprofile">
            <Router>
              <App logout={logout} />
            </Router>

          </Route>
         



        </Switch>
      </div>
    </>
  )
}



function App({ logout }) {

  const history = useHistory()



  const [users, setUsers] = useState([

  ]);

  const getData = () => {
    try {
      Axios.get("https://instabackenddata.herokuapp.com/getFrominsta", {
        headers: {
          "access-token": localStorage.getItem("access-token")
        }
      }).then((response) => {
        if (response.status == 200) {
          console.log(response)

          setUsers(response.data)


        }
        else {
          history.push("/")
          alert("user is not authenticated")


        }
      }).catch((err) => history.push("/"))
    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    getData()
  }, [])


  const [nav, setnav] = useState(true)


  return (
    <>


    
     <div className='mainlink'>
          <span style={{color:"white", textAlign: "center" }}  className='link'>{localStorage.getItem("name")}</span> 
          <Link style={{ textAlign: "center" }} className='link' to="/personalprofile">Profiles</Link>


          <Link style={{ textAlign: "center" }} className='link' to="/adduser">Adduser</Link>

          <button style={{ background: "transparent", border: "0px", fontSzie: "1.3rem" }} className='btn_link' onClick={logout}>Logout</button>
        
        </div>


      <div className="App">



        <div>


          <Switch>

            <Route exact path="/personalprofile">
              <div
                className='mainprofiledivs'
              >
                {users.map((ur) => (
                  <User key={ur._id} username={ur.name} userpic={ur.pic} userid={ur._id} getData1={getData} />
                ))}
              </div>
            </Route>

            <Route exact path="/adduser">
              <Adduser getData={getData} />
            </Route>
            <Route exact path="/user">
              {users.map((ur) => (
                <User key={ur._id} username={ur.name} userpic={ur.pic} bio={ur.bio} email={ur.email} number={ur.number} userid={ur._id} getData1={getData} />
              ))}
            </Route>



          </Switch>
        </div>
      </div>
    </>
  );

}




