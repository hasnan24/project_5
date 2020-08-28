const express = require('express')
const router = express.Router()
const moment = require('moment')

const database = require('./database')

router.get('/user',(req,res)=>{

	let sql = 'SELECT id, user_name, user_email FROM data_user '
	database.query(sql,(err,result)=>{
		if(err) throw err;
		res.json(result)
	})

})

router.get('/user/:username',(req,res)=>{

	let sql = "SELECT * FROM data_user WHERE user_name = ?"
	database.query(sql,[req.params.username],(err,result)=>{
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
		let response = {response : "Failed",
		    			username,
		    			action : "Register"}
		res.json(response)
	}

})

router.post('/user-edit',(req,res)=>{
	let id = req.body.id
	let username = req.body.username
	let password = req.body.password
	let status = req.body.status
	let email = req.body.email
	let date_update = moment().format('YYYY-M-D H:m:s')

	if (username&&password&&status&&email&&id) {
		let sql = 'UPDATE data_user SET user_name = ?, user_pwd = ?, user_status = ?, user_email = ?, last_update = ? WHERE id = '+id
		let value = [username,password,status,email,date_update]
		let update_data = {
			username,
			password,
			status,
			email,
			date_update
		}
		database.query(sql,value,(err, result)=>{
		    if (err) throw err;
		    console.log("Successfully Updated "+username+" Data");
		    res.json(update_data)
	    });
	}else{
		let response = {response : "Failed",
		    			username,
		    			action : "Update"}
		res.json(response)
	}
})

router.post('/user-delete',(req,res)=>{

	let username = req.body.username

	if (username) {
		let sql = 'DELETE FROM data_user WHERE user_name = ?'
		database.query(sql,[username],(err, result)=>{
		    if (err) throw err;
		    console.log("Successfully Delete "+username+" Data");
		    let response = {response : "Success",
		    			username,
		    			action : "Delete"}
		    res.json(response)
		});
	}else {
		let response = {response : "Failed",
		    			username,
		    			action : "Delete"}
		res.json(response)
	}
})

module.exports=router;