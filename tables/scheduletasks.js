var table = module.exports = require('azure-mobile-apps').table();

var queries = require('azure-mobile-apps/src/query');
var schItems;
var readMiddleware = function(req,res,next){
    var table = req.azureMobile.tables('scheduleItems'),
    query = queries.create('scheduleItems');
    table.read(query).then(function(results) {
        if(results){
            schItems = results;
            next();
        }else{
            res.send("no data");
        }
    });
};


table.read.use(readMiddleware, table.operation);
table.read(    
	function (context) {
                        
        var n = schItems.length;
        for (var i = 0; i < n; i++)
        {
            if (schItems[i].userId != context.user.id)
            {
                schItems.splice(i, 1);
                i--;
                n--;
            }
        }
        
		return context.execute().then(function (results)
        {
            
            var m = results.length;
            for (var i = 0; i < m; i++)
            {
                var toDel = true;
                for (var j = 0; j < n; j++)
                {
                    if (schItems[j].id == results[i].schItemId)
                    {
                        toDel = false;
                        break;
                    }
                }
                if (toDel)
                {
                    results.splice(i, 1);
                    i--;
                    m--;
                }
            }
            console.log(results);
            return results;
        });
	}
);

table.insert(
	function (context) {
		return context.execute();
});