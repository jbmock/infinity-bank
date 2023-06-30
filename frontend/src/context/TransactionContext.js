import { createContext, useReducer } from "react";

export const TransactionContext = createContext()
export const transactionReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TRANSACTIONS':
            return {
                transaction: action.payload
            }
        case 'CREATE_TRANSACTION':
            return {
                transaction: [action.payload, state.transaction]
            }
        default:
            return state
    }
}

export const TransactionContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(transactionReducer, {
        transaction: null
    })

    return (
        <TransactionContext.Provider value={{state, dispatch}}>
            {children}
        </TransactionContext.Provider>
    )
}