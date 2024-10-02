import { Schema, model } from 'mongoose';
import { TUser } from './auth.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
  },
  isDeleted: { type: Boolean, required: true, default: false },
});

// Pre-save middleware to hash password only if it's modified and not empty
userSchema.pre('save', async function (next) {
  const user = this;

  // Only hash the password if it has been modified and is not empty
  if (user.isModified('password') && user.password) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
    );
  }

  next();
});

// Set password to an empty string after saving to prevent exposing hashed password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Static methods
userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

userSchema.statics.isUserExist = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

// Method to update password explicitly (optional)
userSchema.methods.updatePassword = async function (newPassword: string) {
  if (newPassword) {
    this.password = newPassword; // Set the new password
    await this.save(); // Save the user document to trigger the pre-save hook
  }
};

export const User = model<TUser>('User', userSchema);
