import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../images/bank_logo_nav.png';

export default function NavBar() {
    const {logout} = useLogout()
    const {user} = useAuthContext()
    const handleClick = () => {
        logout()
    }

    return (

<nav className="navbar navbar-expand-lg bg-body-tertiary navbar-light bg-light">
    <div className="container-fluid">
        <Link className="navbar-brand" to="/">
        <img src={logo} alt="Logo" width="35" height="35" className="d-inline-block align-text-top"/>Infinity Bank
        </Link>
        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"> */}
        {/* <span className="navbar-toggler-icon"></span> */}
        {/* </button> */}
        {/* <div className="collapse navbar-collapse" id="navbarNavAltMarkup"> */}
            <div className="main-nav">
                <div className="navbar-nav">
                    <Link className="nav-link" to="/atm">ATM
                    <p>Make deposits & withdraws + view my current balance</p></Link>
                    <Link className="nav-link" to="/transactions">Transaction History
                    <p>View my transaction history</p></Link>
                </div>
            </div>
            <div className="nav-right">
                <div className="navbar-nav">
                    {user && (
                        <div className="greeting">
                            <span>Welcome, {user.email}!</span>
                            <button className="logout-button" onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <Link className="nav-link" to="/CreateAccount">Create Account
                                <p>Create a new account</p></Link>
                                <Link className="nav-link" to="/login">Login
                                <p>Sign in to my account</p></Link>
                        </div>
                    )}
                </div>
            </div>
            </div>
    {/* </div> */}
</nav>
)}