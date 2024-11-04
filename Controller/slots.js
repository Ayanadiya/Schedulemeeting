const Slot= require('../Models/slots');
const Booking= require('../Models/booking');

exports.getSlots = async (req, res, next) => {
    try {
        const slots = await Slot.findAll();
        res.json(slots);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching slots', error });
    }
};

exports.bookSlot = async (req, res, next) => {
    const { name, email, slotTime } = req.body;
    try {
        const slot = await Slot.findOne({ where: { time: slotTime } });

        if (slot && slot.available > 0) {
            await Booking.create({ name, email, SlotId: slot.id });
            slot.available -= 1;
            await slot.save();
            res.status(200).json({ message: 'Slot booked successfully!' });
        } else {
            res.status(400).json({ message: 'Slot not available.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error booking slot', error });
    }
};

exports.cancelBooking = async (req, res) => {
    const bookingId = req.params.id;

    try {
        const booking = await Booking.destroy({
            where: { id: bookingId }
        });

        if (booking) {
            return res.status(200).json({ message: 'Booking canceled successfully' });
        } else {
            return res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        console.error('Error canceling booking:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}; 

exports.getBooking = async (req, res) => {
    try {
        const bookings = await Booking.findAll(); // Adjust according to your model
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};