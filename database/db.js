import * as SQLite from 'expo-sqlite';
import { somme } from '../fonctions/fonctions';

export const getDatabase = async () => {
  return  SQLite.openDatabaseAsync('appFiDatabase.db');
}

export const getAlltransactions = async () => {
  const db = await getDatabase();
  const allRows = await db.getAllAsync('SELECT * FROM transactions ORDER BY date DESC');
  return allRows ; 
}

export const get_depenseMensuel= async () => {
  const db = await getDatabase();
  const allRows = await db.getAllAsync('SELECT * FROM transactions WHERE type = "dépense" ');
  return allRows;
}

export const get_revenuMensuel= async () => {
  const db = await getDatabase();
  const allRows = await db.getAllAsync('SELECT * FROM transactions WHERE type = "revenu" ');
  return allRows;
}



export const insertTransaction = async (_note,_montant,_date,_categorie,_type) => {
  const db = await getDatabase();
  console.log(_note,_montant,_date,_categorie,_type);
  const statement = await db.prepareAsync(
    'INSERT INTO transactions (note,montant,date,categorie,type) VALUES (?,?,?,?,?)'
  );
  await statement.executeAsync([_note,_montant,_date,_categorie,_type]);
}

export const deleteAllDepenses = async () => {
   const db = await getDatabase();
   await db.runAsync(
    'DELETE FROM transactions'
   );
}