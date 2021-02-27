// Data model for a user object
module.exports = (Sequelize, sequelize) => {
    const user = sequelize.define(
        'user',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: Sequelize.STRING,     // define column: username
            password: Sequelize.STRING,     // define column: password
            firstName: Sequelize.STRING,    // define column: firstName
            lastName: Sequelize.STRING,     // define column: lastName
            age: Sequelize.INTEGER,         // define column: age
            major: Sequelize.STRING         // define column: major
        }
    );
    return user;
}