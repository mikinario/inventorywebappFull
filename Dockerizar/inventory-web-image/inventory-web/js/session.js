const userMenu = document.getElementById("userMenu")
const userOptions = document.getElementById("userOptions")

init()

function init() {
    checkSesion()
}

function checkSesion() {
    let user = JSON.parse(localStorage.getItem("user"))
    if ( user && user!=null) {
        userMenu.innerHTML = "Hola " + user.name
        userOptions.innerHTML = `
        <li><a class="dropdown-item" type="button" href="account.html">Cuenta</a></li>
        <li><button class="dropdown-item" type="button" onclick="cerrarSesion()">Cerrar sesión</button></li>
        `
      
    } else {
        userMenu.innerHTML = "Anónimo"
        userOptions.innerHTML = `
        <li><a class="dropdown-item" type="button" href="login.html">Inciar sesión</a></li>
        `
    }
}


function cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location="login.html"
}