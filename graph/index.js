const GraphSchema = require('./schema');
const logger = require('../utils/logger').logger;
const express = require('express');
const router = express.Router();
const Event = require('../event/');

router.post('/add/', async (req, res) => {
  await GraphSchema.create(req.body);
  res.send({ success: 'ok' });
});

router.get('/', (req, res) => {
  new Event(req, res, 'graph');
});

(async function initListener() {
  GraphSchema.watch().on('change', data => {
    if (isInserted(data)) {
      Event.pushMessage(createPoint(data), 'graph');
    }
  });
})();

const isInserted = data => data.operationType === 'insert';

const createPoint = data => ({
  x: data.fullDocument.x,
  y: data.fullDocument.y,
});

module.exports = router;
