const $ = (selector) => document.querySelector(selector)

$('#signup').addEventListener('click', () => {
    console.log('something')
    fetch('http://localhost:3001/signup', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName: 'juan',
            userName: 'something',
            email: 'something@gmail.com',
            password: 'password',
        }),
    })
})

$('#login').addEventListener('click', () => {
    console.log('something')
    fetch('http://localhost:3001/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userName: 'something',
            password: 'password',
        }),
    }).then((res) => {
        console.log(res.headers.get('Authorization'), 'something')
        const token = res.headers.get('Authorization')

        console.log(token)
        console.log(token.split(' '))
        document.cookie = `token=${token.split(' ')[1]}`;
    })
})


$('#verifyUser').addEventListener('click', () => {
    console.log('something')
    fetch('http://localhost:3001/getUserProfile', {
        method: 'post',
        headers: {
            Authorization: `Bearer ${document.cookie.split('=')[1]}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userName: 'something',
            password: 'password',
        }),
    })
    .then((res) => res.json())
    .then((res) => console.log(res))
})