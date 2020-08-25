const express = require('express')
const router = express.Router()
const moment = require('moment')

const database = require('./database')

router.get('/item',(req,res)=>{

	let sql = 'SELECT id, item_name, item_code FROM data_inventory'

	database.query(sql,(err,result,fields)=>{
		if(err) throw err;
		res.json(result)
	})

})

router.get('/item/:id',(req,res)=>{

	let sql = 'SELECT * FROM data_inventory WHERE id = '+req.params.id

	database.query(sql,(err,result,fields)=>{
		if(err) throw err;
		res.json(result)
	})

})

router.post('/item-add',(req,res)=>{

	let item_name = req.body.item_name
	let item_code = req.body.item_code
	let item_description = req.body.item_description
	let date = moment().format('YYYY-M-D H:m:s')

	if(item_name&&item_code&&item_description){
		let sql = 'INSERT INTO data_inventory (item_name,item_code,item_description,item_created_at,last_update) VALUES ?'
		let value = [[item_name,item_code,item_description,date,date]]
		let data_json = {item_name,item_code,item_description,date}

		database.query(sql,[value],(err,result)=>{
			if(err) throw err;
			console.log("Successfully Add "+item_name+" Data")
			res.json(data_json)
		})
	}else{
		res.send("<h1>Failed to Post</h1>")
	}

})

router.post('/item-edit',(req,res)=>{

	let id = req.body.id
	let item_name = req.body.item_name
	let item_code = req.body.item_code
	let item_description = req.body.item_description
	let date_update = moment().format('YYYY-M-D H:m:s')

	if(item_name&&item_code&&item_description){
		let sql = 'UPDATE data_inventory SET item_name = ?, item_code = ?, item_description = ?, last_update = ? WHERE id = '+id
		let update_data = {
			id,
			item_name,
			item_code,
			item_description,
			date_update
		}
		database.query(sql,[item_name,item_code,item_description,date_update],(err, result)=>{
		    if (err) throw err;
		    console.log("Successfully Updated "+item_name+" Data");
		    res.json(update_data)
	    });
	}else{
		res.send("<h1>Failed to Update</h1>")
	}

})

router.post('/item-delete',(req, res)=>{

	let id = req.body.id

	if (id&&id>0) {

		let sql = 'DELETE FROM data_inventory WHERE id = '+id

		database.query(sql,(err, result)=>{
			if (err) throw err;
		    console.log("Successfully Delete");
		    res.send("Successfully Delete "+result.affectedRows+" Data")
		});
	}else {
		res.send("<h1>Failed to Delete</h1>")
	}

})

module.exports = router;