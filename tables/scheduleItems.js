
var table = module.exports = require('azure-mobile-apps').table();

table.read(
	function (context) {
		context.query.where(function(userId) {
			return this.userId == userId;
		}, context.user.id);
		return context.execute();
	}
);

table.insert(
	function (context) {
		context.item.userId = context.user.id;
		return context.execute();
});

// table.read(function (context) {
//     return context.execute();
// });

// table.read.use(customMiddleware, table.operation);
