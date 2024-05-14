import mongoose from 'mongoose'

const options = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: function (doc, dataInMongoDb) {
      delete dataInMongoDb.projects
    }
  }
}

const cvSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    firstName: { type: String }, //, required: [true, 'First name is required']
    lastName: { type: String }, //, required: [true, 'Last name is required']
    street: { type: String },
    zip: { type: Number },
    city: { type: String },
    country: { type: String },
    email: { type: String },
    phone: { type: String },
    github: { type: String },
    homepage: { type: String },
    linkedIn: { type: String },
    image: { url: { type: String }, public_id: { type: String } },
    template: { type: String },
    position: { type: String }, //, required: [true, 'Position is required']
    profile: { type: String },
    hardskills: [{ skill: String }],
    softskills: [{ skill: String }],
    languages: [{ language: String, level: String }],
    education: [
      {
        start: String,
        end: String,
        present: Boolean,
        school: String,
        subject: String,
        degree: String
      }
    ],
    work: [
      {
        start: String,
        end: String,
        present: Boolean,
        company: String,
        position: String,
        description: String,
        city: String
      }
    ],
    projects: [
      { title: String, about: String, link: String },
      { select: false }
    ],
    letter: {
      hrLast: String,
      refNumber: String,
      companyName: String,
      companyStreet: String,
      companyZip: Number,
      companyCity: String,
      content: String
    },
    sectionTitles: {
      work: { type: String, default: 'Experience' },
      education: { type: String, default: 'Education' },
      hardskills: { type: String, default: 'Hardskills' },
      softskills: { type: String, default: 'Softskills' },
      languages: { type: String, default: 'Languages' },
      details: { type: String, default: 'Details' }
    }
  },
  options
)

// For virtual fullName
const fullname = cvSchema.virtual('fullname')
fullname.get(function () {
  return `${this.firstName} ${this.lastName}`
})

// For virtual cv title
cvSchema.virtual('cvTitle').get(function () {
  return `CV_${this.firstName}_${this.lastName}` //.charAt(0)
})

const CV = mongoose.model('CV', cvSchema)

export default CV
