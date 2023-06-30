import { useState } from "react";
import { Link } from 'react-router-dom';
import Card from "../context/CardContext";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
    const [show] = useState(true)
    const [status] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password);
    }

    return (
        <Card onSubmit={handleSubmit}
            title="Login"
            status={status}
            body={show ? (
                
                <>

                Email*<br/>
                <input 
                    type="email" 
                    autoComplete="off" 
                    list="autoCompleteOff" 
                    id="email" 
                    placeholder="Enter Email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} /><br/>

                Password*<br/>
                <input 
                    type="password" 
                    autoComplete="off" 
                    list="autoCompleteOff" 
                    id="password" 
                    placeholder="Enter Password"  
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} /><br/><br/>
                
                <button 
                    disabled={isLoading}
                    style={{borderColor: "black"}}
                    type="submit"
                    onClick={handleSubmit} 
                    className="btn btn-light">Login</button>
                    {error && <div className="error">{error}</div>}
                    <br/><br/>

                <Link to="/CreateAccount">Create new account</Link>
                </>
            ):(
                <>
                <h6>Login Successful!</h6>
                </>
            )}
        />
    )
}