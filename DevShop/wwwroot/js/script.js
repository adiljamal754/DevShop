'use strict';

const requestURL = "https://localhost:7200/api/Products"

// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function
const modalCloseFunc = function () { modal.classList.add('closed') }

// modal eventListener
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);





// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});





// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  }

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);

}





// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}




const openModal = document.querySelector('.btn-openModal');
const closeModal = document.querySelector('.btn-coloseModal');
const loginModal = document.querySelector('.login-modal');
const fade = document.querySelector('fade');


const toggleModal = () => {
    loginModal.classList.toggle('hide');
}


[openModal, closeModal].forEach((e) => {
    e.addEventListener('click', () => toggleModal())
})








getProducts(requestURL)

function getProducts(url) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            showProducrs(data)
        })
}


//Cart

// Open and close cart 
const cartIcon = document.querySelector(".btn-cart");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener('click', () => {
    cart.classList.add("active");
});
closeCart.addEventListener('click', () => {
    cart.classList.remove("active");
});

// Start when the document is ready 
if (document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}

// ================= Start ================== 
function start() {
    addEvents();
}

// ==================== uptate & remove ============= 
function uptate() {
    addEvents();
    updateTotal();
}

// =============== add events =================== 
function addEvents() {
    // remove items from cart 
    let cartRemove_btns = document.querySelectorAll(".cart-remove");
    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);
    });

    // change item quantity 
    let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
    cartQuantity_inputs.forEach(input => {
        input.addEventListener("change", handle_changeItemQuantity);
    })

    // Add item to cart 
    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach((btn) => {
        btn.addEventListener("click", handle_addCartItem);
    })

    // Buy order
    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click", hanldle_buyOrder);
}

// ============ handle events function ================= 
let itemsAdded = []
function handle_addCartItem() {
    let product = this.parentElement;
    let title = product.querySelector(".showcase-category").innerHTML;
    let price = product.querySelector(".price").innerHTML;
    let imgSrc = product.querySelector("image").src;
    console.log(title, price, imgSrc);

    let newToAdd = {
        title,
        price,
        imgSrc,
    };

    // hadle item already exist
    if (itemsAdded.find(el => el.title == newToAdd.title)) {
        alert("This Item Is Already Exist");
        return;
    } else {
        itemsAdded.push(newToAdd);
    }


    // Add product to cart 
    let carBoxElement = cartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = carBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    uptate();
}


function handle_removeCartItem() {
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(el => el.title != this.parentElement.querySelector(".cart-product-title").innerHTML);

    uptate();
}
function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value); //para deixar o q quantidade com nr inteiros

    uptate();
}
function hanldle_buyOrder() {
    if (itemsAdded.length <= 0) {
        alert("There is No Order to Place Yet! \nPlease Make an Order fisrt");
        return;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = '';
    alert("Your Order is placed Sucessfuly :)");
    itemsAdded = [];
    uptate();
}

//  ====================Update ============= 
function updateTotal() {
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;
    cartBoxes.forEach((cartBox) => {
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });

    //para deixar 2 digitos dps do decimal
    total = total.toFixed(2);
    // total= Math.round(total *100)/100 

    totalElement.innerHTML = "$" + total;
}


// ================ HTML Components ========== 
function cartBoxComponent(title, price, imgSrc) {
    return `
   <div class="cart-box">
    <img src=${imgSrc} alt="" class="cart-img">
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">$${price}</div>
      <input type="number" value="1" class="cart-quantity">
    </div>
    <!-- Remove cart -->
    <i class='bx bxs-trash-alt cart-remove'></i>
  </div>`
}

