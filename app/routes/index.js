// this is the main file for all routes

const createorder = require('./createandgetsorders');

module.exports = function(app,database)
{
    
    // signupRoute(app,database);
    // loginRoute(app,database);
    // logoutRoute(app,database);
    // updateRoute(app,database);
    // createandgetstours(app,database);
    // getusers(app,database);
    createorder(app,database);

}