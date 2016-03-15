
var table = module.exports = require('azure-mobile-apps').table();

table.insert(
	function (context) {
		context.item.id = context.user.id;
		return context.execute();
});

table.read(
	function (context) {
		context.query.where({id : context.user.id});
		return context.execute();
	}
)

// table.read(function (context) {
//     return context.execute();
// });

// table.read.use(customMiddleware, table.operation);
