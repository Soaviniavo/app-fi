import * as SQLite from 'expo-sqlite';
import { somme } from '../fonctions/fonctions';

export const getDatabase = async () => {
  return  SQLite.openDatabaseAsync('appFiDatabase.db');
}

export const getAllDepense = async () => {
  const db = await getDatabase();
  const allRows = await db.getAllAsync('SELECT * FROM transactions');
  return allRows ; 
}

export const get_depenseMensuel= async () => {
  const db = await getDatabase();
  const allRows = await db.getAllAsync('SELECT * FROM transactions');
  var T = somme(allRows);
  console.log(T);
  return T;
}



export const insertDepense = async (_note,_montant,_date,_categorie,_type) => {
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