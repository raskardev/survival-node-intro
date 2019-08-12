const router = require('express').Router();
const db = require('../../db');

const createSurvivorsService = require('./service');
const survivorsService = createSurvivorsService(db);

const createWeaponsService = require('../weapons/service');
const weaponsService = createWeaponsService(db);

router.get('/', async function(req, res) {
  try {
    const survivors = await survivorsService.findAll();

    return res.json({ data: survivors });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/:id', async function(req, res) {
  const id = req.params.id;
  try {
    const survivor = await survivorsService.findById(id);

    return res.json({ data: survivor });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/add', async function(req, res) {
  const data = req.body;
  try {
    const createdSurvivor = await survivorsService.create(data);

    return res.json({ data: createdSurvivor });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put('/:id', async function(req, res) {
  const id = req.params.id;
  const data = req.body;

  try {
    const updatedSurvivor = await survivorsService.update(id, data);

    return res.json({ data: updatedSurvivor });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put('/:id/add-weapon', async function(req, res) {
  const id = req.params.id;
  const weaponId = req.body;
  try {
    await weaponsService.addWeapon(id, weaponId);
    const updatedSurvivor = await survivorsService.findById(id);

    return res.json(updatedSurvivor);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete('/:id', async function(req, res) {
  const id = req.params.id;
  try {
    const deletedSurvivor = await survivorsService.remove(id);

    return deletedSurvivor;
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
