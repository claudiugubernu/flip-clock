// Run function every 250mls to get the nice flip
setInterval(() => {
    // Get today's date
    const todayTime = new Date();
    flipAllCards(todayTime);
}, 250);

// Takes 2 digit number and splits it into 2 and adds them as int in array
function arrayAndSplit(value) {
    let stringValue = Array.from(String(value));
    return intValue = stringValue.map(str=> Number(str));
}

// Flip All Cards
function flipAllCards(time) {
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    flip(document.querySelector("[data-hours-tens]"), arrayAndSplit(h)[0]);
    flip(document.querySelector("[data-hours-ones]"), arrayAndSplit(h)[1]);
    flip(document.querySelector("[data-minutes-tens]"), arrayAndSplit(m)[0]);
    flip(document.querySelector("[data-minutes-ones]"), arrayAndSplit(m)[1]);
    flip(document.querySelector("[data-seconds-tens]"), arrayAndSplit(s)[0]);
    flip(document.querySelector("[data-seconds-ones]"), arrayAndSplit(s)[1]);
}

// Flip one card
function flip(flipCard, newNumber) {
    const topHalf = flipCard.querySelector(".top");
    const startNumber = parseInt(topHalf.textContent);
    if (newNumber === startNumber) return;

    const bottomHalf = flipCard.querySelector(".bottom");
    const topFlip = document.createElement("div");
    topFlip.classList.add("top-flip");
    const bottomFlip = document.createElement("div");
    bottomFlip.classList.add("bottom-flip");

    bottomHalf.textContent = startNumber;
    topFlip.textContent = startNumber;
    bottomFlip.textContent = newNumber;

    topFlip.addEventListener("animationstart", e => {
    topHalf.textContent = newNumber;
    });
    topFlip.addEventListener("animationend", e => {
    topFlip.remove();
    });
    bottomFlip.addEventListener("animationend", e => {
    bottomHalf.textContent = newNumber;
    bottomFlip.remove();
    })
    flipCard.append(topFlip, bottomFlip);
}

// Drag

// Make the DIV element draggable:
dragElement(document.getElementById("clock"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }