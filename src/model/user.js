import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    displayPhoto: { type: String },
    dateOfBirth: { type: Date },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  const user = this;
  try {
    user.username = user.username.toLowerCase();
    user.email = user.email.toLowerCase();

    const hashedPassword = await bcrypt.hash(user.password, 12);
    user.password = hashedPassword;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
