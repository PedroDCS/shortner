import UserModel from "./../model/userModel.js";

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
                    data: user
                });
            }
            response.status(404).send({
                message: 'Usuario não Encontrado'
            });
        } catch (error) {
            response.status(400).send({
                message: 'Aconteceu um erro inesperado'
            });
        }

    }

    async remove(request, response) {
        const { id } = request.params;

        try {
            const user = await UserModel.findById(id);
            if (user) {
                await user.remove()
                return response.status(200).send({
                    message: 'Usuario Deletado'
                })
            }


            response.status(404).send({
                message: 'Usuario não Encontrado'
            });
        } catch (error) {
            response.status(400).send({
                message: 'Aconteceu um erro inesperado'
            });
        }

    }

    async store(request, response) {
        const { name, email, phones, password, birthDate, state } = request.body;

        if (typeof name !== 'string') {
            return response.status(400).send({
                message: 'Dados Invalidos'
            });
        }

        try {
            const user = await UserModel.create({
                name, email, phones, password, birthDate, state
            })

            response.send({
                message: "Usuário criado!",
                data: user
            });
        } catch (error) {
            response.status(400).send({
                message: 'Aconteceu um erro inesperado'
            });
        }
    }

    async update(request, response) {
        const id = request.params.id;
        const { name, email, phones, password, birthDate, state } = request.body;
        try {
            const user = await UserModel.findByIdAndUpdate(id, {
                name, email, phones, password, birthDate, state
            }, {
                new: true
            })

            response.status(200).send({
                message: 'Dados Atualizados',
                data: user
            });

        } catch (error) {
            response.status(400).send({
                message: 'Aconteceu um erro inesperado'
            });
        }

    }
}

export default UserController;