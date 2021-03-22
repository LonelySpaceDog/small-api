const router = require('express').Router();
const prodController = require(`${__dirname}/../controllers/prodController`);
const authController = require(`${__dirname}/../controllers/authController`);

router.route('/top5').get(prodController.aliasTop5, prodController.getAllProd);

router.route('/categories').get(prodController.getAllCategories);

router
  .route('/')
  .get(prodController.getAllProd)
  .post(authController.protect, prodController.createProd);

router
  .route('/:id')
  .get(prodController.getProd)
  .patch(authController.protect, prodController.updateProd)
  .delete(authController.protect, prodController.deleteProd);

module.exports = router;
