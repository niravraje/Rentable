import React, { useState } from "react" 
import { FaBorderNone } from "react-icons/fa"

const case1 = ({username,password,confirmPassword,email}) =>{
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            if(Object.is(password,confirmPassword) && password.length > 8){
                resolve()
            }else{
                reject()
            }
        },1000)
    })
}

const Signup = () => {
    const[username,setUsername] = useState("")
    const[password,setPassword] = useState("")
    const[confirmPassword,setConfirmPassword] = useState("")
    const[email,setEmail] = useState("")
    const[error,setError] = useState("")
    const[isLoading,setIsLoading] = useState(false)
    const[isLogin, setIsLogin] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()
        setIsLoading(true)
        try{
            await case1({username,password,confirmPassword,email})
            setUsername(username)
            setPassword(password)
            setEmail(email)
            setError("")
            setIsLoading(false)
            setIsLogin(true)
            console.log("success")

        }catch(error){
            setUsername("")
            setPassword("")
            setConfirmPassword("")
            setEmail("")
            setError("Passwords do not match or your password is less than 9 characters.")
            setIsLoading(false)
            console.log("failure")
        }
    }

    return (
        <div className="card container mt-S" style={{marginTop:'100px', width: '500px', border: FaBorderNone}}>
            {isLogin ? (
                <>
                {console.log({username})}
                <div className="mb-3" style = {{border: FaBorderNone}}>
                    <h1>Sign Up successfully!</h1>
                </div>
                </>
            ):(
            <div className="card-body">
                <h1 className="card-title"></h1>
                {error && <h1 className="text-danger" style={{fontsize: '100px'}}>{error}</h1>}
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="InputUsername" className="form-label">Username</label>
                    <input 
                    type="text" 
                    className="form-control"
                    id="InputUsername"
                    aria-describedby="emailHelp"
                    value={username}
                    onChange={(e) => setUsername(e.currentTarget.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputPassword1" className="form-label">Password</label>
                    <input 
                    type="password" 
                    className="form-control" 
                    id="InputPassword1"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputPassword2" className="form-label">Confirm Password</label>
                    <input 
                    type="password" 
                    className="form-control" 
                    id="InputPassword2"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Inputemail" className="form-label">Email</label>
                    <input 
                    type="email" 
                    className="form-control" 
                    id="Inputemail"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                </div>
                <button 
                    disabled={isLoading ? true: false}
                    type="submit" 
                    className="btn btn-dark btn-primary w-100">
                    {isLoading? "Loading..." : "Register"}
                </button>
                </form>
            </div>)}
          </div>
    )
}

export default Signup