const User = require('../../../models/auth.model')
const {validateRegister, validateLogin} = require('../../../utils/validator')
const bcrypt = require('bcrypt')

const register = async (req, res)=>{
    const {name, email, password} = req.body
    const exists = await User.findByEmail( email );
    if(exists){
        return res.status(422).json({message: "Tai khoan da ton tai"})
    }
    try{
        const newUser = await User.create({
            name,
            email,
            password
        });
        console.log(newUser);

        return res.status(201).json({
            message: "Đăng ký thành công",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    }catch(error){
        return res.status(500).json({message: `${error}`})
    }
} 

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByEmail(email).select('+password');
        if (!user) {
            return res.status(422).json({ message: "Sai email hoặc mật khẩu" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(422).json({ message: "Sai email hoặc mật khẩu" });
        }

        return res.status(200).json({ message: "Đăng nhập thành công", user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports ={
    login, 
    register
};
