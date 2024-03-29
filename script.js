let seats = document.querySelectorAll('.seat');
let seatLeft = document.getElementById('seat-left');
let sumOfTotalPrice = document.getElementById('sum-total');
let ticketPrice = 0;
let DiscountPrice = 0;
let selectedSeatsInfo = [];
let couponApplied = false;

function scrollToTicketSection() {
    var priceSection = document.getElementById('price-section');
    priceSection.scrollIntoView({ behavior: 'smooth' });
}

for (let i = 0; i < seats.length; i++) {
    seats[i].addEventListener('click', function () {
        let isSelected = this.classList.contains('selected');
        let selectedSeats = document.querySelectorAll('.seat.selected');

        if (isSelected) {
            this.classList.remove('selected');
            this.style.backgroundColor = '';
            this.style.color = '';
            removeSeatInfo(this.innerText);
        } else {
            if (selectedSeats.length >= 4) {
                alert("Sorry! You can't select more than 4 seats");
            } else {
                this.classList.add('selected');
                this.style.backgroundColor = '#1DD100';
                this.style.color = 'white';
                let seatNumber = this.innerText;
                let seatClass = "Business";
                let seatPrice = 550;
                addSeatInfo(seatNumber, seatClass, seatPrice);
            }
        }
        updateUI();
    });
}

function addSeatInfo(seatNumber, seatClass, seatPrice) {
    if (selectedSeatsInfo.length >= 4) {
        selectedSeatsInfo.shift();
    }
    selectedSeatsInfo.push(`${seatNumber} <span class="info-gap"></span> ${seatClass} <span class="info-gap"></span> ${seatPrice}`);
}

function removeSeatInfo(seatNumber) {
    selectedSeatsInfo = selectedSeatsInfo.filter(info => !info.includes(seatNumber));
}

function updateUI() {
    let availableSeat = seats.length - document.querySelectorAll('.seat.selected').length;
    seatLeft.innerText = availableSeat;
    let totalSeatSelected = document.querySelectorAll('.seat.selected').length;
    document.getElementById('selected-seat').innerText = totalSeatSelected;

    const ticketInformation = document.getElementById('ticket-info');
    ticketInformation.innerHTML = selectedSeatsInfo.join('<br>');
    ticketInformation.style.height = '100px';

    let Form = document.getElementById('form');
    let priceCouponSection = document.getElementById('price-section');
    let totalPrice = document.getElementById('total-price');
    Form.style.marginTop = '35px';
    priceCouponSection.style.height = '340px';
    totalPrice.style.marginTop = '12px';
    totalPrice.style.marginBottom = '12px';

    let seatClass = "Business";
    let seatPrice = 550;

    const cost = document.createElement('p');
    ticketPrice = totalSeatSelected * seatPrice;
    cost.innerText = "BDT" + '  ' + ticketPrice;
    sumOfTotalPrice.innerHTML = '';
    sumOfTotalPrice.appendChild(cost);
}

let applyCoupon = document.getElementById('apply-btn');
applyCoupon.style.backgroundColor = 'gray'; 
applyCoupon.addEventListener('click', function () {
    if (couponApplied) {
        alert("You've already applied a coupon.");
        return;
    }

    let couponElement = document.getElementById('coupon');
    let couponCode = couponElement.value.split(" ").join("");

    let grandTotalValue = 0;

    if (couponCode === "NEW15") {
        DiscountPrice = ticketPrice * 0.15;
        grandTotalValue = ticketPrice - DiscountPrice;
        alert('Coupon Code Applied Successfully');
    } else if (couponCode === "Couple20") {
        DiscountPrice = ticketPrice * 0.2;
        grandTotalValue = ticketPrice - DiscountPrice;
        alert('Coupon Code Applied Successfully');
    } else {
        alert("Your given coupon code is invalid! Please give a valid coupon code");
        return;
    }

    let grandTotal = document.getElementById('grand-total');
    grandTotal.innerHTML = '';
    let totalCost = document.createElement('p');
    totalCost.innerHTML = "BDT" + ' ' + grandTotalValue;
    grandTotal.appendChild(totalCost);
    grandTotal.style.display = 'flex';

    let showDiscount = document.getElementById('show-discount');
    showDiscount.innerHTML = '';
    let discountTag = document.createElement('p');
    discountTag.innerHTML = "Discount Price" + ' ' + ":" + ' ' + "BDT" + ' ' + DiscountPrice;
    discountTag.style.color = 'red';
    showDiscount.appendChild(discountTag);
    discountTag.style.marginLeft = '55px';

    applyCoupon.style.backgroundColor = '#1DD100';
    applyCoupon.disabled = true;

    setTimeout(function () {
        applyCoupon.style.backgroundColor = 'gray';
        applyCoupon.disabled = false;
        couponElement.value = '';
        couponApplied = true;
    }, 1500);
});

let nextButton = document.getElementById('next-btn');
nextButton.addEventListener('click', function () {
    let allSection = document.getElementById('all-section');
    let footerSection = document.getElementById('footer-section');
    footerSection.classList.add('hidden');
    allSection.classList.add('hidden');

    let successSection = document.getElementById('success-section');
    successSection.classList.remove('hidden');

    let continueBtn = document.getElementById('continue-btn');
    continueBtn.addEventListener('click', function () {
        allSection.classList.remove('hidden');
        successSection.classList.add('hidden');
        footerSection.classList.remove('hidden');
        couponApplied = false;
        applyCoupon.disabled = false;
        applyCoupon.classList.remove('disabled-button');
    });
});
