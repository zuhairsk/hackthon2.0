import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    language: { type: String, enum: ['javascript', 'python', 'java', 'c'], required: true },
    code: { type: String, required: true },
    details: { type: String },
    suggestedFix: { type: String },
    eli5: { type: String },
    score: { type: Number, default: 0 },
    durationMs: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('Session', sessionSchema)