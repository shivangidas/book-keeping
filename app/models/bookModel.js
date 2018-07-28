module.exports = (sequelize, DataTypes) =>
    sequelize.define('book', {
        seq: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id: {
            type: DataTypes.INTEGER,
            unique: true
        },
        name: {
            type: DataTypes.STRING(256),
            allowNull: false,
            unique: true
        },
        author: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        publication: {
            type: DataTypes.STRING(256),
            allowNull: true
        },
        dateBought: {
            type: DataTypes.DATE,
            allowNull: true
        },
        dateRead: {
            type: DataTypes.DATE,
            allowNull: true
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },{
        timestamps: false,
        freezeTableName: true
    })