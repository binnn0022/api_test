import express from 'express'
import {setUserData, getUsersData, getUserData, getGiftCardOrders, getGiftCardOrder} from '../database.js'
const router = express.Router()

router.get("/", async (req,res) => {
    const data = await getUsersData()
    res.send(data)
})

router.get('/new', async (req, res) => {
    res.render('index');  
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

export default router;