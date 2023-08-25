const fs = require('fs');
const path = require('path');
const Joi = require('joi');
const Event = require('../models/Event');

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

    res.status(200).json(events);
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

    res.status(200).json({ ...event.toObject(), type: eventType });
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
      ticketPrices: Joi.array().items(
        Joi.object({
          category: Joi.string().required(),
          price: Joi.number().required(),
        })
      ),
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
      ticketPrices: Joi.array().items(
        Joi.object({
          category: Joi.string().required(),
          price: Joi.number().required(),
        })
      ),
    });

    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = {};
      for (const detail of error.details) {
        errors[detail.context.key] = detail.message;
      }
      return res.status(400).json({ errors });
    }

    res.status(200).json(event);
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

    const imageNames = req.files.map((file) => file.filename);

    event.images.push(...imageNames);
    await event.save();

    res.status(200).json(event);
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

    event.images = event.images.filter((image) => image !== imageName);
    await event.save();

    const imagePath = path.join('public/images', imageName);
    fs.unlinkSync(imagePath);

    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
