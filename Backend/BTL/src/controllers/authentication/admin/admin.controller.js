    const User = require('../../../models/auth.model')
    const {validateRegister, validateLogin} = require('../../../utils/validator')

    const createAdmin = async(req, res) =>{
        const {name, email, password} = req.body
        const exists_user = await User.findByEmail( email );
        if(exists_user){
            return res.status(442).json({message: "Nguoi dung da ton tai"})
        }
        try{
            const newUser = await User.create({
                name,
                email,
                roles: ["admin"],
                password,
            });
            return res.status(201).json({message: "Create account admin successfully"})

        }catch(e){
            return res.status(500).json({message: "Connect to database failed"})
        }
    }

module.exports = {
    createAdmin,
};