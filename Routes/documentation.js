const express = require("express");
const router = express.Router();
const db = require("../database");
const templates = require("../templates");

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

router.post("/store", async (req, res) => {

//delete and then store
console.log(req.body);
for (const iterator in req.body) {
	
	console.log(iterator);
}

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
