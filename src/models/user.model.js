const bcrypt = require('bcrypt');

module.exports = (sequalize, Sequalize) => {
    const user = sequalize.define('User', {
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
            unique: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'user'
    }, {
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            },
            beforeUpdate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            }
        },
        instanceMethods: {
            validPassword: (password) => {
                return bcrypt.compareSync(password, this.password);
            }
        }
    });

    user.prototype.validPassword = async (password, hash) => {
        return await bcrypt.compareSync(password, hash);
    }

    return user;
};
