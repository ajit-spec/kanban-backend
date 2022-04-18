require('dotenv').config()
const bcrypt = require('bcrypt');
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const saltRounds = +process.env.BCRYPT_SALTROUNDS

const register = async (req, res) => {

    try {
        let { username, contact, email, password } = req.body

        password = await bcrypt.hash(password, saltRounds)

        const user = new User(
            { username, contact, email, password }
        )

        await user.save()

        res.status(201).send(
            {
                msg: 'register success'
            }
        )
    } catch (error) {
        res.status(400).send(error)
    }


}

const login = async (req, res) => {

    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).send(
                { msg: 'wrong creds' }
            )
        }
        const matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) {
            return res.status(400).send(
                { msg: 'wrong creds' }
            )
        }
        const secret = process.env.JWT_SECRET
        const token = await jwt.sign({ _id: user._id }, secret)
        return res.status(200).send(
            {
                token,
                msg: 'login success'
            }
        )
    } catch (error) {
        return res.status(400).send(error)

    }

}

module.exports = {
    register,
    login
}