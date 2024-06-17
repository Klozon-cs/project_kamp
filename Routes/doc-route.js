const express = require("express");
const router = express.Router();
const db = require("../database");
const templates = require("../public/js/templates");
const multer = require("multer");
const path = require("path");

// Set up multer to handle multiple file uploads
const destination = path.resolve(__dirname, "..") + "/public/uploads";
const storage = multer.diskStorage({
	
	destination: function (req, file, cb) {
		cb(null, destination);
	},
	filename: function (req, file, cb) {
		cb(	null, file.originalname);
	},
});
const upload = multer({ storage: storage });

/*----------------- CRUD Routes -----------------*/

//Read (Display all movie)
router.get("/", async (req, res) => {
	let contentHTML = "";
	let navItems = "";
	const topics = await db.getMany("main_topics", 1, 1 + " ORDER BY position");

	for (const topic of topics) {
		const chapters = await db.getMany("subchapters", "topic_id", topic.id + " ORDER BY position");
		navItems += templates.navItem(topic.id, topic.name, chapters);
	}

	res.render("index", { contentHTML, navItems });
});






router.get("/documentation/:id", async (req, res) => {
	let contentHTML = "";
	let navItems = "";
	const topics = await db.getMany("main_topics", 1, 1+ " ORDER BY position");

	for (const topic of topics) {
		const chapters = await db.getMany("subchapters", "topic_id", topic.id + " ORDER BY position");
		navItems += templates.navItem(topic.id, topic.name, chapters);
	}

	let page = await db.getMany("pages", "chapter_id", req.params.id + " ORDER BY position");

	for (const content of page) {
		contentHTML += templates.renderContent(content);
	}

	res.render("index", { contentHTML, navItems });
});



/*---------------------------- STORE ------------------------------*/
let data = [];
const numOfObjects = 20; //Defindes how many picture can be on one webstite

for (let i = 1; i <= numOfObjects; i++) {
	data.push({ name: `images_${i}`, maxCount: 4 });
}

router.post("/store/:chapter_id", upload.fields(data), async (req, res) => {
	//delete and then store
	await db.deleteMany("pages","chapter_id", req.params.chapter_id);

	let i =0;
	for (const iterator in req.body) {
	
			await db.insertMany("pages", [
				{ 
					chapter_id : req.params.chapter_id, 
					content: req.body[iterator],
					position: i,
					type_id: nameToTypeId(iterator)
				},
			]);
		
		i++;
	}

	const imagesData = req.files;

	res.redirect("/documentation/"+req.params.chapter_id);
});






//Create
router.post("/create/chapter/:topic_id", async (req, res) => {
	let old_chapters = await db.getMany("subchapters","topic_id", req.params.topic_id+ "ORDER BY position");

	//delete old chapters
	const request = req.body;
	for (const old of old_chapters) {
		let stay = false;
		for (const req_name in request) {
			if (old.id == req_name) {
				stay = true;
			}
		}
		if (!stay) {
			await db.deleteMany("subchapters","id", old.id);	
			console.log("delete" +old.id);
		}
	}

	console.log(req.body);
	

	let pos_counter = 1;
	for (const req_name in request) {
		if (req_name.includes("new_chapter_") && request[req_name] != "") {
			await db.insertMany("subchapters", [{
				name:request[req_name],
				position: pos_counter,
				topic_id: req.params.topic_id
			}]);
			
		}else if(request[req_name] != ""){
			await db.updateMany("subchapters","id", req_name, {
				name:request[req_name],
				position: pos_counter
			});	
		}	

		pos_counter++; 
	} 

	// console.log(old_chapters);
	const referer = req.get('Referer');

    res.redirect(referer);
});








router.get("/edit/:id", async (req, res) => {
	let contentHTML = "";
	let navItems = "";
	const topics = await db.getMany("main_topics", 1, 1 + " ORDER BY position");

	const active_topics = await db.getMany("subchapters", "id", req.params.id);

	for (const topic of topics) {
		const chapters = await db.getMany("subchapters", "topic_id", topic.id + " ORDER BY position");
		navItems += templates.navItemInput(topic.id, topic.name, chapters, req.params.id, active_topics[0].topic_id);
	}

	let page_contents = await db.getMany("pages", "chapter_id", req.params.id + " ORDER BY position");
	for (const content of page_contents) {
		contentHTML += templates.renderInput(content);
	} 

	res.render("edit", { contentHTML, navItems , id: req.params.id});
});


//Delete
router.post("/delete", async (req, res) => {});

module.exports = router;

function nameToTypeId(name) {
	if (name.includes("title_big")) {
		return 1;
	} else if (name.includes("title_medium")) {
		return 2;
	} else if (name.includes("uList")) {
		return 3;
	} else if (name.includes("oList")) {
		return 4;
	} else if (name.includes("text_regular")) {
		return 5;
	} else if (name.includes("video")) {
		return 6;
	} else if (name.includes("image_name")) {
		return 7;
	}
}

// 1 => titleBig
// 2 => titleMedium
// 3 => listUnordered
// 4 => listOrdered
// 5 => textregular
// 6 => youtubeVideo
// 7 => image
