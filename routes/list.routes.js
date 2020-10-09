const express = require('express');
const {
  create,
  findAll,
  findOne,
  update,
  remove,
  count,
} = require('../controllers/list.controller');

const router = express.Router();

router.route('/').post(create).get(findAll);
router.route('/count').get(count);
router.route('/:id').get(findOne).put(update).delete(remove);

module.exports = router;
