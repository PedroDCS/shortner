import users from "./../model/userModel.js";
import crypto from "crypto";

const Controller = {
    index(request, response) {
        response.send({ data: users });
    },

    getOne(request, response) {
        const { id } = request.params;
        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            return response.status(404).send({
                message: 'Usuario não Encontrado'
            });
        }

        return response.send({
            data: users[userIndex]
        });
    },

    remove(request, response) {
        const { id } = request.params;
        const userIndex = users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            return response.status(404).send({
                message: 'Usuario não Encontrado'
            });
        }
        users.splice(userIndex, 1);
        return response.status(200).send({
            message: 'Usuario Deletado'
        })
    },

    store(request, response) {
        const { name, city } = request.body;

        if (typeof name !== 'string' || typeof city !== 'string') {
            return response.status(400).send({
                message: 'Dados Invalidos'
            });
        }

        const user = {
            id: crypto.randomUUID(),
            name,
            city,
        };
        users.push(user);
        return response.send({
            message: "Usuário criado!",
            data: user
        });
    },

    update(request, response) {
        const id = request.params.id;
        let { name, city } = request.body;

        const userIndex = users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            return response.status(404).send({
                message: 'Usuario não Encontrado'
            });
        }

        if (typeof name === 'string' && typeof city === 'string') {
            users[userIndex] = {
                id,
                name,
                city
            }
        }

        return response.status(200).send({
            message: 'Dados Atualizados',
            data: users[userIndex]
        });
    },
}

export default Controller;