const router = require('express').Router();
const db = require('../../db');

const createWeaponsService = require('./service');
const weaponsService = createWeaponsService(db);

router.get('/', async function(req, res) {
  try {
    const weapons = await weaponsService.findAll();

    return res.json({ data: weapons });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/:id', async function(req, res) {
  const id = req.params.id;
  try {
    const weapon = await weaponsService.findById(id);

    return res.json({ data: weapon });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/add', async function(req, res) {
  const data = req.body;
  try {
    const createdWeapon = await weaponsService.create(data);

    return res.json({ data: createdWeapon });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put('/:id', async function(req, res) {
  const id = req.params.id;
  const data = req.body;
  try {
    const updatedProduct = await weaponsService.update(id, data);

    return updatedProduct;
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete('/:id', async function(req, res) {
  const id = req.params.id;
  try {
    const deletedProduct = await weaponsService.remove(id);

    return deletedProduct;
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
