import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEvent } from '@/context';
import { Image } from '@mui/icons-material';

export default function EventImage({ id, handleUpdate }) {
  const { uploadImages, deleteImage, getEventById } = useEvent();

  const [open, setOpen] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [selectedImages, setSelectedImages] = React.useState([]);

  const handleClickOpen = () => {
    getEventById(id).then((res) => {
      setOpen(true);
      setImages(res.images);
    });
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImages([]);
    setImages([]);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const selectedFiles = files.slice(0, 5);
    setSelectedImages(selectedFiles);
  };

  const handleImageUpload = () => {
    if (selectedImages.length > 0) {
      uploadImages(id, selectedImages)
        .then((uploadedImages) => {
          setImages(uploadedImages);
          handleUpdate(uploadedImages);
          setSelectedImages([]);
          handleClose();
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
      deleteImage(id, img['imageName']).then((res) => {
        setImages(images.filter((event) => event !== img));
        handleUpdate(images.filter((event) => event !== img));
      });
    }
  };

  return (
    <div>
      <Button
        className="w-full h-full"
        variant="outlined"
        onClick={handleClickOpen}
      >
        <Image />
      </Button>
      {images && (
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogTitle className="bg-light-bg dark:bg-dark-bg text-light-txt dark:text-dark-txt">
            Event Image Settings
          </DialogTitle>
          <DialogContent className="bg-light-bg dark:bg-dark-bg text-light-txt dark:text-dark-txt">
            <DialogContentText className="mb-5 text-light-txt dark:text-dark-txt">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              ipsa excepturi facere veritatis ad sit.
            </DialogContentText>
            {open && images && images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 dark:bg-[#222222] rounded-2xl p-2">
                {images.map((event, index) => (
                  <img
                    key={index}
                    className=" ratio-1/1 h-full object-cover rounded-2xl"
                    src={event.imageUrl}
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
          <DialogActions className="bg-light-bg dark:bg-dark-bg text-light-txt dark:text-dark-txt">
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={handleImageUpload}
              disabled={selectedImages.length === 0}
            >
              Upload Images
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
