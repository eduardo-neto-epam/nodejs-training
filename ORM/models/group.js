/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
const { Model } = require('sequelize');

const { groupAttributes } = require('../../src/group/group.model');

module.exports = (sequelize, _DataTypes) => {
    class Group extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(_models) {
            // define association here
        }
    }
    Group.init(groupAttributes, {
        sequelize,
        modelName: 'groups',
    });
    return Group;
};
