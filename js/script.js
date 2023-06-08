"use strict";
const burger = document.querySelector('.burger-menu');
const navigation = document.querySelector('.navigation');
const navigationMenu = document.querySelector('.navigation__list')
const darkBackground = document.querySelector('.dark-overlay')
const navItems = document.querySelectorAll('.nav__item')

const showMenu = function() {
    navItems.forEach(e=>{e.addEventListener('click', () =>  { navigationMenu.classList.toggle('active');
    darkBackground.classList.toggle('active');
    burger.classList.toggle('active');
    document.body.classList.toggle('unscrollable')})});
    navigationMenu.classList.toggle('active');
    darkBackground.classList.toggle('active');
    burger.classList.toggle('active');
    document.body.classList.toggle('unscrollable');
    window.addEventListener('click', (e) => {
        if (!burger.contains(e.target)&&!navigationMenu.contains(e.target)) {
            navigationMenu.classList.remove('active');
            darkBackground.classList.remove('active');
            burger.classList.remove('active');
            document.body.classList.remove('unscrollable');
        }
    })
}

burger.addEventListener('click',showMenu);

//  POPUPS---------------------------------------------------------------

const sliderArea = document.querySelector('.slider');
const popup = document.querySelector('.popup');
const popupArea = document.querySelector('.popup__overlay');
const petsIndices = ["Jennifer","Sophia","Woody","Scarlett","Katrine","Timmy","Freddie","Charly"]

const parseJson = async function() {
    const response = await fetch("js/pets.json");
    const pets = await response.json();
    return pets;
}

sliderArea.addEventListener('click', (event) => {
    let popupButtons = document.querySelectorAll('.learn-more-btn');
    popupButtons.forEach(e=> {
        if (event.target === e) {
         async function registerButtons (event) {
            if (screen.width >= 960) {toggleScrollPadding()}
            popup.classList.add('open');
            document.body.classList.toggle('unscrollable');
            const pets = await parseJson();
            const chosenPet = e.getAttribute('data-filter');
            const chosenPetIndex = petsIndices.indexOf(chosenPet);
            const petsInfo = pets[chosenPetIndex];
            const htmlPopup = document.createElement('div');
            htmlPopup.classList.add("popup__content");
            htmlPopup.innerHTML = 
            `<div class="popup__close-icon"><img src="assets/img/icons/close.svg" alt="" width="12" height="12"></div>
            <div class="popup__img"><img  src="assets/img/pets/pets-${chosenPet}.png" alt="Our pet ${chosenPet}, the ${petsInfo['type']}"></div>
            <div class="popup__info">
                <div class="popup__title">
                <h3 class="popup__pet-name h2">${chosenPet}</h3>
                <p class="popup__pet-breed h3">${petsInfo['type']} - ${petsInfo['breed']}</p>
                </div>
                <div class="popup__description">
                <p class="popup__pet-info"> ${petsInfo['description']}</p></div>
                <ul class="pet-list">
                    <li><b>Age:</b> ${petsInfo['age']}</li>
                    <li><b>Inoculations:</b> ${petsInfo['inoculations']}</li>
                    <li><b>Diseases:</b> ${petsInfo['diseases']}</li>
                    <li><b>Parasites:</b> ${petsInfo['parasites']}</li>
                </ul>
            </div>`

            const containerPopup = document.querySelector('.popup__container');
            containerPopup.appendChild(htmlPopup);
            const closePopupButton = document.querySelector('.popup__close-icon');
            closePopupButton.addEventListener('click',closePopup)
        }
        registerButtons();
    }
}
    )
})

const closePopup = () => {

    popup.classList.remove('open')
    document.body.classList.toggle('unscrollable')
    if (screen.width >= 960) {toggleScrollPadding()};

    const containerPopup = document.querySelector('.popup__container');
    containerPopup.innerHTML = '';
}

const getPopup = async function () {
    const response = await fetch("js/pets.json");
    const pets = await response.json();
    let chosenPet = event.target.getAttribute('data-filter');

    return pets[chosenPet];
}

const toggleScrollPadding = () => {if (document.body.getAttribute('data-padding') === 'added')

{document.body.style.paddingRight = 0;
    document.body.setAttribute('data-padding', 'disabled')}
    else {
    let paddingValue = window.innerWidth - document.body.offsetWidth + 'px';
    document.body.style.paddingRight = paddingValue;
    document.body.setAttribute('data-padding', 'added');
    }
}

if (document.querySelector('.popup__close-icon')) {
    const closePopupButton = document.querySelector('.popup__close-icon');
closePopupButton.addEventListener('click',closePopup)
}

popupArea.addEventListener('click', closePopup)

