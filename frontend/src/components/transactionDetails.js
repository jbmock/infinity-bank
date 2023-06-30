import 'bootstrap/dist/css/bootstrap.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
// import { useBalanceContext } from '../hooks/useBalanceContext';
//import { useAuthContext } from '../hooks/useAuthContext';

const TransactionDetails = ({transaction}) => {
  //const {user} = useAuthContext()
  // const {balance} = useBalanceContext()
    return (
        <table className="table table-info table-striped">
  <thead>
    <tr>
      <th scope="col">Transaction ID</th>
      <th scope="col">Transaction Type</th>
      <th scope="col">Transaction Amount in $</th>
      {/* <th scope="col">Account Balance</th> */}
      <th scope="col">Transaction Date & Time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{transaction._id}</td>
      <td>{transaction.transactionType}</td>
      <td>{transaction.amount}</td>
      {/* <td>{balance}</td> */}
      <td>{formatDistanceToNow(new Date(transaction.createdAt), { addSuffix: true })}</td>
    </tr>
  </tbody>
</table>
    )
}

export default TransactionDetails