import bcrypt from 'bcrypt'

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err)
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err)
                }
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(hash)
                })
            })
        })
    })   
}

const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed)
}
const isAdmin = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
      }
  
      req.user = decoded;  // Attach the user to the request object
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token.' });
    }
  };
  
  
export {
    hashPassword,
    comparePassword,
    isAdmin
}