document.addEventListener('DOMContentLoaded', () => {
    fetchAvailableSlots();
    fetchBookings();
});

function fetchAvailableSlots() {
    axios.get('http://127.0.0.1:3000/slots')
        .then(response => {
            const slots = response.data;
            const slotsContainer = document.getElementById('slots');
            slotsContainer.innerHTML = '';

            slots.forEach(slot => {
                const slotDiv = document.createElement('div');
                slotDiv.className = 'slot';
                slotDiv.innerHTML = `
                    <strong>${slot.time}</strong> - ${slot.available} slots available
                    <button onclick="showBookingForm('${slot.time}')">Book</button>
                `;
                slotsContainer.appendChild(slotDiv);
            });
        })
        .catch(err => {
            console.error('Error fetching slots:', err);
        });
}

function showBookingForm(slotTime) {
    document.getElementById('bookingFormContainer').classList.remove('hidden');
    document.getElementById('slotTime').value = slotTime;
}

document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const slotTime = document.getElementById('slotTime').value;

    axios.post('http://127.0.0.1:3000/book', { name, email, slotTime })
        .then(response => {
            alert('Slot booked successfully!');
            addBookingToList({ name, email, slotTime });
            fetchAvailableSlots();
            this.reset();
            document.getElementById('bookingFormContainer').classList.add('hidden');
        })
        .catch(err => {
            console.error(err);
        });
});

function addBookingToList(booking) {
    const bookingList = document.getElementById('bookingList');
    const listItem = document.createElement('li');
    listItem.textContent = `${booking.name} (${booking.email}) booked ${booking.slotTime}`;
    const dltbtn=document.createElement('button');
    dltbtn.textContent='Cancel';
    dltbtn.onclick= () => cancelBooking(booking.id);
    bookingList.appendChild(listItem);
}

function cancelBooking(bookingId) {
    axios.delete(`http://127.0.0.1:3000/cancel-booking/${bookingId}`)
        .then(response => {
            console.log(response.data.message);
            document.getElementById(`booking-${bookingId}`).remove();
        })
        .catch(error => {
            console.error('Error canceling booking:', error);
            alert('Failed to cancel booking. Please try again.');
        });
}


function fetchBookings() {
    axios.get('http://127.0.0.1:3000/bookings')
        .then(response => {
            const bookings = response.data;
            const bookingList = document.getElementById('booking-list');
            bookingList.innerHTML = '';

            bookings.forEach(booking => {
                const li = document.createElement('li');
                li.id = `booking-${booking.id}`;
                li.innerHTML = `
                    <h3>Booking for: ${booking.name}</h3>
                    <p>Slot Time: ${booking.slot.time}</p>
                    <button onclick="cancelBooking(${booking.id})">Cancel</button>
                `;
                bookingList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching bookings:', error);
            alert('Failed to load bookings. Please try again.');
        });
}

