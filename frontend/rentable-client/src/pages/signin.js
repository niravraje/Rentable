import React, { useState } from "react" 
import Signup from './signup'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import GoogleLogin from 'react-google-login'

const case1 = ({username,password}) =>{
    return new Promise((resolve, reject) =>{
    setTimeout(()=>{
        if(Object.is(username,"bilibili") && Object.is(password,"bilibili")){
            resolve()
        }else{
            reject()
        }
    },2000)
    })
}

const responseGoogle = (response) => {
    console.log(response)
    console.log(response.profileObj)
}

const Signin = () => {
    const[username,setUsername] = useState("")
    const[password,setPassword] = useState("")
    const[error,setError] = useState("")
    const[isLoading,setIsLoading] = useState(false)
    const[isLogin, setIsLogin] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()
        setIsLoading(true)
        try{
            await case1({username,password})
            setUsername(username)
            setPassword("")
            setError("")
            setIsLoading(false)
            setIsLogin(true)

            console.log("success")
        }catch(error){
            setUsername("")
            setPassword("")
            setError("Invalid Username or Password")
            setIsLoading(false)
            console.log("failure")
        }
    }

    return (
        <div className="card container mt-S" style={{marginTop:'100px', width: '500px'}}>
            {isLogin ? (
                <>
                {console.log({username})}
                <h1>Welcome to Rentable, {username}!</h1>
                <button onClick={()=>setIsLogin(false)} className="btn btn-dark">Logout</button>
                </>
            ):(
            <div className="card-body">
                <h1 className="card-title"></h1>
                {error && <h1 className="text-danger">{error}</h1>}
                <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                    <GoogleLogin
                        clientId="693247566048-ph5gqf37u78uub3erq5kovg30k0i4rph.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input 
                        type="text" //can be email
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={username}
                        onChange={(e) => setUsername(e.currentTarget.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1"
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                </div>
                <button 
                    disabled={isLoading ? true: false}
                    type="submit" 
                    className="btn btn-dark btn-primary w-100">
                    {isLoading? "Loading..." : "Sign in"}
                </button>
                <div className = "mb-3" style = {{textAlign: "center", marginTop: '25px'}}>
                    <a href="forgotPassword">Forgot my password</a>
                </div>
                </form>
            </div>)}
          </div>
    )
}

export default Signin
