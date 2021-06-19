module.exports = (sequalize, Sequalize) => {
    return sequalize.define('User', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequalize.DataTypes.INTEGER,
        },
        email: {
            allowNull: false,
            type: Sequalize.DataTypes.STRING,
            unique: true,
        },
        password: {
            allowNull: false,
            type: Sequalize.DataTypes.STRING,
            unique: false,
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'user'
    });
};
