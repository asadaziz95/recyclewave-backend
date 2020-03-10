// this is the main file for all routes
const login = require('./login');
const signup = require('./signup');
const createorder = require('./createandgetsorders');

module.exports = function(app,database)
{
    
     signup(app,database);
     login(app,database);
    // logoutRoute(app,database);
    // updateRoute(app,database);
    // createandgetstours(app,database);
    // getusers(app,database);
    createorder(app,database);

}