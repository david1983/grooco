var fs = require('fs');

module.exports = function(){
    
    return fs.readdirSync('./models').reduce(function(acc, file) {    	
        if (file != "index.js" ){
            var name = file.substr(0, file.indexOf('.'));            
            var model = {
                name: name,
                model: require('./' + name)
            };                    
            acc.push(model);                                 
        }
        return acc;
        
    },[]);
}
