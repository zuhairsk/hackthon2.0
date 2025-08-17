import mongoose from 'mongoose'

const achievementSchema = new mongoose.Schema({
  key: { type: String, required: true },
  earnedAt: { type: Date, default: Date.now },
})

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    username: { type: String },
    xp: { type: Number, default: 0 },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Pro'], default: 'Beginner' },
    achievements: [achievementSchema],
    mistakes: [{ type: String }],
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)