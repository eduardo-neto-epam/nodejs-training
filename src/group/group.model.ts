import { DataTypes, Model } from 'sequelize';

import db from '../database/config/database.config';

import { IGroupAttributes } from './group.interfaces';

export const groupAttributes = {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    permissions: {
        type: DataTypes.ARRAY(
            DataTypes.ENUM({
                values: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
            }),
        ),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updated_at',
    },
};

export class Group extends Model<IGroupAttributes> {}

Group.init(groupAttributes, {
    sequelize: db,
    modelName: 'groups',
});
