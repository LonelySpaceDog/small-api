const router = require('express').Router();
const prodController = require(`${__dirname}/../controllers/prodController`);

router.route('/top5').get(prodController.aliasTop5, prodController.getAllProd);

router.route('/categories').get(prodController.getAllCategories);

router
  .route('/')
  .get(prodController.getAllProd)
  .post(prodController.createProd);

router
  .route('/:id')
  .get(prodController.getProd)
  .patch(prodController.updateProd)
  .delete(prodController.deleteProd);

module.exports = router;