// const registerButtons = () => {
//     let popupButtons = document.querySelectorAll('.learn-more-btn');
//     popupButtons.forEach(e=> {
//         e.addEventListener('click', async function(event) {
//             if (screen.width >= 960) {toggleScrollPadding()}
//             popup.classList.add('open');
//             document.body.classList.toggle('unscrollable');
//             const response = await fetch("js/pets.json");
//             const pets = await response.json();
//             const chosenPet = this.getAttribute('data-filter');
//             const chosenPetIndex = petsIndices.indexOf(chosenPet);
//             const petsInfo = pets[chosenPetIndex];
//             const htmlPopup = document.createElement('div');

//             htmlPopup.classList.add("popup__content");
//             htmlPopup.innerHTML = 

//             `<div class="popup__img"><img  src="assets/img/pets/pets-${chosenPet}.png" alt="Our pet ${chosenPet}, the ${petsInfo['type']}"></div>
//             <div class="popup__info">
//                 <div class="popup__title">
//                 <h3 class="popup__pet-name h2">${chosenPet}</h3>
//                 <p class="popup__pet-breed h3">${petsInfo['type']} - ${petsInfo['breed']}</p>
//                 </div>
//                 <div class="popup__desctiption">
//                 <p class="popup__pet-info"> ${petsInfo['description']}</p></div>
//                 <ul class="pet-list">
//                     <li><b>Age:</b> ${petsInfo['age']}</li>
//                     <li><b>Inoculations:</b> ${petsInfo['inoculations']}</li>
//                     <li><b>Diseases:</b> ${petsInfo['diseases']}</li>
//                     <li><b>Parasites:</b> ${petsInfo['parasites']}</li>
//                 </ul>
//             </div>`

//             const containerPopup = document.querySelector('.popup__container');
//             containerPopup.appendChild(htmlPopup);
//         })
//     })
// };




//  SLIDER 

const leftCards = document.querySelector('.card-set-left');
const rightCards = document.querySelector('.card-set-right');
const leftSlider = document.querySelector('.arrow_previous');
const rightSlider = document.querySelector('.arrow_next');
const activeCards = document.querySelector('.card-set-active');
const slider = document.querySelector('.slider');

let previousCards = [];
let leftIndices = [];
let rightIndices = [];

let cardsToShow = 3;
if (window.innerWidth < 800 && window.innerWidth >= 530) {cardsToShow = 2}
else if (window.innerWidth < 530) {cardsToShow = 1};

window.onresize = (e) => {
    if (window.innerWidth < 800 && window.innerWidth >= 530) {cardsToShow = 2}
    else if (window.innerWidth < 530) {cardsToShow = 1}
    else if (window.innerWidth >= 800) {cardsToShow = 3};
    activeCards.innerHTML = "";
    fillCards(activeCards);
}

const fillCards = async function (toAppend) {
if (toAppend) {
const response = await fetch("js/pets.json");
const cards = await response.json();
const cardIndice = [];
    for (let i = 0; i < cardsToShow; i++) {
        let randomNum = Math.floor(Math.random() * 8);
        const cardHtml = document.createElement("div");
        if (toAppend === activeCards) {
            previousCards.push(randomNum);
            while (cardIndice.includes(randomNum)) {
                randomNum = Math.floor(Math.random() * 8); 
            }
            cardIndice.push(randomNum);

        }
        else {
            while (previousCards.includes(randomNum) || cardIndice.includes(randomNum)) {
                randomNum = Math.floor(Math.random() * 8); 
            }
            cardIndice.push(randomNum);
        }

        if (toAppend === leftCards) {leftIndices.push(randomNum)}
        else if (toAppend === rightCards) {rightIndices.push(randomNum)};
        cardHtml.setAttribute('data-filter',`${cards[randomNum].name}`)
        cardHtml.classList.add("card-item");
        cardHtml.classList.add("__card");
        cardHtml.innerHTML = 
        `<img src="assets/img/pets/pets-${cards[randomNum].name}.png" alt="british cat ${cards[randomNum].name}" width="270" height="270"
        class="card__img">
        <p class="dog-name">${cards[randomNum].name}</p>

        <button class="btn__secondary __btn learn-more-btn" data-filter="${cards[randomNum].name}">Learn more
        </button>`;
        if (toAppend.children.length < 3) {
        toAppend.appendChild(cardHtml)}
    }

    // if (toAppend===activeCards) {registerButtons()}
}
    else {return false}
}

fillCards(activeCards);fillCards(leftCards);fillCards(rightCards);

const removeCards = () => {
    leftCards.innerHTML = "";
    rightCards.innerHTML = "";
    leftIndices = [];
    rightIndices = [];
}


const slideLeft = () => {
leftCards.classList.remove('hidden');

leftCards.classList.add('transition-left');

activeCards.classList.add('transition-left__slide-out');
leftSlider.removeEventListener('click',slideLeft);
}

