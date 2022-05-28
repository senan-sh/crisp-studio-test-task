const mobileNavOpener = document.querySelector(".nav-opener.mobile");
const desktopNav = document.querySelector("nav.main");
const mobileNav = document.querySelector("nav.small");
const bodyOverlay = document.getElementById("body-overlay");

let isMobileNavOpen = false;
const toggleMobileNav = () => {
  isMobileNavOpen = !isMobileNavOpen;
  mobileNav.classList.toggle("visible")
};

document.addEventListener("click", (e) => {
  const clickedOnNavOpener = e.target.closest(".nav-opener.mobile") != null;
  if (clickedOnNavOpener) {
    return;
  }
  if (!isMobileNavOpen) {
    return;
  }
  const isClickedOnOutOfNav = e.target.closest("nav.small") == null;
  if (isClickedOnOutOfNav) {
    document.body.style.overflowY = "auto";
    bodyOverlay.classList.toggle("visible")
    toggleMobileNav();
  }
})

mobileNavOpener.addEventListener("click", () => {
  bodyOverlay.classList.toggle("visible")
  if (isMobileNavOpen) {
    document.body.style.overflowY = "auto";
    toggleMobileNav();
  } else {
    document.body.style.overflowY = "hidden";
    toggleMobileNav();
  }
});

const heroImagesBlock = document.getElementById("hero-images");
const images = heroImagesBlock.querySelectorAll(".bg-image");
for (const heroImage of images) {
  const heroImageUrl = heroImage.getAttribute("image-url")
  heroImage.style.backgroundImage = `url(img/hero-images/${heroImageUrl})`;
}

// Product reviewer
const productsWithChangableCategories = document.querySelectorAll(".product-reviewer ul li");
const categoryProducts = document.querySelectorAll(".secondary-products .product-small-wrapper");

const changeSelectedItem = (e) => {
  productsWithChangableCategories.forEach((item) => {
    item.classList.remove("active");
  });
  e.target.closest("li").classList?.add("active");

  const currentColor = `#${e.target.closest("li").getAttribute("data-color")}`;

  categoryProducts.forEach((_categoryProductDiv) => {
    const svgList = _categoryProductDiv.querySelectorAll("svg");
    svgList.forEach(_svg => {
      _svg.style.fill = currentColor;
      _svg.querySelectorAll("path").forEach((_path) => {
        _path.style.fill = currentColor;
      })
    })
  })
}
productsWithChangableCategories.forEach(_element => {
  _element.addEventListener("click", changeSelectedItem)
});

categoryProducts.forEach((_productWrapper) => {
  const wrapperStylesheet = getComputedStyle(_productWrapper);
  // aspect ratio 1:1
  _productWrapper.style.height = wrapperStylesheet.width;
  // _productWrapper.querySelector
});



// Input validation
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const isValidEmail = (text) => EMAIL_REGEX.test(text);
const subscribeEmailForm = document.getElementById("footer-subscribe-form");
const subscribeEmailInput = subscribeEmailForm.querySelector(".input-control");
const emailValidationBox = document.querySelector("form .email-validation-message");

subscribeEmailForm.onsubmit = (e) => e.preventDefault();

let isFirstTimeInputtingInEmail = true;
let emailInputValueChanged = false;
subscribeEmailInput.addEventListener("input", () => {
  emailInputValueChanged = true;
  if (isFirstTimeInputtingInEmail) {
    isFirstTimeInputtingInEmail = false;
    subscribeEmailInput.classList.remove("untouched");
    subscribeEmailInput.classList.add("touched");
  }

  if (isValidEmail(subscribeEmailInput.value)) {
    subscribeEmailInput.classList.remove("invalid");
    emailValidationBox.classList.remove("active");
  } else {
    if (subscribeEmailInput.classList.contains("dirty")) {
      subscribeEmailInput.classList.add("invalid");
      emailValidationBox.classList.add("active");
    }
  }
});

subscribeEmailInput.addEventListener("focusin", () => {
  subscribeEmailInput.classList.remove("untouched");
  subscribeEmailInput.classList.add("touched");
});

subscribeEmailInput.addEventListener("blur", () => {
  if (emailInputValueChanged) {
    subscribeEmailInput.classList.add("dirty");
  }
  if (subscribeEmailInput.classList.contains("dirty")) {
    const emailValue = subscribeEmailInput.value;
    if (!isValidEmail(emailValue)) {
      emailValidationBox.classList.add("active");
      subscribeEmailInput.classList.add("invalid");
    }
  }
});