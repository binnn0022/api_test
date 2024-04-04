import express from 'express'
import {setUserData, getUsersData, getUserData, getGiftCardOrders, getGiftCardOrder} from '../../database.js'
const router = express.Router()

router.get("/", async (req,res) => {
    const data = await getGiftCardOrders()
    res.send(data)
})

router.get("/:id", async (req,res) => {
    const id = req.params.id
    const data = await getGiftCardOrder(id)
    res.send(data)
})

export default router;