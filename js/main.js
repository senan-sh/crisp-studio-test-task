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
const secondaryProducts = document.querySelectorAll(".secondary-products .product-small-wrapper");
const mainProduct = document.querySelector(".primary-product .primary-product-item");

const changeColorOfCurrentProductListPictures = (currentColor) => {
  secondaryProducts.forEach((_categoryProductDiv) => {
    const svgList = _categoryProductDiv.querySelectorAll("svg");
    svgList.forEach(_svg => {
      _svg.style.fill = currentColor;
      _svg.querySelectorAll("path:not(.except-this)").forEach((_path) => {
        _path.style.fill = currentColor;
      })
    })

  });

  const svgList = mainProduct.querySelectorAll("svg");
  svgList.forEach(_svg => {
    _svg.style.fill = currentColor;
    _svg.querySelectorAll("path:not(.except-this)").forEach((_path) => {
      _path.style.fill = currentColor;
    })
  })
}

let activeProductColor = "#ffffff";
productsWithChangableCategories.forEach(_colorBtn => {
  if (_colorBtn.classList.contains("active")) {
    activeProductColor = "#" + _colorBtn.getAttribute("data-color")
  }
})
changeColorOfCurrentProductListPictures(activeProductColor);

const changeSelectedItem = (e) => {
  productsWithChangableCategories.forEach((item) => {
    item.classList.remove("active");
  });
  e.target.closest("li").classList?.add("active");

  const currentColor = `#${e.target.closest("li").getAttribute("data-color")}`;
  changeColorOfCurrentProductListPictures(currentColor)
}
productsWithChangableCategories.forEach(_element => {
  _element.addEventListener("click", changeSelectedItem)
});

const makeQuadraticAspectRatioOnProducts = () => {
  secondaryProducts.forEach((_productWrapper) => {
    const wrapperStylesheet = getComputedStyle(_productWrapper);
    // aspect ratio 1:1
    _productWrapper.style.height = wrapperStylesheet.width;
    // _productWrapper.querySelector
  });

  if (mainProduct.parentElement.clientWidth > (window.innerWidth / 2)) {
    const mainProductStylesheet = getComputedStyle(mainProduct.parentElement);
    mainProduct.parentElement.style.height = mainProductStylesheet.width;
  } else {
    mainProduct.parentElement.style.height = "unset";
  }
}
makeQuadraticAspectRatioOnProducts();
window.addEventListener("resize", makeQuadraticAspectRatioOnProducts);


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


// Image scrolling over image more dynamic way
const scrollingDivOverImage = document.querySelector("#home-scrolling-image .endless-scroll");
const scrollingStyleSheet = getComputedStyle(scrollingDivOverImage)
setInterval(() => {
  scrollingDivOverImage.style.left = `${Number.parseInt(scrollingStyleSheet.left, 10) - 1}px`
}, 2);
setInterval(() => {
  const childElement = scrollingDivOverImage.children[0];
  const newLeft = Number.parseInt(scrollingDivOverImage.style.left, 10) + childElement.clientWidth;
  if (newLeft > 0) {
    return;
  }
  scrollingDivOverImage.style.left = `${newLeft}px`;
  const innerElement = childElement.cloneNode();
  innerElement.innerText = childElement.innerText;
  scrollingDivOverImage.appendChild(innerElement)
  scrollingDivOverImage.children[0].remove();
}, 3000);