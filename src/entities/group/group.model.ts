import {
    Association,
    BelongsToManyAddAssociationsMixin,
    BelongsToManyCountAssociationsMixin,
    BelongsToManyCreateAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyHasAssociationMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManySetAssociationsMixin,
    DataTypes,
    Model,
    Optional,
} from 'sequelize';

import db from '../../database/config/database.config';
import { User } from '../user/user.model';

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

interface GroupAttributes {
    id: string;
    name: string;
    permissions: ('READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES')[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GroupCreationAttributes extends Optional<GroupAttributes, 'id'> {}

export class Group extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
    public id!: string;
    public name!: string;
    public permissions!: ('READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES')[];

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getUsers!: BelongsToManyGetAssociationsMixin<User>;
    public setUser!: BelongsToManySetAssociationsMixin<User, string>;
    public addUser!: BelongsToManyAddAssociationsMixin<User, string>;
    public removeUser!: BelongsToManyRemoveAssociationMixin<User, string>;
    public hasUser!: BelongsToManyHasAssociationMixin<User, string>;
    public countUsers!: BelongsToManyCountAssociationsMixin;
    public createUser!: BelongsToManyCreateAssociationMixin<User>;

    public readonly users?: User[];

    public static override associations: {
        users: Association<Group, User>;
    };
}

Group.init(groupAttributes, {
    sequelize: db,
    tableName: 'groups',
});
