const heroesUrl = 'https://rickandmortyapi.com/api/character';

const pageDisplay = document.querySelector('#pagination span');
const modalWnd = document.querySelector('#modal');
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal_close');
const heroesListWrapper = document.querySelector('.hero-list');
const observerTrigger = document.querySelector('#observer-trigger');

let nextUrl = heroesUrl;
let isLoading = false;

const getData = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Something went wrong');
    }

    return response.json();
};

const renderListItem = (hero) =>
    `<div data-event="card_handler" data-card_id=${hero.id} class="hero-list-item">` +
    `<img src="${hero.image}">` +
    `<div class="info">` +
    `<p class="hero-name">${hero.name}</p>` +
    `<p class="hero-status">${hero.status}</p>` +
    `</div>` +
    `</div>`;

const renderHeroList = async () => {
    if (isLoading || !nextUrl) return;

    isLoading = true;
    observerTrigger.classList.remove('hidden');

    try {
        const { info, results } = await getData(nextUrl);
        nextUrl = info.next;
        const newCardsHtml = results.map(renderListItem).join('');
        heroesListWrapper.insertAdjacentHTML('beforeend', newCardsHtml);

        if (!nextUrl) {
            observerTrigger.remove();
        }

    } catch (error) {
        heroesListWrapper.innerHTML = 'Something went wrong';
    } finally {
        isLoading = false;
    }
};

const observerOptions = {
    root: null,
    rootMargin: '100px',
    threshold: 1.0
}

const observerCallback = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
        renderHeroList();
    }
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(observerTrigger);

const cardClickHandler = async (id) => {
    modalWnd.classList.remove('hidden');
    modalContent.innerHTML = '';
    const { image, name, status, species, gender } = await getData(`${heroesUrl}/${id}`);
    modalContent.innerHTML =
    `<div class="info-modal">
    <img src=${image}>
    <div class="info-modal-text">
    <p class="modal-name">${name}</p>
    <p>${status}</p>
    <p>${species}</p>
    <p>${gender}</p>
    </div></div>`;
}

const eventListHandlers = {
    "card_handler": (event) => {
        console.log(event);
        cardClickHandler(event.target.dataset.card_id)},
    "modal_close": () => modalWnd.classList.add('hidden')
}

document.querySelector('body').addEventListener('click', event => {
    const targetWithEvent = event.target.closest('[data-event]');
    if (targetWithEvent) {
        event.stopPropagation();
        const action = targetWithEvent.dataset.event;

        if (eventListHandlers[action]) {
            eventListHandlers[action]({
                ...event,
                target: targetWithEvent
            });
            return;
        }
    }

    if (event.target === modalWnd) {
        eventListHandlers['modal_close']();
    }
});
