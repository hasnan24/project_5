const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const user_api = require('./user_api')
const item_api = require('./item_api')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(user_api)
app.use(item_api)

app.get('/',(req,res)=>{
	res.send("Welcome Page")
})



app.listen(8080);