const slideRight = () => {    
    rightCards.classList.remove('hidden');
rightCards.classList.add('transition-right');
activeCards.classList.add('transition-right__slide-out');
rightSlider.removeEventListener('click',slideRight);
}

if (leftSlider) {leftSlider.addEventListener('click', slideLeft);
rightSlider.addEventListener('click', slideRight);}


const endAnimation = () => {
if (activeCards) {
if (event.target === leftCards) {activeCards.innerHTML = "";activeCards.innerHTML = leftCards.innerHTML;
previousCards = []; previousCards.push(leftIndices[0],leftIndices[1],leftIndices[2]);
// registerButtons()
}
else {activeCards.innerHTML = "";
    activeCards.innerHTML = rightCards.innerHTML;
    previousCards = []; previousCards.push(rightIndices[0],rightIndices[1],rightIndices[2]); 
    // registerButtons()  
}
removeCards();
fillCards(leftCards);fillCards(rightCards);
leftCards.classList.add('hidden');
rightCards.classList.add('hidden');
leftCards.classList.remove('transition-left');
rightCards.classList.remove('transition-right');
activeCards.classList.remove('transition-left__slide-out');
activeCards.classList.remove('transition-right__slide-out');
rightSlider.classList.remove('transition-right');
leftSlider.addEventListener('click', slideLeft);
rightSlider.addEventListener('click', slideRight);
}
else {return false}
}

if (leftCards) {leftCards.addEventListener('animationend', endAnimation)
rightCards.addEventListener('animationend', endAnimation)}


//  PAGINATION ---------------------------------

