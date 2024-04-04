import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
}).promise()

//user get function
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

//gift card get function
export async function getGiftCardOrders() {
    const [rows] = await pool.query(`Select * From order_giftcard`)
    return rows
}


export async function getGiftCardOrder(id) {
    const [rows] = await pool.query(`Select * From order_giftcard Where user_id = ?`, [id])
    return rows[0]
}

//createUser('nguyen', '1', 'nguyen11040@gmail.com', '098888888')
//const user = await getUserData(3)
//const users = await getUsersData()
//console.log(users)