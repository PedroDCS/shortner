import userController from "./../controller/userController.js";
import express from "express";

const router = express.Router();


router.get("/api/user", userController.index);

router.get("/api/user/:id", userController.getOne);

router.post("/api/user", userController.store);

router.put('/api/user/:id', userController.update);

router.delete('/api/user/:id', userController.remove);


export default router;

/*
//Mesma Coisa
router.get("/api/user", (request, response) => userController.index(request, response));

router.get("/api/user/:id", (request, response) => userController.getOne(request, response));

router.post("/api/user", (request, response) => userController.store(request, response));

router.put('/api/user/:id', (request, response) => userController.update(request, response));

router.delete('/api/user/:id', (request, response) => userController.remove(request, response));

*/