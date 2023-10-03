/* eslint-disable no-undef */
const bcrypt = require('bcrypt');
const UserModel = require('../models/User');

class UserController {
    static userRegister = async(req,res) => {
        try{
            // console.log(req.body);
            const { name, email, password } = req.body

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt)

            const data = new UserModel({
                name: name,
                email: email,
                password: hashPassword,
            })

            const dataSaved = await data.save()

            if (dataSaved) {
                res.status(201).json({ 'status': 'success', 'message': 'Registration Successful!', 'user':{'name': name, 'email': email}})
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Error, Try Again!' })
            }
        }catch(err){
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }
}
module.exports = UserController