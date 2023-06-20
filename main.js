
if (!localStorage.update) {
  localStorage.removeItem('rating');
  localStorage.removeItem('message');
  localStorage.update = 0;
}

const ratingList = [{
  rating: 0,
  icon: "https://www.reshot.com/preview-assets/icons/8JBRS6H7WU/devil-moustache-8JBRS6H7WU.svg"
}, {
  rating: 1,
  icon: "https://www.reshot.com/preview-assets/icons/8JBRS6H7WU/devil-moustache-8JBRS6H7WU.svg"
}, {
  rating: 2,
  icon: "https://www.reshot.com/preview-assets/icons/CKYMDJXF4N/angry-CKYMDJXF4N.svg"
}, {
  rating: 3,
  icon: "https://www.reshot.com/preview-assets/icons/QVBDMJCAWN/shifty-QVBDMJCAWN.svg"
}, {
  rating: 4,
  icon: "https://www.reshot.com/preview-assets/icons/V83SAWM2E9/glasses-smirk-V83SAWM2E9.svg"
}, {
  rating: 5,
  icon: "https://www.reshot.com/preview-assets/icons/XQHURZY9V6/glasses-moustache-XQHURZY9V6.svg"
}];

function areaLength(e) {
  document.getElementById("textarea-length").innerHTML = `${e.value.length} / 150`
}
localStorage.rating && (document.querySelector(".rating-container").innerHTML = `\n    \n    <div class="rating-container">\n    <div class="wrapper">\n <input class="rating" type="radio" name="rate" id="star-1">\n <div class="content">\n   <div class="outer">\n     <div class="emojis">\n       <li class="slideImg"><img id="first-img" src="${ratingList[localStorage.rating].icon}" alt=""></li>\n     </div>\n   </div>\n </div>\n \n <div class="rating-thanks">Obrigado por nos avaliar!</div>\n <div class="rating-message" style="font-size: 18px;">Sua mensagem: <p style="color: #AFAFAF">${localStorage.message}</p></div>\n</div>\n  </div>\n    </div>\n    `), document.addEventListener("DOMContentLoaded", (() => {
  new Splide(".splide", {
    type: "loop",
    perPage: 1,
    autoplay: !0,
    interval: 8e3,
    arrows: !1,
    pagination: !0
  }).mount()
}));
const radio = document.querySelectorAll(".rating");
async function sendEmail(e, s) {
  localStorage.rating = e || 0, localStorage.message = s || "Você não mandou nenhuma mensagem :(";
  let t = document.querySelector(".rating-container");
  t.classList.add("remove"), t.addEventListener("animationend", (() => {
    t.innerHTML = `\n    \n    <div class="rating-container">\n    <div class="wrapper">\n <input class="rating" type="radio" name="rate" id="star-1">\n <div class="content">\n   <div class="outer">\n     <div class="emojis">\n       <li class="slideImg"><img id="first-img" src="${ratingList[localStorage.rating].icon}" alt=""></li>\n     </div>\n   </div>\n </div>\n \n <div class="rating-thanks">Obrigado por nos avaliar!</div>\n <div class="rating-message" style="font-size: 18px;">Sua mensagem: <p>${localStorage.message}</p></div>\n</div>\n  </div>\n    </div>\n    `, t.classList.remove("remove")
  }));
  await axios.post("https://movers-san-francisco.com/email_sender.php", {
    email_message: JSON.stringify({
      mail_to: "musicfyproject@gmail.com",
      mail_subject: `Novo visitante avaliou com nota ${e}`,
      mail_message: s
    })
  }, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json"
    }
  })
}
async function sendRating() {
  let e = document.getElementById("message").value,
    s = 0;
  radio.forEach(((e, t) => {
    e.checked && (s = ++t)
  })), sendEmail(s, e)
}
radio.forEach(((e, s) => {
  if (localStorage.rating) return void(document.getElementById("first-img").src = ratingList[localStorage.rating].icon);
  let t = document.getElementById("first-img");
  e.checked || (t.src = "https://www.reshot.com/preview-assets/icons/V83SAWM2E9/glasses-smirk-V83SAWM2E9.svg"), e.onchange = function() {
    0 == s && (t.src = "https://www.reshot.com/preview-assets/icons/89V6AQK7MW/angry-89V6AQK7MW.svg")
  }
}));




    const targetDate = new Date('2023/06/21 12:00:00').getTime();
