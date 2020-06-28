require('dotenv').config();
require('./db/mongoose');
const chalk = require('chalk');
const app = require('./app');
const port = process.env.PORT;

app.listen(port, () => {
    console.log(chalk.green(`listening on port ${port}...`));
});
