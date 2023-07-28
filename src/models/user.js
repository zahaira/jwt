module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len:[3,50]
            }
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
            validate:{
                isEmail: {
                    msg: 'Invalid email format'
                }
            }
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false,
        }
    })
}