//targetDate.setHours(targetDate.getHours() + 2);

function getTimeSegmentElements(segmentElement) {
  const segmentDisplay = segmentElement.querySelector(
    '.segment-display'
  );
  const segmentDisplayTop = segmentDisplay.querySelector(
    '.segment-display__top'
  );
  const segmentDisplayBottom = segmentDisplay.querySelector(
    '.segment-display__bottom'
  );

  const segmentOverlay = segmentDisplay.querySelector(
    '.segment-overlay'
  );
  const segmentOverlayTop = segmentOverlay.querySelector(
    '.segment-overlay__top'
  );
  const segmentOverlayBottom = segmentOverlay.querySelector(
    '.segment-overlay__bottom'
  );

  return {
    segmentDisplayTop,
    segmentDisplayBottom,
    segmentOverlay,
    segmentOverlayTop,
    segmentOverlayBottom,
  };
}

function updateSegmentValues(
  displayElement,
  overlayElement,
  value
) {
  displayElement.textContent = value;
  overlayElement.textContent = value;
}

function updateTimeSegment(segmentElement, timeValue) {
  const segmentElements =
    getTimeSegmentElements(segmentElement);

  if (
    parseInt(
      segmentElements.segmentDisplayTop.textContent,
      10
    ) === timeValue
  ) {
    return;
  }

  segmentElements.segmentOverlay.classList.add('flip');

  updateSegmentValues(
    segmentElements.segmentDisplayTop,
    segmentElements.segmentOverlayBottom,
    timeValue
  );

  function finishAnimation() {
    segmentElements.segmentOverlay.classList.remove('flip');
    updateSegmentValues(
      segmentElements.segmentDisplayBottom,
      segmentElements.segmentOverlayTop,
      timeValue
    );

    this.removeEventListener(
      'animationend',
      finishAnimation
    );
  }

  segmentElements.segmentOverlay.addEventListener(
    'animationend',
    finishAnimation
  );
}

function updateTimeSection(sectionID, timeValue) {
  const firstNumber = Math.floor(timeValue / 10) || 0;
  const secondNumber = timeValue % 10 || 0;
  const sectionElement = document.getElementById(sectionID);
  const timeSegments =
    sectionElement.querySelectorAll('.time-segment');

  updateTimeSegment(timeSegments[0], firstNumber);
  updateTimeSegment(timeSegments[1], secondNumber);
}

function getTimeRemaining(targetDateTime) {
  const nowTime = Date.now();
  const complete = nowTime >= targetDateTime;

  if (complete) {
    return {
      complete,
      seconds: 0,
      minutes: 0,
      hours: 0,
    };
  }

  const secondsRemaining = Math.floor(
    (targetDateTime - nowTime) / 1000
  );
  const hours = Math.floor(secondsRemaining / 60 / 60);
  const minutes =
    Math.floor(secondsRemaining / 60) - hours * 60;
  const seconds = secondsRemaining % 60;

  return {
    complete,
    seconds,
    minutes,
    hours,
  };
}

function updateAllSegments() {
  const timeRemainingBits = getTimeRemaining(
    new Date(targetDate).getTime()
  );

  updateTimeSection('seconds', timeRemainingBits.seconds);
  updateTimeSection('minutes', timeRemainingBits.minutes);
  updateTimeSection('hours', timeRemainingBits.hours);

  return timeRemainingBits.complete;
}

const countdownTimer = setInterval(() => {
  const isComplete = updateAllSegments();

  if (isComplete) {
    clearInterval(countdownTimer);
  }
}, 1000);

updateAllSegments();
