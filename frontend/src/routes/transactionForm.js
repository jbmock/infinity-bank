import { useState } from "react"
import { useTransactionContext } from '../hooks/useTransactionContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useBalanceContext } from "../hooks/useBalanceContext"
import 'bootstrap/dist/css/bootstrap.css'
import '../styles.css'

const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
    const choice = ['Deposit', 'Withdraw']
    return (
      <label>
        <h3> {choice[Number(!isDeposit)]}</h3>
        <input 
            id="number-input" 
            type="number" 
            width="400" 
            onChange={onChange}>
        </input>
        <input 
            id="submit-input"
            type="submit"   
            disabled={!isValid} 
            width="400" 
            value="Submit">
        </input>
      </label>
    );
  };
  
  export default function TransactionForm() {
    const {dispatch} = useTransactionContext()
    //const {balanceDispatch} = useBalanceContext()
    const {user} = useAuthContext()

    const [balance, setBalance] = useBalanceContext();
    const [isDeposit, setIsDeposit] = useState(true);
    const [amount, setAmount] = useState(0);
    const [transactionType, setTransactionType] = useState('');
    const [validTransaction, setValidTransaction] = useState(false);
    const [error, setError] = useState(null);
  
    let status = `Current Balance $${balance} `
    const handleChange = (event) => {
      if (Number(event.target.value) <= 0) {
        return setValidTransaction(false);
      }
      if (transactionType === 'Withdraw' && Number(event.target.value) > balance) {
        setValidTransaction(false);
      } else {
        setValidTransaction(true);
      }
  
      setAmount(Number(event.target.value));
    };
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      //check that user is logged in
      if (!user) {
        setError('You must be logged in')
        return
      }

      //update balance
      let accountBalance = isDeposit ? balance + amount : balance - amount;
      setBalance(accountBalance);
      setValidTransaction(false);
      setTransactionType(event.target.value);
      localStorage.setItem('accountBalance', accountBalance);
      
      //send new transaction & balance to API
      const transaction = {transactionType, amount}
      //const balance = {accountBalance}

      const response = await fetch('/api/transactions', {
        method: 'POST',
        body: JSON.stringify(transaction),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
      // }, '/api/balance', {
      //   method: 'POST',
      //   body: JSON.stringify(balance),
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization' : `Bearer ${user.token}`
      //   }
      })

      .catch(error => console.error(error));
      const json = await response.json()

      if (!response.ok) {
        setError(json.error)
        console.log({error})
      }
      //reset form
      if (response.ok) {
        setTransactionType('');
        setAmount(0);
        setError(null);
        dispatch({type: 'CREATE_TRANSACTION', payload: json});
        // balanceDispatch({type: 'CREATE_BALANCE', payload: json});
        console.log('Transaction successful and account balance updated', json);
      }

    };
  
    const handleModeSelect = (event) => {
      console.log(event.target.value);
      setTransactionType(event.target.value);
      setValidTransaction(false);
  
        if (event.target.value === 'Deposit') {
          setIsDeposit(true);
      } else {
          setIsDeposit(false);
      }
    };

    return (
      <div className="card">
        <h2 id="total">{status}</h2>
      <form 
      style={{justifyContent: "center",
      textAlign: "center", backgroundColor: "lightblue", maxWidth: "300px", margin: "10px auto",
      borderRadius: "4px", padding: "10px"}} 
      onSubmit={handleSubmit}>

        <>
          
          <label style={{fontStyle: "italic"}}>
            <h5>Select an action below to continue</h5></label><br/><br/>

          <select style={{width: "150px", fontSize: "20px"}} 
          onChange={(e) => handleModeSelect(e)} 
          name="mode" 
          id="mode-select">
          <option id="no-selection" value=""></option>
          
          <option 
            style={{fontSize: "20px"}} 
            id="deposit-selection" 
            value="Deposit">Deposit</option>
          
          <option 
          style={{fontSize: "20px"}}
          id="withdraw-selection" 
          value="Withdraw">Withdraw</option>
          </select><br/><br/>

          {transactionType && (
        <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>
          )}

        </>

        {error && <div className="error">{error}</div>}  

      </form>
    </div>
    );
  };