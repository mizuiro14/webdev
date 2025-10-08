const $ = (selector) => document.querySelector(selector)

$('#signup').addEventListener('click', () => {
    console.log('something')
    fetch('http://localhost:3001/signup', {
        method: 'post',
        headers: {
            contentType: 'application/json',
        },
        body: JSON.stringify({
            firstName: 'juan',
            email: 'something@gmail.com',
            password: 'password',
        }),
    })
})
