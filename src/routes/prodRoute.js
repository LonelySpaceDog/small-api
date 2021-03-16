const router = require('express').Router();
const prodController = require(`${__dirname}/../controllers/prodController`)

router.route('/').get(prodController.getAllProd)

router.route('/:slug').get(prodController.getProd);

module.exports = router;
