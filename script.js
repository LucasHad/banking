'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
    
  e.preventDefault()  

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(item => item.addEventListener('click', openModal))



btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


const allSections = document.querySelectorAll('.section')

const allButtons = document.getElementsByTagName('button')


const message = document.createElement('div')

message.classList.add('cookie-message')

message.textContent = 'we use cookies for improved functionality and analytics'

message.innerHTML = 'we use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'

const header = document.querySelector('.header')

//header.prepend(message)
header.append(message)
//header.append(message.cloneNode(true))


document.querySelector('.btn--close-cookie').addEventListener('click', function(){
    message.remove()
})

message.style.backgroundColor = '#37383d'

// read styles from html
//console.log(getComputedStyle(message))
//console.log(getComputedStyle(message).color)



message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 20 + 'px'

//document.documentElement.style.setProperty('--color-primary', 'gold ')


//smooth scrolling


const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')


btnScrollTo.addEventListener('click', function(e){
    const s1Coords = section1.getBoundingClientRect()
    console.log(s1Coords)

    section1.scrollIntoView({behavior: "smooth"})
})


const h1 = document.querySelector('h1')

const hover = function(){
   // alert('heloo ma frend')

    // removing the fn, so it only runs ONCE
    h1.removeEventListener('mouseenter', hover)
}

h1.addEventListener('mouseenter', hover)


//bubbling
/*
const randomInt = (min, max)=> {
   return Math.floor(Math.random() * (max-min +1) + min)
}

const randomColor = ()=> `rgb(${randomInt(0,255)}, ${randomInt(0,255)},${randomInt(0,255)})`
console.log(randomColor(0,255))


document.querySelector('.nav__link').addEventListener('click', function(e){

})

document.querySelector('.nav__links').addEventListener('click', function(e){
    
})

document.querySelector('.nav').addEventListener('click', function(e){
    
})*/


//bad way, without event delegation

/*
document.querySelectorAll('.nav__link').forEach(item => {
    item.addEventListener('click', function(e){
        e.preventDefault()

        const id = this.getAttribute('href')
        console.log(id)

       document.querySelector(id).scrollIntoView({behavior: 'smooth'})

    })
})*/


// good way, eith event delegation


document.querySelector('.nav__links').addEventListener('click', function(e){
    e.preventDefault()
    if(e.target.classList.contains('nav__link')){
        const id = e.target.getAttribute('href')
      
        console.log(id)
        console.log(this)
        console.log(e.target)
        document.querySelector(id).scrollIntoView({behavior: "smooth"})
    }


})


console.log(h1)

//dom traversal 

//going downwards/ selecting children
console.log(h1.querySelectorAll('.highlight'))

console.log(h1.childNodes) // gets everything that is a node inside h1
console.log(h1.children) // elements that are direct children
//h1.firstElementChild.style.color = 'blue'
//h1.lastElementChild.style.color = 'gold'


//going upwards / selecting parents

console.log(h1.parentNode)
console.log(h1.parentElement)


//h1.closest('.header').style.backgroundColor = 'red' // gets the closest h1 parent with the name specified ('.header')

//going upwards / selecting siblings 

//js only allows access to direct siblings, so next or previous

console.log(h1.previousElementSibling)
console.log(h1.nextElementSibling)

console.log(h1.parentElement.children) //getting all siblings, we go up to the parent, and from there we get all the children


//tabbed container

const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

tabsContainer.addEventListener('click', function(e){
    const clicked = e.target.closest('.operations__tab')
    console.log(clicked)

    if(!clicked) return


    tabs.forEach(item=> item.classList.remove('operations__tab--active'))

    tabsContent.forEach(c => c.classList.remove('operations__content--active'))

    clicked.classList.add('operations__tab--active')


    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')

})


//menu fading effect 


const nav = document.querySelector('.nav')

const handleHover = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')
    siblings.forEach(item => {
      if(item !== link) item.style.opacity= this
    })
    logo.style.opacity = this
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5))


nav.addEventListener('mouseout', handleHover.bind(1))




// making sticky menu bar
const navheight = nav.getBoundingClientRect().height

const callback = function(entries){
  entries.forEach(entry => {

  if(!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
  console.log(entry)


  })
}

const options = {
  threshold: 0,
  root: null,
  rootMargin: `-${navheight}px`
}

const observer = new IntersectionObserver(callback, options)
observer.observe(header)



// making sections appear 

const revealSection = function(entries, observer){
  const [entry] = entries

  if(!entry.isIntersecting) return

  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)

}


const sectionObserver = new IntersectionObserver(revealSection, {root: null, threshold: .15})


allSections.forEach(item=>{
  sectionObserver.observe(item)
  item.classList.add('section--hidden')
})


//lazy loading

const imgTargets = document.querySelectorAll('img[data-src]')

const loadImg = function(entries, observer){
  const [entry] = entries

  if(!entry.isIntersecting) return

  entry.target.src = entry.target.dataset.src

  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img')
  })

  observer.unobserve(entry.target)

}

const imageObserver = new IntersectionObserver(loadImg, {root: null, threshold: 0, rootMargin: '200px'})

imgTargets.forEach(img=> imageObserver.observe(img))


h1.addEventListener('click', function(){
  console.log('jjjjjjjjjjjj')
}, {once: true})