import UserController from "./../controller/userController.js";


import express from "express";

const router = express.Router();

const userController = new UserController();

router.post("/api/login", userController.login);

router.get("/api/users", userController.index);

router.get("/api/users/:id", userController.getOne);

router.post("/api/users", userController.store);

router.put('/api/users/:id', userController.update);

router.delete('/api/users/:id', userController.remove);


export default router;

/*
//Mesma Coisa
router.get("/api/user", (request, response) => userController.index(request, response));

router.get("/api/user/:id", (request, response) => userController.getOne(request, response));

router.post("/api/user", (request, response) => userController.store(request, response));

router.put('/api/user/:id', (request, response) => userController.update(request, response));

router.delete('/api/user/:id', (request, response) => userController.remove(request, response));

*/