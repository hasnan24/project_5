const mysql = require('mysql')
const moment = require('moment')


const con_mysql = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'db_project_js_4'
})

con_mysql.connect((error)=>{
	if (error) throw error;
	console.log("Connected to Database at "+moment().format('D/M/YYYY H:m:s'))
})

module.exports=con_mysql