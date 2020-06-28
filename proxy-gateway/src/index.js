require('dotenv').config();
const chalk = require('chalk');
const port = process.env.PORT;
const app = require('./app');

app.listen(port, () => {
    console.log(chalk.green(`listening on port ${port}...`));
});