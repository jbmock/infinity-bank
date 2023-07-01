import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import 'bootstrap/dist/css/bootstrap.css';

//routes & components
//import ErrorPage from './error-page';
import TransactionForm from './routes/transactionForm';
import CreateAccount from './routes/createaccount';
import Home from './routes/home';
import Login from './routes/login';
import NavBar from './components/navbar';
import Transactions from './routes/transactions';

function App() {
    const {user} = useAuthContext()

    return (
        <BrowserRouter>
        <NavBar/>
            <Routes>
                <Route 
                    path="/" 
                    exact element={<Home/>} 
                />
                <Route 
                    path="/CreateAccount" 
                    element={!user ? <CreateAccount/> : <Navigate to="/" />} 
                />
                <Route 
                    path="/login" 
                    element={!user ? <Login/> : <Navigate to="/" />} 
                />
                <Route 
                    path="/atm" 
                    element={user ? <TransactionForm/> : <Navigate to="/login" />}
                />
                <Route 
                    path="/transactions" 
                    element={user ? <Transactions/> : <Navigate to="/login" />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
