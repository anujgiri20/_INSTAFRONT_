import React from "react";
import "./login.css"
import { useState } from "react"
import Axios from "axios";
import { useHistory } from "react-router-dom";
import "./index.css"

function Loginuser() {
    const [login, register] = useState(true)
    // register
    const [usernameReg, setusernmaeReg] = useState("")
    const [passwordReg, setpasswordReg] = useState("")
    const [nameReg, setnameReg] = useState("")
    const [emailReg, setemailReg] = useState("")
    const history = useHistory()

    const addUser = () => {

        Axios.post("https://instabackenddata.herokuapp.com/register", {
            name: nameReg,
            email: emailReg,
            username: usernameReg,
            password: passwordReg
        }).then((response) => {
      
            alert(response.data)
        })

        setnameReg("")
        setemailReg("")
        setusernmaeReg("")
        setpasswordReg("")


    }



    // login

    const [usernamelog, setusernmaelog] = useState("")
    const [passwordlog, setpasswordlog] = useState("")
    const login_ = () => {
        try {
            Axios.post("https://instabackenddata.herokuapp.com/login", {

                username: usernamelog,
                password: passwordlog
            }).then((response) => {

                if ((response.data.messege) === 'valid logged in') {
                    console.log(response)
                    localStorage.setItem("access-token", response.data.token)
                     localStorage.setItem("name",response.data.result.username)
                 
                    alert("login Succesfull")


                    history.push("/personalprofile")
                   


                }
                else {
                    var msg_login = response.data
                    alert(msg_login)
                }
            }).catch((Err)=> alert("user not registered"))
        } catch (err) {
            console.log(err)
        }
    }







    return (
        <>
         <h1 className="title">Insta Profiles</h1>
            {login ?
                <div className="loginForm">
                   
                    <input
                    
                        className="inputlogin"
                        placeholder="username"
                        value={usernamelog}
                        onChange={(e) => {

                            setusernmaelog(e.target.value)
                        }}
                    />
                    <br />
                    <input
                        className="inputlogin"
                        placeholder="password"
                        type="password"
                        value={passwordlog}
                        onChange={(e) => {

                            setpasswordlog(e.target.value)
                        }}
                    />
                    <br />
                    <button
                        style={{
                            width: "50%",
                            marginLeft:"25%"

                        }}
                        onClick={login_}
                        className="btn">Login</button>
                    <br />

                    <p>Not have account yet</p>

                    <button style={{
                     width: "50%",
                     marginLeft:"25%"
                    }} className="btn" onClick={() => register(!login)}>register</button>
                </div>
                :
                <div className="loginForm">
                    <input
                        className="inputlogin"
                        placeholder="Name"
                        value={nameReg}

                        onChange={(e) => {

                            setnameReg(e.target.value)
                        }}
                    />

                    <input
                        className="inputlogin"
                        placeholder="Email"
                        value={emailReg}
                        onChange={(e) => {

                            setemailReg(e.target.value)
                        }}
                    />

                    <input
                        value={usernameReg}
                        onChange={(e) => {

                            setusernmaeReg(e.target.value)
                        }}
                        className="inputlogin"
                        placeholder="Username"
                    />

                    <br />

                    <input
                        type="password"
                        value={passwordReg}
                        onChange={(e) => {

                            setpasswordReg(e.target.value)
                        }}

                        className="inputlogin"
                        placeholder="Password"
                    />

                    <br />

                    <button
                        style={{
                            width: "50%",
                            marginLeft:"25%"
                        }}
                        onClick={addUser}
                        className="btn">register</button>
                    <br />

                    <p>Have account</p>

                    <button
                        style={{
                            width: "50%",
                            marginLeft:"25%"

                        }}
                        className="btn" onClick={() => register(!login)}>Login</button>

                </div>
            }
        </>
    )
}

export default Loginuser;