module.exports = (sequalize, Sequalize) => {
    return sequalize.define('User', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequalize.DataTypes.INTEGER,
        },
        name: {
            allowNull: false,
            type: Sequalize.DataTypes.STRING,
        },
        email: {
            allowNull: false,
            type: Sequalize.DataTypes.STRING,
            unique: true,
        },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'user'
    });
};
