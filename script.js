let seats = document.querySelectorAll('.seat');
        let seatLeft = document.getElementById('seat-left');
        let sumOfTotalPrice = document.getElementById('sum-total');
        let ticketPrice = 0;
        let DiscountPrice = 0;
        let selectedSeatsInfo = [];
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
        Form.style.marginTop = '27px';
        priceCouponSection.style.height = '335px';
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
        applyCoupon.addEventListener('click', function () {
            let couponElement = document.getElementById('coupon').value;
            let couponCode = couponElement.split(" ").join("");

            let grandTotalValue = 0;
            if (couponCode === "NEW15") {
                DiscountPrice = ticketPrice * 0.15;
                grandTotalValue = ticketPrice - DiscountPrice;
            } else if (couponCode === "Couple20") {
                DiscountPrice = ticketPrice * 0.2;
                grandTotalValue = ticketPrice - DiscountPrice;
            } 
            else {
                alert("Your given coupon code is invalid! Please give a valid coupon code");
                return;
            }

            let grandTotal = document.getElementById('grand-total');
            grandTotal.innerHTML = '';
            let totalCost = document.createElement('p');
            totalCost.innerHTML = "BDT" + ' <span class="info-gap"></span> ' + grandTotalValue;
            grandTotal.appendChild(totalCost);
            let showDiscount = document.getElementById('show-discount');
            showDiscount.innerHTML = '';
            let discountTag = document.createElement('p');
            discountTag.innerHTML = "Discount Price:" + ' <span class="info-gap"></span> ' + DiscountPrice;
            discountTag.style.color = 'red';
            showDiscount.appendChild(discountTag);
            discountTag.style.marginLeft = '55px';
        });
      let nextButton = document.getElementById('next-btn');
nextButton.addEventListener('click', function () {
    let allSection = document.getElementById('all-section');
    allSection.classList.add('hidden');

    let successSection = document.getElementById('success-section');
    successSection.classList.remove('hidden');

 let continueBtn = document.getElementById('continue-btn');
    continueBtn.addEventListener('click', function(){
     allSection.classList.remove('hidden');
     successSection.classList.add('hidden');
    })
});

   