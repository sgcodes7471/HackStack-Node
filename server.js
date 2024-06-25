const bodyParser = require('body-parser');
const express = require('express')
const path = require('path')
const app=express()
const PORT = 5000;

app.set('view engine'  , 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname , 'public')))

let products = []

app.get('/', (req, res)=>{
    console.log(products)
    res.render('index' , { title:'HOME',products:products})
})


app.post('/add-product' , (req, res)=>{
    const product = {name:req.body.name , quantity:parseInt(req.body.quantity , 10) , unit:req.body.unit , id:Date.now()}
    let alreadyExist=false
    products.map(item => {
        if(product.name === item.name && product.unit === item.unit){
            alreadyExist=true
            item.quantity+=parseInt(product.quantity , 10)
        }
    })
    if(!alreadyExist)  
        products.unshift(product)
    res.redirect('/')
})


app.delete('/del-product/:productId' , (req, res)=>{
    const productDel = parseInt(req.params.productId , 10)
    let length = products.length
    products=products.filter(product=>{
        return product.id!==productDel
    })
    if(length>products.length)
        res.status(200).json({"message":"Deletion Successful"})
    else 
        res.status(400).json({"message":"Deletion failed"})
})

app.use((req, res)=>{
    res.status(404).render('error')
})

app.listen(PORT , ()=>{
    console.log(`Listening on port ${PORT}`)
})
