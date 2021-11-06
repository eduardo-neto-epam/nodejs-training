/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
const { Model } = require('sequelize');

const { attributes } = require('../../src/user/user.model');
module.exports = (sequelize, _DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(_models) {
            // define association here
        }
    }
    User.init(attributes, {
        sequelize,
        modelName: 'users',
    });
    return User;
};
