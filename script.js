const counters = document.querySelectorAll('.counter')

counters.forEach(counter => {
    counter.innerHTML = '0'

    const updateCounter = () => {
        // Plus sign changes this to a number from a string
        const target = +counter.getAttribute('data-target')
        const c = +counter.innerText

        const increment = target / 500

        if (c < target) {
            // Math.ceil function always rounds a number up to the next largest integer.
            counter.innerText = `${Math.ceil(c + increment)}`
            setTimeout(updateCounter, 1)
        } else {
            counter.innerText = target
        }
    }

    updateCounter()
})