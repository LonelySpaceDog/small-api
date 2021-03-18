const router = require('express').Router();
const prodController = require(`${__dirname}/../controllers/prodController`)

router.route('/')
    .get(prodController.getAllProd)
    .post(prodController.createProd);

router
    .route('/:slug')
    .get(prodController.getProd)
    .patch(prodController.updateProd)
    .delete(prodController.deleteProd);

module.exports = router;
