import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
}).promise()

//user function
export async function setUserData(name, password, gmail, phone, dob) {
    const query = `INSERT INTO user (user_name, user_password, user_gmail, user_phone, user_dob)
                 VALUES (?, ?, ?, ?, ?)`;
  const values = [name, password, gmail, phone, dob];
  await pool.query(query, values);
}

export async function getUsersData() {
    const [rows] = await pool.query(`Select * From user`)
    return rows
}


export async function getUserData(id) {
    const [rows] = await pool.query(`Select * From user Where user_id = ?`, [id])
    return rows[0]
}

//gift card function
export async function getGiftCardOrders() {
    const [rows] = await pool.query(`Select * From order_giftcard`)
    return rows
}


export async function getUserGiftCardOrder(id) {
    const [rows] = await pool.query(`Select * From order_giftcard Where user_id = ?`, [id])
    return rows[0]
}

export async function getAdminGiftCardOrder(id) {
    const [rows] = await pool.query(`Select * From order_giftcard Where card_order_id = ?`, [id])
    return rows[0]
}

export async function setCardData(card_id, card_status_id, payment_method, user_id, receiver_name, receiver_mail, receiver_phone, receiver_address, message) {
    const query = `INSERT INTO order_giftcard (card_id, card_status_id, payment_method, user_id, receiver_name, receiver_mail, receiver_phone, receiver_address, message)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [card_id, card_status_id, payment_method, user_id, receiver_name, receiver_mail, receiver_phone, receiver_address, message];
  await pool.query(query, values);
}

export async function putCardData(card_order_id, card_id, card_status_id, payment_method, user_id, receiver_name, receiver_mail, receiver_phone, receiver_address, message, order_id) {
    const query =  `
    UPDATE order_giftcard
    SET 
        card_order_id = ?,
        card_id = ?,
        card_status_id = ?,
        payment_method = ?,
        user_id = ?,
        receiver_name = ?,
        receiver_mail = ?,
        receiver_phone = ?,
        receiver_address = ?,
        message = ?
    WHERE card_order_id = ?;
    `;
  const values = [card_order_id, card_id, card_status_id, payment_method, user_id, receiver_name, receiver_mail, receiver_phone, receiver_address, message, order_id];
  await pool.query(query, values);
}

export async function removeCardData(card_id) {
    const query = 'delete from order_giftcard where card_order_id  = ?';
    const values = [card_id];
    await pool.query(query,values);
}

//reservation function


//createUser('nguyen', '1', 'nguyen11040@gmail.com', '098888888')
//const user = await getUserData(3)
//const users = await getUsersData()
//console.log(users)
