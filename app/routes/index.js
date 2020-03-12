// this is the main file for all routes
const login = require('./login');
const signup = require('./signup');
const createorder = require('./createandgetsorders');
const transporter = require('./Transporter')

module.exports = function(app,database)
{
    
     signup(app,database);
     login(app,database);
    createorder(app,database);
    transporter(app,database);

}