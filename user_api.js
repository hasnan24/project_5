const express = require('express')
const router = express.Router()
const moment = require('moment')

const database = require('./database')

router.get('/user/:username',(req,res)=>{

	let sql = 'SELECT * FROM data_user WHERE username = '+req.params.username
	database.query(sql,(err,result,fields)=>{
		if(err) throw err;
		res.json(result)
	})

})

router.post('/user-add',(req,res)=>{

	let username = req.body.username
	let password = req.body.password
	let status = req.body.status
	let email = req.body.email
	let date = moment().format('YYYY-M-D H:m:s')

	if (username&&password&&status&&email) {
		let sql = 'INSERT INTO data_user (user_name,user_pwd,user_status,user_email,user_created_at,last_update) VALUES ?'
		let value = [[username,password,status,email,date,date]]
		let json_data = {
			username,
			password,
			status,
			email,
			date
		}
		
		database.query(sql,[value],(err,result)=>{
			if (err) throw err;
			console.log("Successfully Register "+username)
			res.json(json_data)
		})
	}else{
		res.send("<h1>Failed to Post</h1>")
	}

})

router.post('/user-edit',(req,res)=>{
	let username = req.body.username
	let password = req.body.password
	let status = req.body.status
	let email = req.body.email
	let date_update = moment().format('YYYY-M-D H:m:s')

	if (username&&password&&status&&email) {
		let sql = 'UPDATE data_user SET user_name = '+username+', user_pwd = '+password+', user_status = '+status+', last_update = '+date_update+' WHERE data_user.user_name = '+username
		let update_data = {
			username,
			password,
			status,
			email,
			date_update
		}
		database.query(sql,(err, result)=>{
		    if (err) throw err;
		    console.log("Successfully Updated "+username+" Data");
		    res.json(update_data)
	    });
	}else{
		res.send("<h1>Failed to Update</h1>")
	}
})

router.post('/user-delete',(req,res)=>{

	let username = req.body.username

	if (username) {
		var sql = 'DELETE FROM user_data WHERE user_name = '+username

		database.query(sql,(err, result)=>{
		    if (err) throw err;
		    console.log("Successfully Delete "+username+" Data");
		    res.send("Successfully Delete "+username+" Data")
		});
	}else {
		res.send("<h1>Failed to Delete</h1>")
	}
})

module.exports=router;