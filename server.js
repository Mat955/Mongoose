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
    time.updated_at = currentDate;

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

kenny.save(function (err) {
    if (err) throw err;

    console.log('User ' + kenny.name + ' saved correct');
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

benny.save(function (err) {
    if (err) throw err;

    console.log('User ' + benny.name + ' saved correct');
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

jordan.save(function (err) {
    if (err) throw err;

    console.log('User ' + jordan.name + ' saved correct');
});
