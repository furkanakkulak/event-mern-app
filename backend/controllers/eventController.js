const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs').promises;
const Joi = require('joi');
const Event = require('../models/Event');
const dotenv = require('dotenv');
dotenv.config();

const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET,
});
const bucket = admin.storage().bucket();

exports.getAllEvents = async (req, res) => {
  try {
    const query = req.query.type;
    let events;

    if (query === 'past') {
      events = await Event.find({ startDate: { $lt: new Date() } });
    } else if (query === 'future') {
      events = await Event.find({ startDate: { $gte: new Date() } });
    } else {
      events = await Event.find();
    }

    if (events.length === 0) {
      return res.status(404).json({ error: 'No events found.' });
    }

    const updatedEvents = await Promise.all(
      events.map(async (event) => {
        const now = new Date();
        const eventStartDate = new Date(event.startDate);
        const type = now < eventStartDate ? 'future' : 'past';

        const imagePromises = event.images.map(async (imageName) => {
          const imagePath = `images/${imageName}`;
          const file = bucket.file(imagePath);

          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 1);

          const [url] = await file.getSignedUrl({
            action: 'read',
            expires: expirationDate.toISOString(),
          });

          return {
            imageName,
            imageUrl: url,
          };
        });

        const eventImages = await Promise.all(imagePromises);

        return {
          ...event.toObject(),
          type,
          images: eventImages,
        };
      })
    );

    res.status(200).json(updatedEvents);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching events.' });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    const currentDate = new Date();
    let eventType = '';

    if (event.startDate < currentDate) {
      eventType = 'past';
    } else if (event.startDate >= currentDate) {
      eventType = 'future';
    }
    const imagePromises = event.images.map(async (imageName) => {
      const imagePath = `images/${imageName}`;
      const file = bucket.file(imagePath);

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1);

      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: expirationDate.toISOString(),
      });

      return {
        imageName,
        imageUrl: url,
      };
    });

    const eventImages = await Promise.all(imagePromises);

    res
      .status(200)
      .json({ ...event.toObject(), type: eventType, images: eventImages });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the event.' });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
      city: Joi.string().required(),
      address: Joi.string().required(),
      maps: Joi.string().required(),
      location: Joi.string().required(),
      category: Joi.string().required(),
      free: Joi.boolean().required(),
      ticketPrices: Joi.when('free', {
        is: false,
        then: Joi.array()
          .items(
            Joi.object({
              category: Joi.string().required(),
              price: Joi.number().required(),
            })
          )
          .required(),
        otherwise: Joi.array(),
      }),
    });

    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = {};
      for (const detail of error.details) {
        errors[detail.context.key] = detail.message;
      }
      return res.status(400).json({ errors });
    }

    const newEvent = new Event(value);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create the event.' });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
      city: Joi.string().required(),
      address: Joi.string().required(),
      maps: Joi.string().required(),
      location: Joi.string().required(),
      category: Joi.string().required(),
      free: Joi.boolean().required(),
      ticketPrices: Joi.when('free', {
        is: false,
        then: Joi.array()
          .items(
            Joi.object({
              category: Joi.string().required(),
              price: Joi.number().required(),
            })
          )
          .required(),
        otherwise: Joi.array(),
      }),
    });

    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = {};
      for (const detail of error.details) {
        errors[detail.context.key] = detail.message;
      }
      return res.status(400).json({ errors });
    }

    const imagePromises = event.images.map(async (imageName) => {
      const imagePath = `images/${imageName}`;
      const file = bucket.file(imagePath);

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1);

      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: expirationDate.toISOString(),
      });

      return {
        imageName,
        imageUrl: url,
      };
    });

    const eventImages = await Promise.all(imagePromises);

    res.status(200).json({
      ...event.toObject(),
      images: eventImages,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update the event.' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the event.' });
  }
};

exports.uploadImages = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const imagePromises = req.files.map(async (file) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      const imageName = uniqueSuffix + extension;

      // Firebase Storage'a yükle
      const fileRef = bucket.file(`images/${imageName}`);
      const metadata = {
        contentType: file.mimetype,
      };
      await fileRef.save(file.buffer, {
        metadata: metadata,
      });

      return imageName;
    });

    const imageNames = await Promise.all(imagePromises);

    event.images.push(...imageNames);
    await event.save();

    const eventImages = await Promise.all(
      event.images.map(async (imageName) => {
        const imagePath = `images/${imageName}`;
        const file = bucket.file(imagePath);

        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);

        const [url] = await file.getSignedUrl({
          action: 'read',
          expires: expirationDate.toISOString(),
        });

        return {
          imageName,
          imageUrl: url,
        };
      })
    );

    res.status(200).json({
      ...event.toObject(),
      images: eventImages,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { imageName } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const imagePath = `images/${imageName}`;

    await bucket.file(imagePath).delete();

    event.images = event.images.filter((image) => image !== imageName);
    await event.save();

    const eventImages = await Promise.all(
      event.images.map(async (imageName) => {
        const imagePath = `images/${imageName}`;
        const file = bucket.file(imagePath);

        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);

        const [url] = await file.getSignedUrl({
          action: 'read',
          expires: expirationDate.toISOString(),
        });

        return {
          imageName,
          imageUrl: url,
        };
      })
    );

    res.status(200).json({
      ...event.toObject(),
      images: eventImages,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
