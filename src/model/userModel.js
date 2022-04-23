import mongoose from 'mongoose';

const UseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  state: {
    type: String,
    enum: ['MG', 'SP', 'RJ', 'ES', 'Other'],
  },
  birthDate: Date,
  password: String,
  phones: [String],

}, {
  timestamps: true,
  // serve pra guardar a data de criação e de modificação
});

const UserModel = mongoose.model('user', UseSchema);

export default UserModel;

// import crypto from "crypto";

// const users = [{
//     id: crypto.randomUUID(),
//     name: "Pedro",
//     city: "Angelandia",
// }];

// export default users;
