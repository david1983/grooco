var acl = {
    public: [
        { method: 'GET', pathname: '/login' }
    ],
    private: [
        { method: 'GET', pathname: '/users' },
        { method: 'POST', pathname: '/users' },
        { method: 'DELETE', pathname: '/users' }
    ]
}

module.exports = function (req, res, next) {
    

    var priv = filterPath(req.method, req.path, acl.private);
    var pub = filterPath(req.method, req.path, acl.public);
    
    if (pub.length > 0) {
        req.type = 'public';
    } else if (priv.length > 0) {
        req.type = 'private';
    }

    next();
}

function filterPath(method, pathname, collection){
        var reM = new RegExp(method, "g");                
    return collection.filter(function (i) {        
        var reP = new RegExp(i.pathname, "g");           
        if (reM.test(i.method) && reP.test(pathname)) return i;
    });
}