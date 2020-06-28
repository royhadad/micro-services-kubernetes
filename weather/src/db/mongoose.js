const mongoose = require('mongoose');
const chalk = require('chalk');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(chalk.red(`couldn't connect to mongoDB atlas, error:\n`), err);
    } else {
        console.log(chalk.green('successfully connected to mongoDB atlas'));
    }
})