import express from 'express'
import sequelize from './config/database'
import userModel from './models/userModel'
import productModel from './models/productModel'
import commentModel from './models/commentModel'
 
 const app = express()
 const port = 3000
 
 app.get('/', (req, res) => {
     res.send('Hello, World! :)')
 })
 
 app.get('/users', async (req, res) => {
     const users = await userModel.findAll()
     res.send(users)
 })

 app.get('/comments', async (req, res) => {
    const comments = await commentModel.findAll()
    res.send(comments)
})

app.get('/products', async (req, res) => {
    const products = await productModel.findAll()
    res.send(products)
})
 
 // sync database
 sequelize
     .sync({ alter: true })
     .then(() => {
         console.log('database foi sincronizado com sucesso')
     })
     .catch((error) => {
         console.log('deu zica no bagulho', error)
     })
 
 app.listen(port, () => {
     console.log('Server is running on port ', port)
 })