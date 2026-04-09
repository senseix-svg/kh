const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if(close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

// Close navbar when clicking on a link
const navLinks = nav.querySelectorAll('a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    })
})

// Close navbar when clicking outside
document.addEventListener('click', (e) => {
    if(!nav.contains(e.target) && !bar.contains(e.target)) {
        nav.classList.remove('active');
    }
})

// Handle viewport changes
window.addEventListener('resize', () => {
    if(window.innerWidth > 799) {
        nav.classList.remove('active');
    }
})