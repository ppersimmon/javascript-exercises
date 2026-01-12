// Task 1

class Transport {
    ride() {
        throw new Error('ride() is not implemented')
    }

    stop() {
        throw new Error('stop() is not implemented')
    }
}
class Car extends Transport{
    constructor() {
        super();
        this.type = 'Car';
    }

    ride () {
        console.log(`${this.type} is riding`);
    }

    stop () {
        console.log(`${this.type} stopped`);
    }
}

class Bike extends Transport{
    constructor() {
        super();
        this.type = 'Bike';
    }

    ride () {
        console.log(`${this.type} is riding`);
    }

    stop () {
        console.log(`${this.type} stopped`);
    }
}

class TransportFactory {
    static createTransport(type) {
        switch (type) {
            case 'car':
                return new Car();
            case 'bike':
                return new Bike();
            default:
                throw new Error('Unknown type of transport');
        }
    }
}

const car = TransportFactory.createTransport('car');
const bike = TransportFactory.createTransport('bike');

car.ride();
car.stop();

bike.ride();
bike.stop();

// Task 2

const mainDiv = document.getElementById('app');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const pageDisplay = document.getElementById('value');

let currentPage = 1;

function loadCharacters(page) {
    const url = `https://rickandmortyapi.com/api/character/?page=${page}`;

    const response = fetch(url);
    const parsedData = response.then(data => {
        if (data.status !== 200){
            alert('error')
        }
        console.log(data);
        return data.json();
    })
    .catch(error => {
        console.log('Error', error);
    })
    .finally(() => {
        console.log('Finally');
    })
    parsedData.then(data => {
        renderList(data.results);
        updatePagination(data.info);
    })
    .catch(error => {
        console.error('Loading Error', error);
    });
}

function renderList (characters) {
    mainDiv.innerHTML = characters.map(item =>
        `<div><p>${item.name}</p><p>${item.status}</p><img src='${item.image}'</div>`).join('');
}

function updatePagination (info) {
    if (info.next) {
        const nextUrl = new URL(info.next);
        const nextPage = Number(nextUrl.searchParams.get('page'));
        currentPage = nextPage - 1;
    } else {
        currentPage = info.pages;
    }

    pageDisplay.innerHTML = currentPage;

    if (currentPage === 1) {
        disableButton(prevButton);
    } else {
        enableButton(prevButton);
    }

    if (currentPage === info.pages) {
        disableButton(nextButton);
    } else {
        enableButton(nextButton);
    }
}

function disableButton (button) {
    button.disabled = true;
}

function enableButton (button) {
    button.disabled = false;
}

nextButton.addEventListener('click', () => {
    currentPage++;
    loadCharacters(currentPage);
});

prevButton.addEventListener('click', () => {
    currentPage--;
    loadCharacters(currentPage);
});

loadCharacters(currentPage);