var env = require('../config/env');

function user_service(db, indexRouter) {
    
    /**
     * Get all users
     */
    indexRouter.get('/users', function(req, res, next) {
        db.users.findAll()
            .then(users => {
                console.log(JSON.stringify(users));  // Print out all users in database to the console in JSON format
                res.send(JSON.stringify(users));     // Print out all users in database to the specified URL in JSON format
            }).catch(error => {
                res.send({error: JSON.stringify(error)});
            });
    });
    
    
    /**
     * Get one user by ID
     */
    indexRouter.get('/users/:id', function(req, res, next) {
        const id = req.params.id;       // Assigns id parameter taken from the HTTP request and assigns it to const id
        db.users.findOne({
            where: {id: id}             // Find the user that matches the given id
        }).then(users => {
            res.send(JSON.stringify(users));              // Print out the user to the specified URL in JSON format
        }).catch(error => {
            res.send({error: JSON.stringify(error)});
        });
    });
    
    
    /**
     * Get one user by username and password
     */
    indexRouter.get('/users/:username/:password', function(req, res, next) {
        const username = req.params.username;           // Assigns username parameter taken from the HTTP request and assigns it to const username
        const password = req.params.password;             // Assigns password parameter taken from the HTTP request and assigns it to const password
        db.users.findOne({
            where: {                                      // Find the user that matches the given id
                username: username,
                password: password
            }
        }).then(users => {
            res.send(JSON.stringify(users));              // Print out the user to the specified URL in JSON format
        }).catch(error => {
            res.send({error: JSON.stringify(error)});
        });
    });
    
    
    /**
     * Create new user
     * Curl command to test POST
     * curl -d '{"username":"POSTusername", "password": "POSTpassword"}' -H "Content-Type: application/json" -X POST http://localhost:3000/user
     * curl -d username=POSTusername -d password=POSTpassword -X POST http://localhost:3000/user/signup
     */
    indexRouter.post('/user/signup', function (req, res, next) {
        db.users.create(req.body)
            .then(new_user => res.send(new_user))
            .catch(error => {
                res.send({error: JSON.stringify(error)});
            });
    });


    /**
     * Login through request body
     * curl -d username=user3 -d password=test3 -X POST http://localhost:3000/user/login
     */
    indexRouter.post('/user/login', function (req, res, next) {
        db.users.findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        }).then(user => {
            res.send({user: JSON.stringify(user)});
        }).catch(error => {
            res.send({error: JSON.stringify(error)});
        });
    });
    
    
    /**
     * Update user given ID
     * Curl command to test PUT
     * curl -d '{"username":"PUTusername", "password": "PUTpassword"}' -H "Content-Type: application/json" -X PUT http://localhost:3000/user/update/1
     * curl -d username=PUTusername -d password=PUTpassword -X PUT http://localhost:3000/user/update/1
     */
    indexRouter.put('/user/update/:id', function(req, res, next){
        const id = req.params.id;
        db.users.findOne({
            where: {id: id}
        }).then(user => {
            user.update(req.body)
        }).then(updated_user =>
            res.send(updated_user)
        ).catch(error => {
            res.send({error: JSON.stringify(error)});
        });
    });
    
    
    /**
     * Update user by username password
     */
    indexRouter.put('/user/update/:username/:password', function(req, res, next){
        const username = req.params.username;
        const password = req.params.password;
        db.users.findOne({
            where: {
                username: username,
                password: password
            }
        }).then(user => {
            user.update(req.body)
        }).then(updated_user =>
            res.send(updated_user)
        ).catch(error => {
            res.send({error: JSON.stringify(error)});
        });
    });
    
    
    /**
     * Delete user by id
     * Curl command to test DELETE
     * curl -X DELETE http://localhost:3000/user/1
     */
    indexRouter.delete('/user/:id', function(req, res, next){
        const id = req.params.id;
        db.users.destroy({
            where: {id: id}
        }).then(deleted_user =>
            res.send(JSON.stringify(deleted_user))
        ).catch(error => {
            res.send({error: JSON.stringify(error)});
        });
    });


    /**
     * Delete user by first and last name
     * Curl command to test DELETE
     * curl -X DELETE http://localhost:3000/user/Christine/Alvarado
     */
    indexRouter.delete('/user/:username/:password', function(req, res, next){
        const username = req.params.username;
        const password = req.params.password;
        db.users.destroy({
            where: {
                username: username,
                password: password,
            }
        }).then(deleted_user =>
            res.send(JSON.stringify(deleted_user))
        ).catch(error => {
            res.send({error: JSON.stringify(error)});
        });
    });
}

module.exports = user_service;
