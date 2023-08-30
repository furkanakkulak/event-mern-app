const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router
  .route('/events')
  .get(eventController.getAllEvents)
  .post(eventController.createEvent);

router
  .route('/events/:id')
  .get(eventController.getEventById)
  .put(eventController.updateEvent)
  .delete(eventController.deleteEvent);

router.post(
  '/upload-images/:eventId',
  upload.array('images', 5),
  eventController.uploadImages
);
router.delete('/delete-image/:eventId', eventController.deleteImage);

module.exports = router;
