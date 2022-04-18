require('dotenv').config()
const jwt = require('jsonwebtoken');
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1]
        const secret = process.env.JWT_SECRET
        const {_id} = await jwt.verify(token, secret)
        const user = await User.findById(_id)
        if (!user) {
            res.send('not authenticated')
        }
        next()
    } catch (error) {
        res.status(400).send(error)
    }

}

module.exports = auth;