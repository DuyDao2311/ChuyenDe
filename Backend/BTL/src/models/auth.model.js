const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 100,
    default: ''
  },
  email: {
    type: String,
    required: [true, 'Email là bắt buộc'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: props => `${props.value} không phải là email hợp lệ`
    }
  },  
  password: {
    type: String,
    required: [true, 'Mật khẩu là bắt buộc'],
    select: false // Không trả về mật khẩu khi query dữ liệu
  },
  roles: {
    type: [String],
    enum: ['customer', 'admin'],
    default: ['customer']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: String,   // Token dùng để reset mật khẩu
  resetPasswordExpires: Date    // Thời gian hết hạn token reset mật khẩu
}, {
  timestamps: true // Tự động tạo createdAt và updatedAt
});

// Tạo index cho email để tìm kiếm nhanh hơn
UserSchema.index({ email: 1 });

// Tự động mã hóa mật khẩu trước khi lưu vào database
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// Hàm tìm user theo email (không phân biệt hoa thường)
UserSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase().trim() });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
