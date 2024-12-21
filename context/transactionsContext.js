import React, { createContext, useContext, useEffect, useState } from 'react';
import { initDatabase,getAlltransactions,insertTransaction,get_depenseMensuel,get_revenuMensuel,deleteOneTransaction,modifyOneTransaction } from '../database/db';
import { somme } from '../fonctions/fonctions';


const TransactionsContext = createContext();

export const useTransactions = () => useContext(TransactionsContext);

export const TransactionsProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [SommeDepMensuel,setSommeDepMensuel] = useState(0);
    const [SommeRevMensuel,setSommeRevMensuel] = useState(0);

    useEffect(() => {
        initDatabase();
        fetchTransaction();
        TotalDep_Rev();
    },[])

    const TotalDep_Rev = async () => {
        const depenseMensuel = await get_depenseMensuel();
        const revenuMensuel = await get_revenuMensuel();
        setSommeDepMensuel(somme(depenseMensuel));
        setSommeRevMensuel(somme(revenuMensuel));
    }

    const fetchTransaction = async () => {
        const allTransactions = await getAlltransactions();
        setTransactions(allTransactions);
        TotalDep_Rev();
    };

    const addTransaction = async (_note,_montant,_date,_categorie,_type) => {
        insertTransaction(_note,_montant,_date,_categorie,_type,fetchTransaction);
    }

    const removeTransaction = async (_id) => {
        deleteOneTransaction(_id,fetchTransaction);
    }

    const updateTransaction = async (_id_trans,_note,_montant,_date) => {
        modifyOneTransaction(_id_trans,_note,_montant,_date,fetchTransaction);
    }

    return (
        <TransactionsContext.Provider value={{ transactions, addTransaction,SommeDepMensuel,SommeRevMensuel,removeTransaction,updateTransaction }}>
          {children}
        </TransactionsContext.Provider>
    );

};