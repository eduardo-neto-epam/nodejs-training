import {
    Model,
    DataTypes,
    Association,
    Optional,
    BelongsToManyGetAssociationsMixin,
    BelongsToManySetAssociationsMixin,
    BelongsToManyAddAssociationsMixin,
    BelongsToManyCreateAssociationMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManyHasAssociationMixin,
    BelongsToManyCountAssociationsMixin,
} from 'sequelize';

import db from '../../database/config/database.config';
import { Group } from '../group/group.model';

export const attributes = {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_deleted',
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

interface UserAttributes {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public login!: string;
    public password!: string;
    public age!: number;
    public isDeleted!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getGroups!: BelongsToManyGetAssociationsMixin<Group>;
    public setGroup!: BelongsToManySetAssociationsMixin<Group, string>;
    public addGroup!: BelongsToManyAddAssociationsMixin<Group, string>;
    public removeGroup!: BelongsToManyRemoveAssociationMixin<Group, string>;
    public hasGroup!: BelongsToManyHasAssociationMixin<Group, string>;
    public countGroups!: BelongsToManyCountAssociationsMixin;
    public createGroup!: BelongsToManyCreateAssociationMixin<Group>;

    public readonly groups?: Group[];

    public static override associations: {
        groups: Association<User, Group>;
    };
}

User.init(attributes, {
    sequelize: db,
    tableName: 'users',
});
