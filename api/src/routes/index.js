const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Dog, Temperament } = require('../db');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiDogsInfo = async () => {
    const apiDogsURL = await axios.get('https://api.thedogapi.com/v1/breeds');
    const apiDogsInfo = await apiDogsURL.data.map(d => {
        return {
            id: d.id,
            name: d.name,
            image: d.image.url,
            temperament: d.temperament,
            weight: d.weight.metric,
            height: d.height.metric,
            life_span: d.life_span
        }
    })
    return apiDogsInfo;
};

const getDbDogsInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
};

const getAllDogs = async () => {
    const apiDogsInfo = await getApiDogsInfo();
    const dbDogsInfo = await getDbDogsInfo();
    const infoDogsTotal = apiDogsInfo.concat(dbDogsInfo);
    return infoDogsTotal;
};

router.get('/dogs', async (req, res) => {
    const name = req.query.name
    let dogsTotal = await getAllDogs();
    if (name) {
        let dogName = await dogsTotal.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
        dogName.length ? 
        res.status(200).send(dogName) : 
        res.status(404).send('Perro no encontrado');
    } else {
        res.status(200).send(dogsTotal);
    }
});

router.get('/temperament', async (req, res) => {
    const temperamentsApi = await axios('https://api.thedogapi.com/v1/breeds');
    const temperaments = temperamentsApi.data.map(d => d.temperament)
    const tempEach = temperaments.join().split(',');
    
    tempEach.forEach(d => {
        if(d !== ""){
            Temperament.findOrCreate({
                where: { name: d.trim() }
            })
        }
    })
    const allTemperaments = await Temperament.findAll();
    res.send(allTemperaments);
})

router.post('/dog', async (req, res) => {
    const { name, weight, height, life_span, temperament } = req.body
    let dogCreated = await Dog.create({
        name, 
        weight, 
        height, 
        life_span: `${life_span} years`
    })

    let temperamentDb = await Temperament.findAll({
        where: { name: temperament }
    })

    dogCreated.addTemperament(temperamentDb);
    res.send('Perro creado con exito');
})

router.get('/dogs/:id', async (req, res) => {
    const { id } = req.params
    const dogsTotal = await getAllDogs();
    if (id) {
        let dogId = await dogsTotal.filter(d => d.id == id);
        dogId ?
        res.status(200).json(dogId) :
        res.status(404).send('Id no encontrado')
    }
})

module.exports = router;
