const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const path = require('path');
const multer = require('multer');

const server = app.listen(5600, () => {
    console.log("Server is running on http://localhost:5600");
});

// Use body-parser middleware to parse incoming requests
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.set('views','./views');

//static routes 
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'))
app.use('/views', express.static('./views'))
app.use('/public', express.static('./public'))

const route = require('./Routes/documentation');
const { AsyncLocalStorage } = require('async_hooks');

app.use('/', route);


























// const db = require("./database");


// async function main() {

//     await db.deleteAll('main_topics');

// 	/* INSERT Many*/
// 	await db.insertMany("main_topics", [
// 		{
// 			name: "Nature",
// 			position: "1",
// 		},
//         {
// 			name: "Valami",
// 			position: "2",
// 		},
//         {
// 			name: "Field",
// 			position: "3",
// 		},
//         {
// 			name: "Get Started",
// 			position: "4",
// 		},
// 	]);

// 	// /* FIND */
// 	const data = await db.getMany("main_topics", "name", "Nature");
// 	console.log("data :>> ", data);

// 	/* UPDATE */
// 	await db.updateMany("main_topics", "name", "Nature", {
// 		position: "12",
// 	});

// }
// main().catch(console.error);