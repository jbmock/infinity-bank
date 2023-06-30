import { useState } from "react";
import { Link } from 'react-router-dom';
import Card from '../context/CardContext';
import { useSignup } from "../hooks/useSignup"

export default function CreateAccount() {
    const [show] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password)
     }

    return (
        <Card onSubmit={handleSubmit}
            title="New to Infinity Bank?"
            bg="lightblue"
            body={show ? (
            
                <>
                
                Email*<br/>
                <input 
                    type="email" 
                    autoComplete="off" 
                    list="autocompleteOff" 
                    id="email" 
                    placeholder="Enter Email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} /><br/>
                        
                Password*<br/>
                <input 
                    type="password" 
                    autoComplete="off" 
                    list="autocompleteOff" 
                    id="password" 
                    placeholder="Enter Password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} /><br/><br/>

                <button 
                    disabled={isLoading} 
                    style={{borderColor: "black"}}
                    type="submit" 
                    onClick={handleSubmit} 
                    className="btn btn-light">Create Account</button>
                    {error && <div className="error">{error}</div>}
                    <br/><br/> 

                <Link to="/login">Already have an account?</Link>
                </>
            ):(
                <>
                <h6>Signup Succssful!</h6>
                </>
            )}
        />
    )
}