if (document.querySelector(['[data-role="first-page"]'])!== null) {

const firstPageBtn = document.querySelector(['[data-role="first-page"]']);
const previousPageBtn = document.querySelector(['[data-role="previous-page"]']);
const nextPageBtn = document.querySelector(['[data-role="next-page"]']);
const lastPageBtn = document.querySelector(['[data-role="last-page"]']);

let itemsPerPageArray = [];
let currentPage = 0;
let itemsPerPage = 8;

if (window.innerWidth < 800 && window.innerWidth >= 450) {itemsPerPage = 6}
else if (window.innerWidth < 450) {itemsPerPage = 3};
let pages = 48 / itemsPerPage;

window.onresize = (event) => {
    if (window.innerWidth < 800 && window.innerWidth >= 450) {itemsPerPage = 6}
    else if (window.innerWidth < 450) {itemsPerPage = 3}
    else if (window.innerWidth >= 800) {itemsPerPage = 8};
    pages = 48 / itemsPerPage;
    const sliderPets = document.querySelector('.pets__grid');
    sliderPets.innerHTML = '';
    itemsPerPageArray = [];
    createPages(petsIndices,pages,itemsPerPage);
    fillNewPage(currentPage);

    // currentPage = 0;
    // removePages();    
    // // if (itemsPerPageArray > 48) {itemsPerPageArray=[]}
    // createPages(petsIndices,pages,itemsPerPage);
    // fillNewPage(currentPage);
    // if (itemsPerPageArray > 48) {itemsPerPageArray=[]}

    // // fillNewPage(currentPage);
}

const updatePages = () => {
    if (document.querySelector('.slider').getAttribute('data-role')!=='pagination') {return false}

    slider.innerHTML = "";
    let pageContent = [];

    const fillPagesArray = () => {

        for (let i = 0; i<pages;i++) {

            pageContent = [];
            let randomNum = Math.floor(Math.random()*8-0.0000001);
            let petsArray = [];

            pets.forEach(e=> petsArray.push(e))

            for(let i = 0; i < itemsPerPage; i++) {
            randomNum = Math.floor(Math.random()*8-0.00001);

            if (petsArray[randomNum]!==0) {
                    pageContent.push(petsArray[randomNum]);
                    petsArray[randomNum] = 0;
                }
            else {
                    while(petsArray[randomNum]===0 && petsArray.find(e=> typeof e === 'string')) 
                    {
                        randomNum = Math.floor(Math.random()*8-0.00001);}
                        pageContent.push(petsArray[randomNum]);
                        petsArray[randomNum] = 0;
                    }

            }
            itemsPerPageArray.push(pageContent);
        }
    }
    fillPagesArray();
}

const removePages =() => {
    if (itemsPerPageArray.length > 48) {itemsPerPageArray=[]}
    const sliderPets = document.querySelector('.pets__grid');
    sliderPets.innerHTML = '';
    if (itemsPerPageArray > 48) {itemsPerPageArray=[]}
}


const createPages = (pets, pages,itemsPerPage) => {
    if (document.querySelector('.slider').getAttribute('data-role')!=='pagination') {return false}

    slider.innerHTML = "";
    let pageContent = [];

    const fillPagesArray = () => {

        for (let i = 0; i<pages;i++) {

            pageContent = [];
            let randomNum = Math.floor(Math.random()*8-0.0000001);
            let petsArray = [];

            pets.forEach(e=> petsArray.push(e))

            for(let i = 0; i < itemsPerPage; i++) {
            randomNum = Math.floor(Math.random()*8-0.00001);

            if (petsArray[randomNum]!==0) {
                    pageContent.push(petsArray[randomNum]);
                    petsArray[randomNum] = 0;
                }
            else {
                    while(petsArray[randomNum]===0 && petsArray.find(e=> typeof e === 'string')) 
                    {
                        randomNum = Math.floor(Math.random()*8-0.00001);}
                        pageContent.push(petsArray[randomNum]);
                        petsArray[randomNum] = 0;
                    }

            }
            itemsPerPageArray.push(pageContent);
        }
    }
    fillPagesArray();
    }

createPages(petsIndices,pages,itemsPerPage);

const fillNewPage = async function(newPage) {
    // if (itemsPerPageArray.length > 48) {itemsPerPageArray=[]}

    if (itemsPerPageArray[newPage]=== undefined && newPage > 0) {newPage -=1;
        return false}
    else if (itemsPerPageArray[newPage]=== undefined && newPage < 0) {newPage +=1;
    return false}

    if (newPage === 0) {
        firstPageBtn.classList.add('btn-inactive');
        previousPageBtn.classList.add('btn-inactive');
        firstPageBtn.classList.remove('active');
        previousPageBtn.classList.remove('active');
    }
    else {
    firstPageBtn.classList.remove('btn-inactive');
    previousPageBtn.classList.remove('btn-inactive');
    firstPageBtn.classList.add('active');
    previousPageBtn.classList.add('active');   
};

    if (newPage === itemsPerPageArray.length-1) {
        nextPageBtn.classList.add('btn-inactive');
        lastPageBtn.classList.add('btn-inactive');
        nextPageBtn.classList.remove('active');
        lastPageBtn.classList.remove('active');
    }
    else {
        nextPageBtn.classList.remove('btn-inactive');
        lastPageBtn.classList.remove('btn-inactive');
        nextPageBtn.classList.add('active');
        lastPageBtn.classList.add('active');
    }

    const pageNum = document.querySelector('.paginator-number');
    pageNum.textContent = currentPage + 1;

    const pageContent = document.querySelector('.pets__grid');
    pageContent.innerHTML="";

    for (let i = 0; i < itemsPerPage; i++) {

        let card = document.createElement('div');
        card.classList.add('card-item-pets');
        card.classList.add('__card');
        card.setAttribute('data-filter',itemsPerPageArray[newPage][i]);

        const pets = await parseJson();
        const chosenPet = card.getAttribute('data-filter');
        const chosenPetIndex = petsIndices.indexOf(chosenPet);
        const petsInfo = pets[chosenPetIndex];

        card.innerHTML = `<img src="assets/img/pets/pets-${chosenPet}.png" alt="${petsInfo['breed']} ${petsInfo['type']} ${chosenPet}" width="270" height="270"
        class="card__img">
        <p>${chosenPet}</p>
        <button class="btn__secondary __btn learn-more-btn" data-filter="${chosenPet}">Learn more
        </button>`;
        let pageDuplicate = pageContent.querySelector(`[data-filter="${itemsPerPageArray[newPage][i]}"]`)
        if (!pageDuplicate) {
        pageContent.append(card)}
    }
        // const slider = document.querySelector('.slider');
        // slider.append(pageContent);

}

fillNewPage(currentPage);

const turnPreviousPage = () => {
    if (currentPage === 0 ) {return false};
    currentPage -= 1;
    fillNewPage(currentPage);
}

const turnFirstPage = () => {
    if (currentPage === 0) {return false};

    currentPage = 0;

    fillNewPage(currentPage);
}

const turnNextPage = () => {
    if(currentPage >= itemsPerPage.length -1 || currentPage > pages) {return false};
    currentPage += 1;

    fillNewPage(currentPage);
}

const turnLastPage = () => {
    if (currentPage >= itemsPerPage.length -1 || currentPage > pages) {return false}
    currentPage = itemsPerPageArray.length-1;
    fillNewPage(currentPage);
}



firstPageBtn.addEventListener('click', turnFirstPage);
previousPageBtn.addEventListener('click', turnPreviousPage);
nextPageBtn.addEventListener('click', turnNextPage);
lastPageBtn.addEventListener('click', turnLastPage);


console.dir(itemsPerPageArray, 'page');

}