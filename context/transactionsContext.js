import React, { createContext, useContext, useEffect, useState } from 'react';
import { initDatabase,getAlltransactions,insertTransaction } from '../database/db';

const TransactionsContext = createContext();

export const useTransactions = () => useContext(TransactionsContext);

export const TransactionsProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        initDatabase();
        fetchTransaction();
    },[])

    const fetchTransaction = async () => {
        const allTransactions = await getAlltransactions();
        setTransactions(allTransactions);
    };

    const addTransaction = async (_note,_montant,_date,_categorie,_type) => {
        insertTransaction(_note,_montant,_date,_categorie,_type,fetchTransaction);
    }

    return (
        <TransactionsContext.Provider value={{ transactions, addTransaction }}>
          {children}
        </TransactionsContext.Provider>
    );

};