import express from 'express';
import { getGiftCardOrders, getAdminGiftCardOrder, putCardData, removeCardData } from '../database.js';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/", async (req,res) => {
    const data = await getGiftCardOrders()
    res.send(data)
})


router.get("/new", async (req,res) => {
    res.render('GiftCard')
})

router
 .route("/:id") 
 .get(async (req,res) => {
    const id = req.params.id
    const data = await getAdminGiftCardOrder(id)
    res.send(data)
 }).delete(async (req,res) => {
    const id = req.params.id
    const data = await removeCardData(id)
    res.send('Order ' + id + " deleted!")
 }).put(async(req, res) => {
    try {
        const { card_order_id, card_id, card_status_id, payment_method, user_id, receiver_name, receiver_mail, receiver_phone, receiver_address, message } = req.body;
        const order_id = req.params.id;

        await putCardData(card_order_id, card_id, card_status_id, payment_method, user_id, receiver_name, receiver_mail, receiver_phone, receiver_address, message,order_id);
        res.send("Fix order success")
      } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
      }
 })


export default router;