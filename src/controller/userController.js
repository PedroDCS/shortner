/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

import dotenv from 'dotenv';
import UserModel from '../model/userModel.js';

dotenv.config();
const { JWT_SECRET } = process.env;

const hashPassword = (password) => {
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(password, salt);

  return hash;
};
class UserController {
  async index(request, response) {
    const users = await UserModel.find();
    response.send({ data: users });
  }

  async getOne(request, response) {
    const { id } = request.params;

    try {
      const user = await UserModel.findById(id);

      if (user) {
        return response.send({
          data: user,
        });
      }
      response.status(404).send({
        message: 'Usuario não Encontrado',
      });
    } catch (error) {
      response.status(400).send({
        message: 'Aconteceu um erro inesperado',
      });
    }
  }

  async remove(request, response) {
    const { id } = request.params;

    try {
      const user = await UserModel.findById(id);
      if (user) {
        await user.remove();
        return response.status(200).send({
          message: 'Usuario Deletado',
        });
      }

      response.status(404).send({
        message: 'Usuario não Encontrado',
      });
    } catch (error) {
      response.status(400).send({
        message: 'Aconteceu um erro inesperado',
      });
    }
  }

  async store(request, response) {
    const {
      name, email, phones, password, birthDate, state,
    } = request.body;

    if (typeof name !== 'string') {
      return response.status(400).send({
        message: 'Dados Invalidos',
      });
    }

    try {
      const user = await UserModel.create({
        name, email, phones, password: hashPassword(password), birthDate, state,
      });

      response.send({
        message: 'Usuário criado!',
        data: user,
      });
    } catch (error) {
      response.status(400).send({
        message: 'Aconteceu um erro inesperado',
      });
    }
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phones, password, birthDate, state,
    } = request.body;
    try {
      const user = await UserModel.findByIdAndUpdate(id, {
        name, email, phones, password, birthDate, state,
      }, {
        new: true,
      });

      response.status(200).send({
        message: 'Dados Atualizados',
        data: user,
      });
    } catch (error) {
      response.status(400).send({
        message: 'Aconteceu um erro inesperado',
      });
    }
  }

  async login(request, response) {
    const { email, password } = request.body;
    const user = await UserModel.findOne({ email }).lean();

    if (!user) {
      return response.status(404).json({ message: 'User Not Found' });
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      return response.status(404).json({ message: 'PassWord Invalid' });
    }

    delete user.password;

    const token = jsonwebtoken.sign({
      // eslint-disable-next-line no-underscore-dangle
      id: user._id,
      name: user.name,
      email: user.email,
    }, JWT_SECRET, {
      // expiresIn: 120
    });

    return response.json({ token });
  }
}

export default UserController;
