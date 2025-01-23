import React, { createContext, useContext, useEffect, useState } from "react";
import {
  initDatabase,
  getTransactionsMensuelle,
  updateBudgetMens,
  getBudgetMensuel,
  insertTransaction,
  get_depenseMensuelle,
  get_revenuMensuel,
  deleteOneTransaction,
  modifyOneTransaction,
  get_depenseAnnuelle,
  get_revenuAnnuel,
  insertBudget,
} from "../database/db";
import { somme } from "../fonctions/fonctions";

const today = new Date();
const annee = today.getFullYear();
const mois = today.getMonth() + 1;
//const annee = 2024;
//const mois = 12;
const year_month = `${annee}-${mois}-%`;
const year = `${annee}-%`; 

const TransactionsContext = createContext();

export const useTransactions = () => useContext(TransactionsContext);

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [Filtransactions, setFilTransactions] = useState([]);

  const [SommeDepMensuelle, setSommeDepMensuelle] = useState(0);
  const [SommeRevMensuel, setSommeRevMensuel] = useState(0);

  const [SommeDepMen_TransList, setSommeDepMen_TransList] = useState(0);
  const [SommeRevMens_TransList, setSommeRevMens_TransList] = useState(0);

  const [SommeDepAnnuelle, setSommeDepAnnuelle] = useState(0);
  const [SommeRevAnnuel, setSommeRevAnnuel] = useState(0);
  const [budgetMensuel, setbudgetMensuel] = useState(70000);

  const [depensesMensuelle, setDepensesMensuelle] = useState(0);
  const [revenusMensuel, setRevenusMensuel] = useState(0);




  useEffect(() => {
    initDatabase();
    fetchTransaction(year_month);
    TotalDep_Rev();
    BudgetMensuel();
    Data_Portefeuille_Stats(year_month);
  }, []);
  
  const fetchTransaction = async (Y_M) => {
    console.log('Fetch Transaction' + Y_M);
    const allTransactions = await getTransactionsMensuelle(Y_M);
    setTransactions(allTransactions);
    TotalDep_Rev(Y_M);
    console.log("Total De");
  };

  //filter Transaction
 /* const FiltreTrans = async (Y_M) => {
    console.log('Filtre Transaction' + Y_M);
    
    try{
      const FildepenseMensuelle = await get_depenseMensuelle(Y_M);
      const FilrevenuMensuel = await get_revenuMensuel(Y_M);
      const Filtrans= await getTransactionsMensuelle(Y_M); 
      setSommeDepMen_TransList(somme(FildepenseMensuelle));
      setSommeRevMens_TransList(somme(FilrevenuMensuel));   
      setFilTransactions(Filtrans);
      console.log(Filtrans+" transa pro");

      
    }catch(error){
      console.log(error);
    }finally{
      
    }
  }*/

  const TotalDep_Rev = async (Y_M) => {
    const depenseMensuelle = await get_depenseMensuelle(Y_M);
    const revenuMensuel = await get_revenuMensuel(Y_M);
    setSommeDepMen_TransList(somme(depenseMensuelle));
    setSommeRevMens_TransList(somme(revenuMensuel));
    console.log("T");
  };

  const Data_Portefeuille_Stats = async (Y_M) => {
    const depenseMensuelle = await get_depenseMensuelle(Y_M);
    const revenuMensuel = await get_revenuMensuel(Y_M);
    const depenseAnnuelle = await get_depenseAnnuelle(year);
    const revenuAnnuel = await get_revenuAnnuel(year);
    setDepensesMensuelle(depenseMensuelle);
    setRevenusMensuel(revenuMensuel);
    setSommeDepMensuelle(somme(depenseMensuelle));
    setSommeRevMensuel(somme(revenuMensuel));
    setSommeDepAnnuelle(somme(depenseAnnuelle));
    setSommeRevAnnuel(somme(revenuAnnuel));
  }

  const BudgetMensuel = async () => {
    const Bdg = await getBudgetMensuel();
    if(Bdg.length <= 0){
        insertBudget();
        const Bdg = await getBudgetMensuel();
        setbudgetMensuel(Bdg[0].montantBudget);
    }else{
        setbudgetMensuel(Bdg[0].montantBudget);
    }
  };
  const updateBdg = async (_value) => {
    updateBudgetMens(_value);
  };

  const addTransaction = async (_note, _montant, _date, _categorie, _type) => {
    insertTransaction(
      _note,
      _montant,
      _date,
      _categorie,
      _type,
      fetchTransaction,
      year_month
    );
  };

  const removeTransaction = async (_id) => {
    deleteOneTransaction(_id, fetchTransaction,year_month);
  };

  const updateTransaction = async (_id_trans, _note, _montant, _date) => {
    modifyOneTransaction(_id_trans, _note, _montant, _date, fetchTransaction,year_month);
  };

  return (
    <TransactionsContext.Provider
      value={{
        updateBdg,
        budgetMensuel,
        setbudgetMensuel,
        transactions,
        addTransaction,
        SommeDepMensuelle,
        SommeRevMensuel,
        SommeDepAnnuelle,
        SommeRevAnnuel,
        removeTransaction,
        updateTransaction,
        annee,
        mois,
        year_month,
        fetchTransaction,
        depensesMensuelle,
        revenusMensuel,
        SommeDepMen_TransList,
        SommeRevMens_TransList,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
