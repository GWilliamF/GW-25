 const blob = document.querySelector('.blob');
if (window.screen.width > 768) {
    document.body.onpointermove = e => {
    const { clientX, clientY } = e;
    blob.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    }, {duration: 2000, fill:'forwards'})   
}} else {
    blob.style.position = 'absolute'
    blob.style.left = '70%'
    blob.style.top = '50%'
} 


const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;
window.onscroll = () => {

    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > 350 ){
    blob.style.opacity = '0.8'
   blob.style.filter = 'blur(190px)'  

   /* if (scrollTop > lastScrollTop) {
        navbar.style.top = '-100%';
        navbar.style.opacity = '0';
        navbar.style.filter = 'blur(15px)'
    } else {
        navbar.style.top = '0';
        navbar.style.opacity = '1';
        navbar.style.filter = 'blur(0px)'
    } 
lastScrollTop = scrollTop; */
    } else {
      blob.style.opacity = '1'
      blob.style.filter = 'blur(calc(90px + 8vw))'  
    }
}

const a = document.querySelectorAll('header > nav > a');
const colorArray = ['rgb(76, 235, 201)',  'rgb(235, 36, 102)',  'rgb(235, 36, 102)'];
a.forEach(e => {
    e.onmouseover = () => {
        let randColor = Math.floor(Math.random() * 3);
        console.log(randColor);
    e.style.setProperty('--rand-color', `${colorArray[randColor]}`)
    }
})

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('showOnscroll');
        }
    });
});
document.querySelectorAll('.hidden').forEach(e => observer.observe(e));

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

let interval = null;

document.querySelector('[data-value="consciente"').onmouseover = event => {  
  let iteration = 0;
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return event.target.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 52)]
      })
      .join("");
    
    if(iteration >= event.target.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 30);
}

document.getElementById("cards").onmousemove = e => {
  for(const card of document.getElementsByClassName("card")) {
    const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };
}

const showNavbar = document.querySelector('.show-navbar'),
showNavbarText = document.querySelector('.show-navbar-text')
sections = document.querySelectorAll('.section'),
cardsId = document.querySelector('#cards'),
cardsClass = document.querySelectorAll('.card');
let alreadyClick = false;

showNavbar.onclick = () => {
  
  if (alreadyClick == false ) {
    sections.forEach(e => {
      e.style.opacity = '0';
    })
    showNavbar.style.background = 'rgb(var(--default-blue))';
    showNavbarText.innerHTML = 'Fechar';
    document.body.classList.add('body-transition'); 
    let time = 800;
    setTimeout(() => {
      navbar.style.zIndex = '4';
      navbar.style.opacity = '1';
      navbar.dataset.opened = 'yes';
    }, time - 400);
    setTimeout(()=> {  
      document.body.classList.remove('body-transition');
  }, time);
  alreadyClick = !alreadyClick;
} else {
  returnToNormal();
}}
function returnToNormal() {
  sections.forEach(e => {
    e.style.opacity = '1';
  })
  document.body.style.overflow = 'initial';
  showNavbar.style.background = 'rgb(var(--default-red))';
  showNavbarText.innerHTML = 'Abrir';
  navbar.style.opacity = '0';
  navbar.style.zIndex = '-5';
  cards.style.zIndex = '-5';
  navbar.dataset.opened = 'no';
  alreadyClick = !alreadyClick;
};
cardsClass.forEach(e => {
  e.onclick = () => {
    returnToNormal();
  };
});