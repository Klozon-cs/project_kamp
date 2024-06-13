const mysql = require("mysql2");

const con = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "",
	database: "documentation",
	charset: "utf8mb4"
});


//finds Multiple record in the database and returns it as array object
function getMany(table, field, value) {
	const query = `SELECT * FROM ${table} WHERE ${field} = "${value}" ORDER BY position`;
    return new Promise((resolve, reject) => {
		con.getConnection((err, connection) => {
			if (err) reject(err);
			connection.query(query, (err,result) => {
				if (err) reject(err);
                resolve(result);
			});
            connection.release();
		});
	});
}

function insertMany(table, objectArray) {
	return new Promise((resolve, reject) => {
		con.getConnection((err, connection) => {
			if (err) reject(err);
			for (const object of objectArray) {
				connection.query(`INSERT INTO ${table} SET ?`, object, (err) => {
					if (err) reject(err);
				});
			}
			connection.release();
			resolve(console.log("Records successfully inserted"));
		});
	});
}

function updateMany(table, field, value, object) {
    return new Promise((resolve, reject) => {
		con.getConnection((err, connection) => {
			if (err) reject(err);
			connection.query(`UPDATE ${table} SET ? WHERE ${field} = "${value}"`,object, (err) => {
				if (err) reject(err);
                resolve(console.log("Record(s) successfully  updated"));
			});
            connection.release();
		});
	});
}

function deleteMany(table, field, value) {
    const query =`DELETE FROM ${table} WHERE ${field} = "${value}"`;
    return new Promise((resolve, reject) => {
		con.getConnection((err, connection) => {
			if (err) reject(err);
			connection.query(query, (err) => {
				if (err) reject(err);
                resolve(console.log("Record(s) successfully deleted"));
			});
            connection.release();
		});
	});
}

//ONLY for testing
function deleteAll(table) {
    const query =`DELETE FROM ${table}`;
    return new Promise((resolve, reject) => {
		con.getConnection((err, connection) => {
			if (err) reject(err);
			connection.query(query, (err) => {
				if (err) reject(err);
                resolve(console.log(`${table} records successfully deleted`));
			});
            connection.release();
		});
	});
}

function dropTable(table) {
    return new Promise((resolve, reject) => {
		con.getConnection((err, connection) => {
			if (err) reject(err);
			connection.query(`DROP TABLE ${table}`, (err) => {
				if (err) reject(err);
                resolve(console.log(`${table} table successfully deleted`));
			});
            connection.release();
		});
	});
}

module.exports = {
	getMany,
	insertMany,
	updateMany,
	deleteMany,
	deleteAll,
	dropTable,
};