// import { openDB } from "idb";

// const DB_NAME = "pwa-db";
// const STORE_NAME = "auth";

// export const dbPromise = openDB(DB_NAME, 1, {
//   upgrade(db) {
//     db.createObjectStore(STORE_NAME);
//   },
// });

// export async function setToken(token: string) {
//   const db = await dbPromise;
//   await db.put(STORE_NAME, token, "authToken");
// }

// export async function getToken() {
//   const db = await dbPromise;
//   return await db.get(STORE_NAME, "authToken");
// }

// export async function removeToken() {
//   const db = await dbPromise;
//   await db.delete(STORE_NAME, "authToken");
// }
