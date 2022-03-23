const router = require("express").Router();
const { GoodieBag } = require("../db/GoodieBag");

//GET /api/goodiebag/:id
router.get("/goodiebag/:id", async (req, res, next) => {
  try {
    res.send(await GoodieBag.findByPk(req.params.id));
  } catch (err) {
    next(err);
  }
});
router.get("/goodiebag", async (req, res, next) => {
  try {
    res.send(await GoodieBag.findAll());
  } catch (error) {
    next(error);
  }
});

router.post("/goodiebag", async (req, res, next) => {
  try {
    res.status(201).send(await GoodieBag.create(req.body));
    console.log(req.body);
  } catch (error) {
    next(error);
  }
});

router.delete("/goodiebag/:id", async (req, res, next) => {
  try {
    const goodieToDelete = await GoodieBag.findByPk(req.params.id);
    await goodieToDelete.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
