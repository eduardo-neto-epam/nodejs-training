/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';

const users = require('../models/user');
const groups = require('../models/group');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('user_group', {
            userId: {
                type: Sequelize.STRING,
                references: {
                    model: users,
                    key: 'id',
                },
            },
            groupId: {
                type: Sequelize.STRING,
                references: {
                    model: groups,
                    key: 'id',
                },
            },
        });
    },

    down: async (queryInterface, _Sequelize) => {
        await queryInterface.dropTable('user_group');
    },
};
