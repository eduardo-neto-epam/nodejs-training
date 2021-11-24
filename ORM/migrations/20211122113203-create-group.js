/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('groups', {
            id: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
                unique: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            permissions: {
                type: Sequelize.ARRAY(Sequelize.ENUM({ values: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'] })),
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                field: 'created_at',
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                field: 'updated_at',
            },
        });
    },
    down: async (queryInterface, _Sequelize) => {
        await queryInterface.dropTable('groups');
    },
};
