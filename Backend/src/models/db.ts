import { createPool } from 'mysql2/promise'
import dotenv from 'dotenv'
import pc from 'picocolors'

dotenv.config()

export const pool = createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

const connection = async () => {
  try {
    const conn = await pool.getConnection()
    console.log(pc.blue('[+] Connected to the database'))
    conn.release()
  } catch (error) {
    console.log(pc.red('[-] Error connecting to the database:'), error)
  }
}
connection()