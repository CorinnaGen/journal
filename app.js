var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var journalEntriesRouter = require("./routes/journal_entries");
var spResourcesRouter = require("./routes/sp_resources.js");
var spIdentifiersRouter = require("./routes/sp_identifiers.js");
var safetyPlan = require("./routes/safety_plan.js");


var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/journal_entries", journalEntriesRouter);
app.use("/safetyplan", spResourcesRouter);
app.use("/safetyplan", spIdentifiersRouter);
app.use("/safetyplan", safetyPlan);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send("error");
});

module.exports = app;
