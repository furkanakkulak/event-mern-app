const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const API_BASE_URL = 'http://localhost:4000/api';

const getRandomImages = (imageDir, count) => {
  const imageFiles = fs.readdirSync(imageDir);
  const selectedImages = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * imageFiles.length);
    selectedImages.push(path.join(imageDir, imageFiles[randomIndex]));
    imageFiles.splice(randomIndex, 1);
  }

  return selectedImages;
};

const uploadImage = async (eventId, imagePath) => {
  try {
    const imageBuffer = await sharp(imagePath)
      .resize({ width: 800 })
      .toBuffer();

    console.log('imageBuffer size:', imageBuffer.length);

    const imageType = path.extname(imagePath).toLowerCase();
    const blobImage = new Blob([imageBuffer], {
      type: `image/${imageType === '.png' ? 'png' : 'jpeg'}`,
    });

    const formData = new FormData();
    formData.append('images', blobImage, path.basename(imagePath));

    const response = await axios.post(
      `${API_BASE_URL}/upload-images/${eventId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log(`Image uploaded for event with ID ${eventId}:`, response.data);
  } catch (error) {
    console.error(
      `Error uploading image for event with ID ${eventId}:`,
      error.response ? error.response.data : error.message
    );
  }
};

const main = async () => {
  try {
    const eventsResponse = await axios.get(`${API_BASE_URL}/events`);
    const events = eventsResponse.data;

    const imageDir = path.join(__dirname, 'images');

    for (const event of events) {
      if (event.category === 'theaters') {
        const selectedImages = getRandomImages(imageDir, 5);
        for (const selectedImagePath of selectedImages) {
          await uploadImage(event._id, selectedImagePath);
        }
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

main();
