import { BalanceContext } from '../context/BalanceContext';
import { useContext } from 'react';

export const useBalanceContext = () => {
    const context = useContext(BalanceContext)

    if (!context) {
        throw Error('useBalanceContext must be used inside a UserBalanceProvider')
    }
    
    return context
}