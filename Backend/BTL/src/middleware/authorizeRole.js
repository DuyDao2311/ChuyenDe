const authorizeRole = (...roles) =>{
    return (req, res, next)=>{
        if(!req.user || !roles.includes(req.user.roles?.[0])){
            return res.status(403).json({message: 'Khong co quyen truy cap'})
        }
        next();
    }
};

module.exports = authorizeRole;