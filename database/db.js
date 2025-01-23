import * as SQLite from "expo-sqlite";

export const getDatabase = async () => {
  return SQLite.openDatabaseAsync("appFiDatabase.db");
};

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
      CREATE TABLE IF NOT EXISTS budget( 
      id_budget INTEGER PRIMARY KEY NOT NULL,
      montantBudget VARCHAR(50)
      ); 
  `);
  } catch (error) {
    console.log(error)
    throw error;
  } finally {
    console.log("database init !");
  }
};

export const insertBudget = async () => {
  const db = await getDatabase();
  const statement = await db.prepareAsync(
    "INSERT INTO budget (montantBudget) VALUES (?)"
  );
  try {
    const defaultBudget = 100000 ; 
    await statement.executeAsync([defaultBudget]); 
    await statement.finalizeAsync();
  } catch (error) {
    console.log(error)

    throw error
  }
}

export const getBudgetMensuel = async () => {
  const db = await getDatabase();
  try {
    var Budget = await db.getAllAsync("SELECT montantBudget FROM budget ");
  } catch (error) {
    console.log(error);
  }
  return Budget;
};

export const updateBudgetMens = async (value) => {
  const db = await getDatabase();
  try {
    await db.runAsync("UPDATE budget SET  montantBudget= $montantBudget ", {
      $montantBudget: value,
    });
  } catch (error) {
    throw error;
  }
};

export const getTransactionsMensuelle = async (annee_mois) => {
  const db = await getDatabase();
  console.log('3');
  
  try {
    var allRows = await db.getAllAsync(
      "SELECT * FROM transactions WHERE  date LIKE $val ORDER BY  id_trans   DESC ",
      { $val: annee_mois }
    );
  } catch (error) {
     console.log(error);
  }  
  return allRows;
};

export const get_depenseMensuelle = async (annee_mois) => {
  const db = await getDatabase();
  console.log('1');

  try {
    var allRows = await db.getAllAsync(
      'SELECT * FROM transactions WHERE type = "dépense" AND date LIKE $val ORDER BY  id_trans  DESC ',
      { $val: annee_mois }
    );
  } catch (error) {
    console.log(error);
  }
  return allRows;
};

export const get_revenuMensuel = async (annee_mois) => {
  const db = await getDatabase();

  try {
    console.log('2');
    var allRows = await db.getAllAsync(
      'SELECT * FROM transactions WHERE type = "revenu" AND  date LIKE $val ORDER BY  id_trans  DESC',
      { $val: annee_mois }
    );
  } catch (error) {
    console.log(error);
  }

  return allRows;
};

export const gettransactionsAnnuelle = async (annee) => {
  const db = await getDatabase();
  try {
    const allRows = await db.getAllAsync(
      "SELECT * FROM transactions WHERE date LIKE $val ORDER BY  id_trans  DESC",
      { $val: annee }
    );
  } catch (error) {
    console.log(error);
  }

  return allRows;
};

export const get_depenseAnnuelle = async (annee) => {
  const db = await getDatabase();
  try {
    var allRows = await db.getAllAsync(
      'SELECT * FROM transactions WHERE type = "dépense" AND date LIKE $val ORDER BY  id_trans  DESC',
      { $val: annee }
    );
  } catch (error) {
    console.log(error);
  }
  
  return allRows;
};

export const get_revenuAnnuel = async (annee) => {
  const db = await getDatabase();
  try {
    var allRows = await db.getAllAsync(
      'SELECT * FROM transactions WHERE type = "revenu" AND date LIKE $val ORDER BY  id_trans  DESC',
      { $val: annee }
    );
  } catch (error) {
    console.log(error);
  }
  
  return allRows;
};

export const insertTransaction = async (
  _note,
  _montant,
  _date,
  _categorie,
  _type,
  callback,
  callback_params
) => {
  const db = await getDatabase();
  const statement = await db.prepareAsync(
    "INSERT INTO transactions (note,montant,date,categorie,type) VALUES (?,?,?,?,?)"
  );
  try {
    await statement.executeAsync([_note, _montant, _date, _categorie, _type]);
  } catch {
    throw error;
  } finally {
    await statement.finalizeAsync();
    callback(callback_params);
  }
};

export const deleteAll = async () => {
  const db = await getDatabase();
  try {
    await db.runAsync("DELETE FROM budget");
  } catch (error) {
    console.log(error);
  }
};

export const deleteOneTransaction = async (
  _id_trans,
  callback,
  callback_params
) => {
  const db = await getDatabase();
  try {
    await db.runAsync("DELETE FROM transactions WHERE id_trans = $id_trans", {
      $id_trans: _id_trans,
    });
  } catch (error) {
    throw error;
  } finally {
    callback(callback_params);
  }
};

export const modifyOneTransaction = async (
  _id_trans,
  _note,
  _montant,
  _date,
  callback,
  callback_params
) => {
  const db = await getDatabase();
  try {
    await db.runAsync(
      "UPDATE transactions SET  note = $note, montant = $montant, date = $date  WHERE id_trans = $id_trans ",
      { $note: _note, $montant: _montant, $date: _date, $id_trans: _id_trans }
    );
  } catch (error) {
    throw error;
  } finally {
    callback(callback_params);
  }
};
