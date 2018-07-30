module.exports = (sequelize, DataTypes) =>
    sequelize.define('book', {
        id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(256),
            allowNull: false
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