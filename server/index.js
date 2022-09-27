const knex = require('knex')({
	client: 'mysql',
	connection: {
		host : '127.0.0.1',
		port : 3306,
		user : 'root',
		password : '',
		database : 'myapp_test'
	}
});

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
	knex.select('col_1')
		.from('uno')
		.then( (data) => console.log(data) )
	res.json('Hello World!')
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})