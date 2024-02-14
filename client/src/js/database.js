import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('Database already exists.');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('Database created.');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to database');

const contactDb = await openDB('jate', 1);

const tx = contactDb.transaction('jate', 'readwrite');

const store = tx.objectStore('jate');

const request = store.put({id: 1, value: content});

const result = await request;
console.log('Data saved to database!', result)
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from database');


const contactDbGET = await openDB('jate', 1);

const txPriv = contactDbGET.transaction('jate', 'readonly');

const storeGET = txPriv.objectStore('jate');

const requestGET = storeGET.getAll();

const resultGET = await requestGET;
console.log('result.value', resultGET);
return resultGET?.value;
}

initdb();
