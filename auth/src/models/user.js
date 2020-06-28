const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');
const { isValidEmail } = require('../utils/validators');
const generateAuthToken = require('../utils/generateAuthToken');

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: isValidEmail
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true,
    tableName: 'users'
})
User.sync();
//to restart the table use the following function:
//User.sync({ force: true });

module.exports = {
    User: User,
    addUser: async (email, password) => {
        //adds the user and returns a newly generated auth token
        password = await bcrypt.hash(password, 8);
        let user = new User({ email, password });

        user = await user.save();

        const token = generateAuthToken(user.id);
        user.token = token;

        await user.save();
        return token;
    },
    findUserByCredentials: async (email, password) => {
        //returns the user object if found, if not returns undefined
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            throw new Error('Unable to login');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Unable to login');
        }
        return user;
    },
    saveNewAuthToken: async (userId) => {
        //generates a new jwt token, stores the token for user with id=${userId} and returns the token
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error();
        }
        const token = generateAuthToken(userId);
        user.token = token;
        await user.save();
        return token;
    },
    removeAuthToken: async (userId) => {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('no user found');
        }
        user.token = null;
        await user.save();
    },
    findUserById: async (userId) => {
        //returns the user if found or null if not
        const user = await User.findAll({
            attributes: ['id', 'email', 'createdAt'],
            where: { id: userId }
        });
        return user;
    },
    findAndVerifyUserByToken: async (token) => {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const user = await User.findOne({ where: { id: userId, token } })
        return user;
    }
}