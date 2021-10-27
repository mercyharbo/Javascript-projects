const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4b2b112dbfcd761b7b1ca272fb52cbee&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w500'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=4b2b112dbfcd761b7b1ca272fb52cbee&query="'
const POPULAR_API = 'https://api.themoviedb.org/3/movie/popular?api_key=4b2b112dbfcd761b7b1ca272fb52cbee&page=1'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')
const hero = document.querySelector('.hero')
const slide = document.querySelector('.slideshow')


// Get initial movies 
getMovies(API_URL)
popularMovies(POPULAR_API)

// Slideshow 
function slideShow(images) {
    const { poster_path } = images
    
    const imageEl = document.createElement('img')
    imageEl.classList.add('slide')
    imageEl.setAttribute('src', `${poster_path}`)

    slide.appendChild(imageEl)

    console.log(slide)
}

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

async function popularMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    getPopularMovies(data.results)
}

function getPopularMovies(popular) {
    hero.innerHTML = ''

    popular.forEach((movie) => {
        const {title, poster_path, vote_average, overview, release_date} = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie_info">
                <div class="movie_detail">
                    <h5> ${title} </h5>
                    <span class="${getClassByRate(vote_average)}"> ${vote_average}</span>
                </div>

                <p class="release_date"> Realease Date: ${release_date} </p>
            </div>
           

            <div class="overview">
                <h3> Overview </h3>
                <p>
                    ${overview}
                </p>
            </div>
        `

        hero.appendChild(movieEl)
    })
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview, release_date} = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie_info">
                <div class="movie_detail">
                    <h5> ${title} </h5>
                    <span class="${getClassByRate(vote_average)}"> ${vote_average}</span>
                </div>

                <p class="release_date"> Realease Date: ${release_date} </p>
            </div>
           

            <div class="overview">
                <h3> Overview </h3>
                <p>
                    ${overview}
                </p>
            </div>
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5){
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})

