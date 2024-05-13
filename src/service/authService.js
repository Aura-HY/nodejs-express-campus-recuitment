const jwt = require('jsonwebtoken');
const secretKey = 'sdl$%23s%$$';
const userDao = require('../dao/userDao');
const bcrypt = require('bcrypt');

exports.login = async (authId, password) => {
    let result = await userDao.getUserPassword(authId);
    let ismatch = await bcrypt.compare(password, result[0].password);
    if (result.length > 0 && ismatch) {
        const token = jwt.sign(
            {
                authId,
                nickname: result[0].nickname
            },
            secretKey,
            { expiresIn: '24h' }
        );
        return token;
    } else {
        return false;
    }
};
