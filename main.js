
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