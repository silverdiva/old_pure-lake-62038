var express = require("express");
var app = express ();
var path = require("path");
var { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/postgres";

const pool = new Pool({connectionString: connectionString});

app.set('port', (process.env.PORT || 5000));


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
  console.log('This is the familysearch code: Heroku pure-lake-62038');
});

app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");


app.get("/", function (req, res) {
	console.log("Received a request for /, which is the FamilySearch Landing Page");
	res.render("home");
});

app.get("/home", function (req, res) {
	// Controller
	console.log("Received a request for the Home Page");
	var params = {
		result: getPerson(req.query)
	};
	res.render("home");
});


app.get("/pages", function (req, res) {
	// Controller
	console.log("Received a request for the Person Page");
	//var params = {
		//result: getPerson(req, res)
	//};
	res.render("pages/index");
});

app.get("/services/getPerson", (req, res) => {
	console.log("Getting person information.");
	
	var id = req.query.id;
	//var id = req.params.id;
	console.log("Getting person with person_id: ", id);
	
	getPersonFromDb(id, function(error, result) {
		console.log("Back from the getPersonFromDb function with result:", result);
		
		if (error || result == null || result.length != 1) {
		res.status(500).json({success: false, data: error});
		} else {
			res.json(result[0]);
		}
	});
}
	
function getPersonFromDb(id, callback) {
	console.log("Getting person from DB with person_id: " + id);

	var sql = "SELECT person_id, first, last, birthdate FROM person WHERE person_id = $1::int";

	var params = [id];
	
	pool.query(sql, params, function(err, result) {
			// If an error occurred...
			if (err) {
				console.log("Error in database query");
				console.log(err);
				callback(err, null);
	}
			//console.log("Found result: " + JSON.stringify(result.rows));
		
			callback(null, result.rows);
	});

} 

function getChildren(person_id, callback) {
	console.log("Getting person from DB with person_id: " + id);

	var sql = "SELECT p.first, p.last, p.birthdate FROM person p INNER JOIN relationship_table r ON p.person_id = r.child_id WHERE r.parent_id = 6 ORDER BY child_id;"

	var params = [id];
	
	pool.query(sql, params, function(err, result) {
			// If an error occurred...
			if (err) {
				console.log("Error in database query");
				console.log(err);
				callback(err, null);
	}
			//console.log("Found result: " + JSON.stringify(result.rows));
		
			callback(null, result.rows);
	});

} // end of getChildren

function getPersonFromDb(id, callback) {
	console.log("Getting person from DB with id: " + id);

	var sql = "SELECT person_id, first, last, birthdate FROM person WHERE person_id = $1::int";

	var params = [id];
	
	pool.query(sql, params, function(err, result) {
			// If an error occurred...
			if (err) {
				console.log("Error in database query");
				console.log(err);
				callback(err, null);
	}
			console.log("Found result: " + JSON.stringify(result.rows));
		
			callback(null, result.rows);
	});

} // end of getPersonFromDb