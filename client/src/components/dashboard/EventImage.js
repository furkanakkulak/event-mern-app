import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEvent } from '@/context';
import { Image } from '@mui/icons-material';

export default function EventImage({ data, id }) {
  const { uploadImages, deleteImage } = useEvent();

  const [open, setOpen] = React.useState(false);
  const [images, setImages] = React.useState(data);
  const [selectedImages, setSelectedImages] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImages([]);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const selectedFiles = files.slice(0, 5); // Only allow the first 5 files
    setSelectedImages(selectedFiles);
  };

  const handleSubscribe = () => {
    if (selectedImages.length > 0) {
      uploadImages(id, selectedImages)
        .then((uploadedImages) => {
          setImages(uploadedImages);
          setSelectedImages([]);
        })
        .catch((error) => {
          console.error('Error uploading images:', error);
        });
    }
  };

  const handleDeleteImage = (img) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this image?'
    );
    if (confirmDelete) {
      deleteImage(id, img).then((res) => {
        setImages(images.filter((event) => event !== img));
      });
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
      >
        <Image />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Event Image Settings</DialogTitle>
        <DialogContent>
          <DialogContentText className="mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ipsa
            excepturi facere veritatis ad sit.
          </DialogContentText>
          {open && images && (
            <div className="grid grid-cols-3 gap-3">
              {images.map((event, index) => (
                <img
                  key={index}
                  className=" ratio-1/1 h-full object-cover"
                  src={`http://localhost:4000/images/${event}`}
                  onClick={() => {
                    handleDeleteImage(event);
                  }}
                />
              ))}
            </div>
          )}
          <input
            className="mt-5"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubscribe}
            disabled={selectedImages.length === 0}
          >
            Upload Images
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
