import { createContext, useState } from "react";
//import { useEffect } from "react";

export const BalanceContext = createContext(null)
// export const balanceReducer = (state, action) => {
//     switch (action.type) {
//         case 'SET_BALANCE':
//             return {
//                 balance: action.payload
//             }
//         case 'CREATE_BALANCE':
//             return {
//                 balance: [action.payload, state.balance]
//             }
//         default:
//             return state
//     }
// }

export const BalanceContextProvider = ({children}) => {
    const [balance, setBalance] = useState(0);

    // useEffect(() => {
    //     const accountBalance = JSON.parse(localStorage.getItem('accountBalance'))

    //     if (accountBalance) {
    //         dispatch({type: 'LOGIN', payload: accountBalance})
    //     }
    // }, [])

    console.log('BalanceContext state: ', balance)

    return (
        <BalanceContext.Provider value={[balance, setBalance]}>
            {children}
        </BalanceContext.Provider>
    )
}