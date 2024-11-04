const express = require('express');
const router = express.Router();
const slotController = require('../Controller/slots');

router.get('/slots', slotController.getSlots);
router.post('/book', slotController.bookSlot);
router.delete('/cancel-booking/:id', slotController.cancelBooking);
router.get('/bookings', slotController.bookSlot);

module.exports = router;