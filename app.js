function h1Spliting() {
  const h1Element = document.querySelector(".text-line-1");
  const text = h1Element.innerText;
  h1Element.innerHTML = "";
  text.split(":").forEach((ele, i) => {
    const wrappedContent = ele.split("").map(character => {
      const span = document.createElement("span");
      span.className = character === " " ? "space char" : "char";
      span.textContent = character;
      return span;
    });
    const wrapperSpan = document.createElement("span");
    wrapperSpan.className = `row-${i}`;
    wrappedContent.forEach(item => {
      wrapperSpan.appendChild(item);
    });
    h1Element.appendChild(wrapperSpan);

    const br = document.createElement("br");
    h1Element.appendChild(br);
  });
}

function setTextColor() {
  const imgDiv = document.querySelector(".img-div");
  const imgPosition = imgDiv.getBoundingClientRect();
  const charEle = document.querySelectorAll("h1 .char:not(.space)");

  charEle.forEach(ele => {
    let elePosition = ele.getBoundingClientRect();
    const margin = 10;

    if (
      imgPosition.left < elePosition.right - margin &&
      imgPosition.right > elePosition.left - margin &&
      imgPosition.top < elePosition.bottom - margin &&
      imgPosition.bottom > elePosition.top - margin
    ) {
      ele.classList += " white-color";
    } else {
      ele.classList.remove("white-color");
    }
  });
}

function show() {
  const charEle = document.querySelectorAll("h1 .char:not(.space)");
  const imgDiv = document.querySelector(".img-div");
  const imgPosition = imgDiv.getBoundingClientRect();

  charEle.forEach(ele => {
    ele.style.transform = "none";
    let elePosition = ele.getBoundingClientRect();
    const margin = 10;
    if (
      imgPosition.left < elePosition.right - margin &&
      imgPosition.right > elePosition.left - margin &&
      imgPosition.top < elePosition.bottom - margin &&
      imgPosition.bottom > elePosition.top - margin
    ) {
      ele.classList += " white-color";
    }
  });

  document.getElementsByTagName("h1")[0].style.opacity = "1";
  document.getElementsByTagName("p")[0].style.opacity = "1";
  imgDiv.style.opacity = "1";
  imgDiv.style.animation = "circle 3s infinite ease-in-out";

  setTimeout(hide, 10 * 1000);
}

function hide() {
  const charEle = document.querySelectorAll("h1 .char:not(.space)");
  const imgDiv = document.querySelector(".img-div");

  charEle.forEach(ele => {
    ele.style.transform = "rotate3d(1, -0.3, 0, 90deg)";
  });

  document.getElementsByTagName("p")[0].style.opacity = "0";
  imgDiv.style.animation = "none";
  imgDiv.style.opacity = "0";

  setTimeout(show, 2 * 1000);
}

window.onload = () => {
  let currentImageIndex = 0;
  const images = ["img2.png", "img3.png", "img4.png", "img1.png"];
  const imgDiv = document.querySelector(".img-div");
  const img = document.querySelector(".img-small");

  imgDiv.addEventListener("animationiteration", event => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    img.src = images[currentImageIndex];
  });
  h1Spliting();
  setTimeout(show, 2 * 1000);
  setInterval(setTextColor, 1 * 1000);
};
