import { Router } from "express";
import PetsService from "../services/db/pets.service.js";


const router = new Router();

const petsService = new PetsService()

router.get("/", async (req, res) => {
    try {
        const pets = await petsService.getAll()
        if (!pets) {
            res.status(202).json({ message: "No pets found: " });
        }
        res.json(pets);
    } catch (error) {
        console.error("Error consultando las mascotas");
        res.status(500).send({ error: "Error consultando las mascotas", message: error });
    }
})



router.post("/", async (req, res) => {
    const { name, type } = req.body;
    try {
        const result = await petsService.save({ name: name, type: type });
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo guardar la mascota." });
    }

})


router.get("/:word", async (req, res) => {
    try {
        // const pet = await petsService.findByName(req.params.word);
        const pet = req.pet
        if (!pet) {
            res.status(202).json({ message: "Mascota No encontrada con ese nombre: " + req.params.word });
        }
        res.json(pet);

    } catch (error) {
        console.error('Ocurrió un error:', error.message);
    }
})


router.put("/:word", async (req, res) => {
    try {
        const result = await petsService.update({ _id: req.pet._id }, { isAdopted: true });
        console.log(result);


        res.status(202).json(result);
    } catch (error) {
        console.error('Ocurrió un error:', error);
    }

})



// Ruta comodin
router.get("*", (req, res) => {
    res.status(404).json({ message: "Endpoint no encontrado." });
})





router.param('word', async (req, res, next, name) => {
    console.log("router.param - Buscando nombre de mascota con valor: " + name);
    try {
        let result = await petsService.findByName(name)
        if (!result) {
            req.pet = null;
            throw new Error("Mascota no encontrada")
        } else {
            req.pet = result;
        }
        next();
    } catch (error) {
        console.error('Ocurrió un error:', error.message);
        res.status(500).send({ error: "Error:", message: error.message });
    }
})

export default router;