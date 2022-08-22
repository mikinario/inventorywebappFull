//const DOMINIO = "https://inventorywebapp.site:8043"
//const DOMINIO = "http://inventorywebapp.site:8081"
const DOMINIO = "http://localhost:8081"

const btnLogin = document.getElementById("btnLogin")
const inputUserLogin = document.getElementById("username")
const inputPassLogin = document.getElementById("password")

init()

function init () {
    btnLogin.addEventListener('click', () => {
        iniciarSesion()
})
inputUserLogin.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        iniciarSesion()
    }
})
inputPassLogin.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        iniciarSesion()
    }
})
}

async function iniciarSesion(){
    let user = {
      "username": inputUserLogin.value,
      "password": inputPassLogin.value
    };
    //setLoader(true);
    const token = await getToken(user);
    if (token=="" || token==undefined){
        //setLoader(false);
        alert("usuario no encontrado");
        return;
    }
    const userData = await getUser(user.username, token);
    setUserData(userData);
    window.location="/inventary.html"
    //setLoader(false);

}

async function getToken(user){
    // Construir bjecto request
    var request = new Request(DOMINIO+"/api/login",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(user)
        });

    try {
        const response = await fetch(request);
        const data = await response.json();
        // Introducimos el token de validación en el request para posteriores peticiones
        localStorage.setItem("token", data.token);
        return data.token;
    }
    catch (err) {
        console.error(err);
        return "";
    }

}
function getUser(username, token){
    var request = new Request(DOMINIO+"/api/users/username/"+username,
    {
        method: 'GET',
        headers: {
            'Authorization':'Bearer ' + token 
        }
    });
    return  fetch(request)
            .then( response => response.json() )
            .then(data => {
                return data;
            })
            .catch(function(err) {
                alert("cors-Acceso no permitido");
                console.error(err);
            });

}

function setUserData(userData){
    delete userData.password
    localStorage.setItem("user", JSON.stringify(userData) );
}
