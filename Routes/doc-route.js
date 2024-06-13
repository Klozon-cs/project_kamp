const express = require("express");
const router = express.Router();
const db = require("../database");
const templates = require("../templates");
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
	const topics = await db.getMany("main_topics", 1, 1);

	for (const topic of topics) {
		const chapters = await db.getMany("subchapters", "topic_id", topic.id);
		navItems += templates.navItem(topic.id, topic.name, chapters);
	}

	res.render("index", { contentHTML, navItems });
});

router.get("/documentation/:id", async (req, res) => {
	let contentHTML = "";
	let navItems = "";
	const topics = await db.getMany("main_topics", 1, 1);

	for (const topic of topics) {
		const chapters = await db.getMany("subchapters", "topic_id", topic.id);
		navItems += templates.navItem(topic.id, topic.name, chapters);
	}

	let contents = await db.getMany("contents", "chapter_id", req.params.id);
	console.log(contents);
	for (const content of contents) {
		contentHTML += templates.renderContent(content);
	}

	res.render("index", { contentHTML, navItems });
});

//Create
router.get("/create", async (req, res) => {});

let data = [];
const numOfObjects = 20; //Defindes how many picture can be on one webstite

for (let i = 1; i <= numOfObjects; i++) {
	data.push({ name: `images_${i}`, maxCount: 4 });
}

router.post("/store/:chapter_id", upload.fields(data), async (req, res) => {
	//delete and then store
	// await db.deleteMany("contents","chapter_id",req.params.chapter_id);

	let i =0;
	for (const iterator in req.body) {
	
			let a= await db.insertMany("contents", [
				{
					chapter_id : 4,
					content: req.body[iterator],
					position: i,
					type_id: nameToTypeId(iterator)
				},
			]);
		
		i++;
	}

	const imagesData = req.files;
});

//Update
router.get("/edit/:id", async (req, res) => {
	let contentHTML = "";
	let navItems = "";
	const topics = await db.getMany("main_topics", 1, 1);

	for (const topic of topics) {
		const chapters = await db.getMany("subchapters", "topic_id", topic.id);
		navItems += templates.navItem(topic.id, topic.name, chapters);
	}

	let contents = await db.getMany("contents", "chapter_id", req.params.id);
	for (const content of contents) {
		contentHTML += templates.renderContent(content);
	}

	res.render("edit", { contentHTML, navItems });
});

router.post("/update", async (req, res) => {});

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
