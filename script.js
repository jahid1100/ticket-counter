const button = document.getElementById('buy-now');
const goTo = document.getElementById('main');

button.addEventListener('click', () => {
    goTo.scrollIntoView({ behavior: 'smooth' }); 
});


const paySection = document.querySelector('.ticket-counter');
const seatButtons = document.querySelectorAll('.bus-seats');
const seatLeft = document.getElementById('seat-left');
const checkedSeats = document.getElementById('checked-seats');
const seatName = document.getElementById('seat-name');
const total = document.getElementById('total');
const totalDiscount = document.getElementById('total-discount');
const discount = document.getElementById('discount');
const grandTotal = document.querySelector('.grand-total');
const takeCoupon = document.getElementById('take-coupon');
const takeInput = document.querySelector('.coupon-input');
const applyButton = document.getElementById('apply');
const confirmButton = document.getElementById('confirm');
const purchaseForm = document.getElementById('purchase');
const phoneNumberInput = document.getElementById('phone-number');
const main = document.querySelector('#main')
const success = document.getElementById('success');
const continueBtn = document.getElementById('continue');

continueBtn.addEventListener('click', ()=> {
    location.reload();
})

purchaseForm.addEventListener('submit', function(event) {
    event.preventDefault();
    main.style.display = 'none';
    success.style.display = 'flex';
});

confirmButton.disabled = true;

let selectedSeats = [];
let totalPrice = 0;
const maxSeats = 4;

function handleSeatButtonClick(button) {
    if (selectedSeats.length >= maxSeats) {
        alert(`You can't select more than ${maxSeats} seats.`);
        return;
    }

    if (selectedSeats.includes(button.textContent)) {
        return;
    }

    button.style.backgroundColor = '#00ff08';
    button.style.color = 'white';
    selectedSeats.push(button.textContent);
    totalPrice += 550;

    seatLeft.textContent = parseInt(seatLeft.textContent) - 1;
    checkedSeats.textContent = selectedSeats.length;

    seatName.textContent = selectedSeats.join(', ');

    updatePrice();

    takeCoupon.style.display = selectedSeats.length === maxSeats ? 'block' : 'none';
    
    enableConfirmButton();
}

seatButtons.forEach(button => {
    button.addEventListener('click', () => handleSeatButtonClick(button));
});

phoneNumberInput.addEventListener('input', enableConfirmButton);


function enableConfirmButton() {
    const condition = selectedSeats.length === parseInt(checkedSeats.textContent) && phoneNumberInput.value.trim() !== '';

    confirmButton.disabled = !condition;
}





function updateGrand() {
    if (takeInput.value === "NEW15") {
        grandTotal.textContent = totalPrice - (totalPrice * 0.15);
        totalDiscount.style.display = 'flex';
        discount.textContent = totalPrice * 0.15;
        takeCoupon.style.display = 'none';
    } else if (takeInput.value === "Couple20") {
        grandTotal.textContent = totalPrice - (totalPrice * 0.20);
        totalDiscount.style.display = 'flex';
        discount.textContent = totalPrice * 0.20;
        takeCoupon.style.display = 'none';
    } else {
        alert('Invalid Coupon Code!!');
    }
}

function updatePrice() {
    total.textContent = totalPrice;
    grandTotal.textContent = totalPrice;
}
