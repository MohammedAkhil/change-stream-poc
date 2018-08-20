const express = require('express');
const router = express.Router();
const chatSchema = require('./schema');
const Event = require('../event/');

router.post('/add/', async (req, res) => {
  await chatSchema.create(req.body);
  res.send({ success: 'ok' });
});

router.get('/', (req, res) => {
  new Event(req, res, 'chat');
});

(async function initListener() {
  console.log('started');
  chatSchema.watch().on('change', data => {
    if (data.operationType === 'insert') {
      Event.pushMessage(data.fullDocument.message, 'chat');
    }
  });
})();

module.exports = router;
