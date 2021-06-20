module.exports = (sequalize, Sequalize) => {
    return sequalize.define('Result', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequalize.DataTypes.INTEGER,
        },
        userId: {
            allowNull: false,
            type: Sequalize.DataTypes.INTEGER,
            unique: false,
        },
        date: {
            allowNull: false,
            type: Sequalize.DataTypes.DATE,
            unique: false,
        },
        type: {
            allowNull: false,
            type: Sequalize.DataTypes.STRING,
            unique: false,
        },
        result: {
            allowNull: false,
            type: Sequalize.DataTypes.STRING,
            unique: false,
        },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'result'
    });
};
