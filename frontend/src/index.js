import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';

//import context providers
import { TransactionContextProvider } from './context/TransactionContext';
import { AuthContextProvider } from './context/AuthContext';
import { BalanceContextProvider } from './context/BalanceContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <BalanceContextProvider>
            <TransactionContextProvider>
                <App />
            </TransactionContextProvider>
        </BalanceContextProvider>
    </AuthContextProvider>
);