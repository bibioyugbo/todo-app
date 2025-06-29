
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateUser = (req, res, next) => {
//       const authHeader = req.headers.authorization;
//        if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ message: 'No token provided' });
//   }
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({ message: 'Invalid token' });

    }


}

module.exports = {
    authenticateUser
};
