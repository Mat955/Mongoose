const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/nodeappdatabase', {
    useMongoClient: true
});

const userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    created_at: Date,
    updated_at: Date
});

userSchema.methods.manify = function (next) {
    this.name = this.name + '-boy';

    return next(null, this.name);
};

userSchema.pre('save', function (next) {
    //download actually time
    const currentDate = new Date();

    //change field to actually time
    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;
    }

    //next() is function with is the function that makes doing the next hook
    // performance before or after demanding
    next();
});

const User = mongoose.model('User', userSchema);

const kenny = new User({
    name: 'Kenny',
    username: 'Kenny_the_man',
    password: 'password'
});

kenny.manify(function (err, name) {
    if (err) throw err;
    console.log('Your new name is: ' + name);
});

const benny = new User({
    name: 'Benny',
    username: 'Benny_the_man',
    password: 'password'
});

benny.manify(function (err, name) {
    if (err) throw err;
    console.log('Your new name is: ' + name);
});


const jordan = new User({
    name: 'Jordan',
    username: 'Jordan_the_man',
    password: 'password'
});

jordan.manify(function (err, name) {
    if (err) throw err;
    console.log('Your new name is: ' + name);
});


const findAllUsers = function () {
    // find all users
    return User.find({}, function (err, res) {
        if (err) throw err;
        console.log('Actual database records are ' + res);
    });
}

const findSpecificRecord = function () {
    // find specific record
    return User.find({ username: 'Kenny_the_man' }, function (err, res) {
        if (err) throw err;
        console.log('Record you are looking for is ' + res);
    })
}

const updateUserPassword = function () {
    // update user password
    return User.findOne({ username: 'Kenny_the_man' })
        .then(function (user) {
            console.log('Old password is ' + user.password);
            console.log('Name ' + user.name);
            user.password = 'newPassword';
            console.log('New password is ' + user.password);
            return user.save(function (err) {
                if (err) throw err;

                console.log('Uzytkownik ' + user.name + ' zostal pomyslnie zaktualizowany');
            })
        })
}

const updateUsername = function () {
    // update username
    return User.findOneAndUpdate({ username: 'Benny_the_man' }, { username: 'Benny_the_boy' }, { new: true }, function (err, user) {
        if (err) throw err;

        console.log('Nazwa uzytkownika po aktualizacji to ' + user.username);
    })
}

const findJordanAndDelete = function () {
    // find specific user and delete
    return User.findOne({ username: 'Jordan_the_man' })
        .then(function (user) {
            return user.remove(function () {
                console.log('User successfully deleted');
            });
        })
}

const findKennyAndDelete = function () {
    // find specific user and delete
    return User.findOne({ username: 'Kenny_the_man' })
        .then(function (user) {
            return user.remove(function () {
                console.log('User successfully deleted');
            });
        });
}

const findBennyAndRemove = function () {
    // find specific user and delete
    return User.findOneAndRemove({ username: 'Benny_the_boy' })
        .then(function (user) {
            return user.remove(function () {
                console.log('User successfully deleted');
            });
        });
}

Promise.all([kenny.save(), jordan.save(), benny.save()])
    .then(findAllUsers)
    .then(findSpecificRecord)
    .then(updateUserPassword)
    .then(updateUsername)
    .then(findKennyAndDelete)
    .then(findBennyAndRemove)
    .then(findJordanAndDelete)
    .catch(console.log.bind(console))