const laundrylocal = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

let schedule = {};
let currentDate = new Date().toISOString().split('T')[0];
let selectedTimeIndex = null;
let selectedMachineIndex = null;
let editMode = false;

const datePicker = document.getElementById('datePicker');
const table = document.getElementById('scheduleTable');
const tbody = table.querySelector('tbody');
const bookingForm = document.getElementById('bookingForm');
const formTitle = document.getElementById('formTitle');
const form = document.getElementById('form');
const roomInput = document.getElementById('room');
const nameInput = document.getElementById('name');

datePicker.value = currentDate;
datePicker.addEventListener('change', () => {
    currentDate = datePicker.value;
    loadSchedule();
    renderTable();
});

form.addEventListener('submit', saveBooking);

function initializeEmptySchedule() {
    return timeSlots.map(() => laundrylocal.map(() => null));
}

function loadSchedule() {
    const saved = localStorage.getItem('schedule');
    schedule = saved ? JSON.parse(saved) : {};
    if (!schedule[currentDate]) {
        schedule[currentDate] = initializeEmptySchedule();
    }
}

function saveToLocalStorage() {
    localStorage.setItem('schedule', JSON.stringify(schedule));
}

function renderTable() {
    tbody.innerHTML = '';
    const headerRow = table.querySelector('thead tr');
    headerRow.innerHTML = '<th>Időpont</th>';
    laundrylocal.forEach(wash => {
        const th = document.createElement('th');
        th.textContent = wash;
        headerRow.appendChild(th);
    });

    schedule[currentDate].forEach((row, timeIndex) => {
        const tr = document.createElement('tr');
        const timeCell = document.createElement('td');
        timeCell.textContent = timeSlots[timeIndex];
        tr.appendChild(timeCell);

        row.forEach((booking, machineIndex) => {
            const td = document.createElement('td');
            if (booking) {
                td.innerHTML = `
                    <div><strong>Szoba:</strong> ${booking.room}</div>
                    <div><strong>Név:</strong> ${booking.name}</div>
                    <button onclick="editBooking(${timeIndex}, ${machineIndex})">Módosítás</button>
                    <button onclick="deleteBooking(${timeIndex}, ${machineIndex})">Törlés</button>
                `;
            } else {
                const button = document.createElement('button');
                button.textContent = 'Hozzáadás';
                button.onclick = () => addBooking(timeIndex, machineIndex);
                td.appendChild(button);
            }
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

function addBooking(timeIndex, machineIndex) {
    showForm(false, timeIndex, machineIndex);
}

function editBooking(timeIndex, machineIndex) {
    showForm(true, timeIndex, machineIndex);
    const booking = schedule[currentDate][timeIndex][machineIndex];
    roomInput.value = booking.room;
    nameInput.value = booking.name;
}

function deleteBooking(timeIndex, machineIndex) {
    if (confirm('Biztosan törölni szeretnéd a foglalást?')) {
        schedule[currentDate][timeIndex][machineIndex] = null;
        saveToLocalStorage();
        renderTable();
    }
}

function showForm(isEdit, timeIndex, machineIndex) {
    editMode = isEdit;
    selectedTimeIndex = timeIndex;
    selectedMachineIndex = machineIndex;
    formTitle.textContent = editMode ? 'Foglalás Módosítása' : 'Új Foglalás';
    bookingForm.style.display = 'block';
}

function saveBooking(e) {
    e.preventDefault();
    const room = roomInput.value.trim();
    const name = nameInput.value.trim();

    if (!room || !name) return;

    schedule[currentDate][selectedTimeIndex][selectedMachineIndex] = { room, name };
    saveToLocalStorage();
    bookingForm.style.display = 'none';
    form.reset();
    renderTable();
}

function cancelBooking() {
    bookingForm.style.display = 'none';
    form.reset();
}

// Kezdéskor
loadSchedule();
renderTable();
