/**
 * Script để hash lại mật khẩu cho các user đã tồn tại trong database
 * Chạy script này nếu bạn đã tạo user trực tiếp trong MongoDB
 * 
 * Usage: node scripts/hash-existing-passwords.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../src/models/auth.model');

const MONGODB_URI = process.env.MONGODB_URI || '';
const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

async function hashExistingPasswords() {
  try {
    // Kết nối database
    await mongoose.connect(MONGODB_URI);
    console.log(' Đã kết nối database');

    // Lấy tất cả users
    const users = await User.find({}).select('+password');
    console.log(`Tìm thấy ${users.length} users`);

    let updated = 0;
    let skipped = 0;

    for (const user of users) {
      // Kiểm tra xem password đã được hash chưa
      // Bcrypt hash thường bắt đầu với $2a$, $2b$, hoặc $2y$
      const isAlreadyHashed = user.password && (
        user.password.startsWith('$2a$') ||
        user.password.startsWith('$2b$') ||
        user.password.startsWith('$2y$')
      );

      if (isAlreadyHashed) {
        console.log(` User ${user.email} đã có password được hash, bỏ qua`);
        skipped++;
        continue;
      }

      // Hash lại password
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      
      // Cập nhật password đã hash
      user.password = hashedPassword;
      await user.save();
      
      console.log(` Đã hash lại password cho user: ${user.email}`);
      updated++;
    }

    console.log(`\n Kết quả:`);
    console.log(`   - Đã cập nhật: ${updated} users`);
    console.log(`   - Đã bỏ qua: ${skipped} users`);
    console.log(`\n Hoàn thành!`);

  } catch (error) {
    console.error('Lỗi:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Đã ngắt kết nối database');
  }
}

// Chạy script
hashExistingPasswords();



