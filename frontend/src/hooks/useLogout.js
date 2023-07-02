import { useAuthContext } from "./useAuthContext"
import { useTransactionContext } from "./useTransactionContext"
//import { useBalanceContext } from "./useBalanceContext"

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: transactionDispatch} = useTransactionContext()
    // const {dispatch: balanceDispatch} = useBalanceContext()

    const logout = () => {
        // remove user from local storage
        localStorage.removeItem('user')
        //localStorage.removeItem('accountBalance')

        //dispatch logout action (reset transactions)
        dispatch({type: 'LOGOUT'})
        transactionDispatch({type: 'SET_TRANSACTIONS', payload: null})

        //dispatch logout action (reset balance)
        // dispatch({type: 'LOGOUT'})
        // balanceDispatch({type: 'SET_BALANCE', payload: null})
    }

    return {logout}
}