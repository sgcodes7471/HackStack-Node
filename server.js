const bodyParser = require('body-parser');
const express = require('express')
const path = require('path')
const app=express()
const PORT = 5000;

app.set('view engine'  , 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname , 'public')))

const products = []

app.get('/', (req, res)=>{
    res.render('index' , { title:'HOME',products:products})
})

app.post('/add-product' , (req, res)=>{
    const product = {name:req.body.name , quantity:req.body.quantity , unit:req.body.unit , id:Date.now()}
    products.unshift(product)
    console.log(products)
    res.redirect('/')
})

app.delete('/del-product/:productId' , (req, res)=>{
    const productDel = req.params.productId
    products.filter((product)=>{product.id!=productDel})
    res.redirect('/')
})

app.use((req, res)=>{
    res.status(404).render('error')
})

app.listen(PORT , ()=>{
    console.log(`Listening on port ${PORT}`)
})
