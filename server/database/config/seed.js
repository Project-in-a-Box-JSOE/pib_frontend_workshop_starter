const seed = function (user) {
    return Promise.all([
        // Seed preset values into the database upon server start
        user.create({
            username: 'christine',
            password: 'alvarado',
            firstName: 'Christine',
            lastName: 'Alvarado',
            major: 'Computer Science'
        }),
        user.create({
            username: 'albert',
            password: 'password2',
            firstName: 'Albert',
            lastName: 'Chern',
            major: 'Computer Science'
        }),
        user.create({
            username: 'user3',
            password: 'test3',
            firstName: 'Sanjoy',
            lastName: 'Dasgupta',
            major: 'Computer Science'
        })

    ]).catch(function (error) {
        console.log("Initialize database failed");
    })
};

module.exports = seed;