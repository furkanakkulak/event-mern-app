const express = require('express');
const router = express.Router();
const path = require('path');
const eventController = require('../controllers/eventController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Specify the directory where the images will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

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
