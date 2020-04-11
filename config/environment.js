
const development= {
    name :'development',
    assest_path:'./assets',
    session_cookie_key:'blahSomething',
    db:'codeial_development',
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'pia.axelor@gmail.com',
            pass: 'bhulgaya951'
        }
    },
    google_client_id: "58330172222-emd1rds9k7r58bsinjqn51spghf3l2hm.apps.googleusercontent.com",
    google_client_secret: "wzx6q4u9ZcSfe-4J89dOFIVL",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret : 'codeial'
}

const production={
    name:'production',
    assest_path:'./assets',
    session_cookie_key:'blahSomething',
    db:'codeial_production',
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'pia.axelor@gmail.com',
            pass: 'bhulgaya951'
        }
    },
    google_client_id: "58330172222-emd1rds9k7r58bsinjqn51spghf3l2hm.apps.googleusercontent.com",
    google_client_secret: "wzx6q4u9ZcSfe-4J89dOFIVL",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret : 'codeial'
}

module.exports = development;