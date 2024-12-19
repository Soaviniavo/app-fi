import * as SQLite from 'expo-sqlite';
import { somme } from '../fonctions/fonctions';

export const getDatabase = async () => {
  return  SQLite.openDatabaseAsync('appFiDatabase.db');
}

export const initDatabase = async () => {
  const db = await getDatabase();
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;   
      CREATE TABLE IF NOT EXISTS transactions( 
        id_trans INTEGER PRIMARY KEY NOT NULL,
        note VARCHAR(100),
        montant VARCHAR(50),  
        date DATE,
        categorie VARCHAR(50),
        type VARCHAR(20) 
      ); 
  `); 
  } catch (error) {
    console.error(error); 
  }finally{
    console.log("database created !");
  }
}



export const getAlltransactions = async () => {
  const db = await getDatabase();
  const allRows = await db.getAllAsync("SELECT * FROM transactions ORDER BY strftime('%d', date) DESC");
  return allRows ; 
}

export const get_depenseMensuel= async () => {
  const db = await getDatabase();
  const allRows = await db.getAllAsync('SELECT * FROM transactions WHERE type = "dépense"  ');
  return allRows;
}

export const get_revenuMensuel= async () => {
  const db = await getDatabase();
  const allRows = await db.getAllAsync('SELECT * FROM transactions WHERE type = "revenu" ');
  return allRows;
}



export const insertTransaction = async (_note,_montant,_date,_categorie,_type,callback) => {
  const db = await getDatabase();
  const statement = await db.prepareAsync(
    "INSERT INTO transactions (note,montant,date,categorie,type) VALUES (?,?,?,?,?)"
  );
  try{
    await statement.executeAsync([_note,_montant,_date,_categorie,_type]);
  } finally{
    await statement.finalizeAsync();
    callback();
  }
}

export const deleteAll = async () => {
   const db = await getDatabase();
   await db.runAsync(
    'DELETE FROM transactions'
   );
}

export const deleteOneTransaction = async (_id_trans) => {
  const db = await getDatabase();
  await db.runAsync(
    'DELETE FROM transactions WHERE id_trans = $id_trans',{$id_trans: _id_trans}
  );
}

export const modifyOneTransaction = async (_id_trans,_note,_montant,_date) => {
  const db = await getDatabase();
  await db.runAsync(
    'UPDATE transactions SET  note = $note, montant = $montant, date = $date  WHERE id_trans = $id_trans ',{$note: _note ,$montant : _montant,$date: _date, $id_trans : _id_trans}
  );
}