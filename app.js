import express from 'express'
import userRouter from './routes/users.js';
import giftCardRouter from './routes/giftcard.js'

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended : true}))

app.set("view engine", 'ejs')

app.use('/admin/giftCard', giftCardRouter)
app.use('/users', userRouter)

app.listen(8080, () =>{
    console.log('Server running on port 8080')
})