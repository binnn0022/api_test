import express from 'express'
import {setUserData, getUsersData, getUserData,setCardData,getUserGiftCardOrder} from '../database.js'
const router = express.Router()

router.get("/", async (req,res) => {
    const data = await getUsersData()
    res.send(data)
})

router.get('/new', async (req, res) => {
    res.render('signUp');  
  })

router.post('/register', async (req, res) => {
    try {
      const name = req.body.name;
      const password = req.body.password;
      const gmail = req.body.email;
      const phone = req.body.phone;
      const dob = req.body.dob;
  
      await setUserData(name, password, gmail, phone, dob);
      res.send('Register Success');
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    }
  });

  router.get("/:id", async (req,res) => {
    const id = req.params.id
    const data = await getUserData(id)
    res.send(data)
  })

router.get("/:id/giftcard", async(req, res) => {
  const id = req.params.id;
  const data = await getUserGiftCardOrder(id)
  res.send(data)
})

router.get("/:id/giftcard/new", async (req, res) => {
    const id = req.params.id;
    res.render("order-giftcard", { id: id });
  });

router.post("/:id/giftcard/order", async (req,res) => {
    try {
        let card_id = req.body.giftCardAmount;
        const card_status_id = 2;
        const payment_method = req.body.paymentMethod;
        const user_id = req.params.id;
        const receiver_name = req.body.recipientName;
        const receiver_mail = req.body.recipientEmail;
        const receiver_phone = req.body.recipientPhone;
        const receiver_address = req.body.address;
        const receiver_message = req.body.message;
        
        if (card_id == '10') {
            card_id = 1
        }

        if (card_id == '20') {
            card_id = 2
        }

        if (card_id == '50') {
            card_id = 3
        }
        
        await setCardData(card_id, card_status_id, payment_method, user_id, receiver_name, receiver_mail, receiver_phone, receiver_address, receiver_message);
        res.send("Order success")
      } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
      }
})

export default router;