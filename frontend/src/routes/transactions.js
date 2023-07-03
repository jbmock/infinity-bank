import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import TransactionDetails from "../components/transactionDetails";

export default function Transactions() {
    const [transactions, setTransactions] = useState(null)
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchTransactions = async () => {
          const response = await fetch('https://jessica-mock-fullstackbanking-f5b46f56980a.herokuapp.com/api/transactions', {
            //mode: 'no-cors',
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
        })
          const json = await response.json()

          if (response.ok) {
            setTransactions(json)
          }
        }
        if (user) {
        fetchTransactions()
        }

    }, [user])

    return (
        <div>
            {transactions && transactions.map((transaction) => (
                <TransactionDetails key={transaction._id} transaction={transaction} />
            ))}
        </div>
    )
}
