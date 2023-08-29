import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEvent } from '@/context';
import { useRouter } from 'next/router';

export default function AddEvent() {
  const { addEvent } = useEvent();
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [eventData, setEventData] = React.useState({
    name: '',
    description: '',
    startDate: null,
    endDate: null,
    city: '',
    address: '',
    location: '',
    maps: '',
    category: 'concerts',
    free: true,
    ticketPrices: [
      {
        category: 'Standart',
        price: null,
      },
      {
        category: 'VIP',
        price: null,
      },
    ],
  });

  const handleFreeChange = () => {
    const data = eventData;
    setEventData((prevData) => ({ ...prevData, free: !prevData.free }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setEventData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleDateChange = (date, field) => {
    // Convert the date to ISO 8601 format manually
    const isoDate = date.toISOString();
    setEventData((prevData) => ({ ...prevData, [field]: isoDate }));
  };

  const handleTicketPriceChange = (index, field, value) => {
    const updatedTicketPrices = [...eventData.ticketPrices];
    updatedTicketPrices[index][field] = value;
    setEventData((prevData) => ({
      ...prevData,
      ticketPrices: updatedTicketPrices,
    }));
  };

  const handleCategoryChange = (event) => {
    setEventData((prevData) => ({
      ...prevData,
      category: event.target.value,
    }));
  };

  const isFormValid = () => {
    const {
      name,
      description,
      startDate,
      endDate,
      city,
      address,
      location,
      free,
      ticketPrices,
    } = eventData;

    return (
      name.trim() !== '' &&
      description.trim() !== '' &&
      startDate !== null &&
      endDate !== null &&
      city.trim() !== '' &&
      address.trim() !== '' &&
      location.trim() !== '' &&
      ticketPrices.every((ticketPrice) => ticketPrice.price !== null)
    );
  };

  const handleSubmit = () => {
    addEvent(eventData).then((res) => {
      router.push(`/dashboard?search=${res._id}`);
      handleClose();
    });
  };

  return (
    <>
      <div className="flex w-full justify-end">
        <Button
          variant="outlined"
          onClick={handleClickOpen}
        >
          Add Event
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <DialogContentText className="mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ipsa
            excepturi facere veritatis ad sit.
          </DialogContentText>
          <FormControl fullWidth>
            <div className="mt-5">
              <InputLabel
                className="text-sm"
                id="category-label"
              >
                Category
              </InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={eventData.category}
                onChange={handleCategoryChange}
                defaultValue={eventData.category}
                fullWidth
              >
                <MenuItem value="concerts">Concerts</MenuItem>
                <MenuItem value="theaters">Theaters</MenuItem>
                <MenuItem value="sports">Sports</MenuItem>
              </Select>
            </div>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={eventData.name}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={eventData.description}
              onChange={handleChange}
            />
            <div className="mt-5 flex w-full justify-between items-center">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  autoFocus
                  margin="dense"
                  id="startDate"
                  label="Start Date"
                  value={eventData.startDate}
                  onChange={(date) => handleDateChange(date, 'startDate')}
                />
                <p>-</p>
                <DateTimePicker
                  autoFocus
                  margin="dense"
                  id="endDate"
                  label="End Date"
                  value={eventData.endDate}
                  onChange={(date) => handleDateChange(date, 'endDate')}
                />
              </LocalizationProvider>
            </div>
            <TextField
              autoFocus
              margin="dense"
              id="city"
              label="City"
              type="text"
              fullWidth
              variant="standard"
              value={eventData.city}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="address"
              label="Address"
              type="text"
              fullWidth
              variant="standard"
              value={eventData.address}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="location"
              label="Location"
              type="text"
              fullWidth
              variant="standard"
              value={eventData.location}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="maps"
              label="Maps URL"
              type="text"
              fullWidth
              variant="standard"
              value={eventData.maps}
              onChange={handleChange}
            />
            <div>
              <label>
                Free:{' '}
                <input
                  type="checkbox"
                  defaultChecked={eventData.free}
                  onChange={handleFreeChange}
                />
              </label>
            </div>
            {eventData.ticketPrices.map((ticketPrice, index) => (
              <div key={index}>
                <TextField
                  autoFocus
                  margin="dense"
                  id={`ticketPriceCategory-${index}`}
                  label={`${ticketPrice.category} Ticket Price`}
                  type="number"
                  fullWidth
                  variant="standard"
                  value={ticketPrice.price}
                  onChange={(e) =>
                    handleTicketPriceChange(index, 'price', e.target.value)
                  }
                />
              </div>
            ))}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid()}
          >
            Add Event
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
