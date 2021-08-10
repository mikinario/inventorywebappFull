//const DOMINIO = "https://inventorywebapp.site:8043"
const DOMINIO = "http://inventorywebapp.site:8081"

const mainAccount = document.getElementById("mainAccount")
const confAccountsBtn = document.getElementById("confAccountsBtn")
const accountBtn = document.getElementById("accountBtn")
const mainModal = document.getElementById("mainModal")
const modalHtml = document.getElementById("bodyModal")
let user = []
let usersJson = []

init()

function init() {
  user = JSON.parse(localStorage.getItem("user"))
  cuenta()

  accountBtn.addEventListener('click', () => {
    cuenta()
  })

  confAccountsBtn.addEventListener('click', () => {
    fetchUsers()
  })
}

function cuenta() {
  mainAccount.innerHTML = `
    <div class="row">
      <div class="card col-8 offset-2">
        <div class="card-body">
          <h5 class="card-title mb-4">Mis Datos:</h5>
          <p class="card-text">Nombre de Usuario: ${user.username}</p>
          <p class="card-text">Nombre: ${user.name}</p>
          <p class="card-text">Apellidos: ${user.surnames}</p>
          <p class="card-text">Rol: ${user.role}</p>
          <!-- <button type="button" class="right btn-lg text-dark" style="color:#D3D3D3">Editar datos</button> -->
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="card col-8 offset-2">
        <div class="card-body">
          <h5 class="card-title mb-4">Contraseña</h5>
          <button type="button" data-bs-toggle="modal" data-bs-target="#mainModal" onclick="popModalNewPassword()" class="right btn-lg text-dark" style="color:#D3D3D3">Cambiar contraseña</button>
        </div>
      </div>
    </div>
    `
}

function fetchUsers() {
  if (user.role == "admin") {
    fetch(DOMINIO + "/api/users", { 
      method: 'GET',
      headers: {
    'Authorization':'Bearer ' + localStorage.getItem("token") 
       } })
      .then(result => result.json())
      .then(data => {
        usersJson = data
        confAccounts()
      })
  } else {
    alert("no tienes acceso")
  }
}

function confAccounts() {
  mainAccount.innerHTML = `
    <button class="col-2 right" data-bs-toggle="modal" data-bs-target="#mainModal" onclick="popModalUser()">Añadir nuevo usuario</button>
    <table class="table mt-4">
         <thead>
           <tr>
           <th scope="col-1"></th>
            <th scope="col-1">ID</th>
            <th scope="col-2">Username</th>
            <th scope="col-2">Nombre</th>
            <th scope="col-2">Apellidos</th>
            <th scope="col-2">Role</th>
            <th scope="col-1"></th>
            <th scope="col-1"></th>
           </tr>
         </thead>
         <tbody id="tbody">
            
         </tbody>
         </table>`
  printUsers()
}

function printUsers() {
  let tbody = document.getElementById("tbody")
  tbody.innerHTML = ""
  for (let thisUser of usersJson) {
    tbody.innerHTML += `
    <td class="col-1"></td>
        <td class="col-1">${thisUser.id}</td>
        <td class="col-2">${thisUser.username}</td>
        <td class="col-2">${thisUser.name}</td>
        <td class="col-2">${thisUser.surnames}</td>
        <td class="col-2">${thisUser.role}</td>
        <td class="col-1"><button type="button" data-bs-toggle="modal" data-bs-target="#mainModal" onclick="confirmDeleteUser(${thisUser.id})"><img src="img/trash-black.svg" height="20"/></button></td>
        <td class="col-1"></td>
        `
  }
}

function confirmDeleteUser(id) {
  titleModal.innerHTML = "¿Estas Seguro que deseas Borrar este Usuario?"
  modalHtml.innerHTML = `
                 <div class="modal-footer">
					        <button type="submit" class="btn btn-primary" id="deleteButton" onclick="deleteUser(${id})" data-bs-dismiss="modal" aria-label="Close">Aceptar</button>
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                 </div>
                 `
}

function deleteUser(id) {
  fetch(DOMINIO + "/api/users/" + id, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
  })
    .then(response => {
      //response.json();
      fetchUsers();
    })
    .then(response => console.log(response))
    .catch(error => error);
}

async function comprobeNewPassword() {
  let password1 = document.getElementById("newPassword1").value
  let password2 = document.getElementById("newPassword2").value

  if (password1 != password2 || password1 == "") {
    alert("Las contraseñas no coinciden")
  } else {
    let newUserPassword = {
      "id": user.id,
      "name": user.name,
      "surnames": user.surnames,
      "username": user.username,
      "password": password1,
      "role": user.role
    }
    let userData = await saveNewPassword(newUserPassword)
    if (userData != "") {
      //setUserData(userData);
      alert("Registro completado");
    } else {
      alert("Error!");
    }

  }
}

async function saveNewPassword(newUserPassword) {
  var request = new Request(DOMINIO + "/api/register",
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      body: JSON.stringify(newUserPassword)
    });

  try {
    const response = await fetch(request);
    const data = await response.json();
    return data;
  }
  catch (err) {
    console.error(err);
    return "";
  }
}

function popModalUser() {
  titleModal.innerHTML = "Añade un nuevo Usuario"
  modalHtml.innerHTML = `
                   <div class="modal-body">

                   <div class="form-floating mb-3">
                     <input type="text" class="form-control" id="userUsername" placeholder="Username">
                     <label for="floatingInput">Username</label>
                   </div>
                   <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="userPassword1" placeholder="Contraseña temporal">
                  <label for="floatingInput">Contraseña temporal</label>
                </div>
                <div class="form-floating mb-3">
                <input type="password" class="form-control" id="userPassword2" placeholder="Confirma tu contraseña">
                <label for="floatingInput">Confirma tu contraseña</label>
               </div>
                   <div class="form-floating mb-3">
                     <input type="text" class="form-control" id="userName" placeholder="Nombre">
                     <label for="floatingInput">Nombre</label>
                   </div>
                   <div class="form-floating mb-3">
                     <input type="text" class="form-control" id="userSurnames" placeholder="Apellidos">
                     <label for="floatingInput">Apellidos</label>
                   </div>

                   <div class="form-check">
                   <input class="form-check-input" type="checkbox" value="" id="userRole">
                   <label class="form-check-label" for="flexCheckIndeterminate">
                     Administrador
                   </label>
                 </div>


                 </div>
                 <div class="modal-footer">
                   <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                   <button type="submit" class="btn btn-primary" id="saveButton" onclick="insertUser()" data-bs-dismiss="modal" aria-label="Close">Guardar</button>
                 </div>
                 `
}

function popModalNewPassword() {
  titleModal.innerHTML = "Cambia tu contraseña"
  modalHtml.innerHTML = `
  <div class="modal-body">
              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="newPassword1" placeholder="Contraseña nueva">
                <label for="floatingInput">Contraseña nueva</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="newPassword2" placeholder="Confirma tu contraseña">
                <label for="floatingInput">Confirma tu contraseña</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="submit" class="btn btn-primary" id="saveButton" onclick="comprobeNewPassword()" data-bs-dismiss="modal" aria-label="Close">Cambiar contraseña</button>
            </div>
            `
}

async function insertUser() {
  let password1 = document.getElementById("userPassword1").value
  let password2 = document.getElementById("userPassword2").value
  if (password1 != password2 || password1 == "") {
    alert("Las contraseñas no coinciden")
  } else {
    let roleCheckbox = document.getElementById("userRole")
    let rol = ""
    if (roleCheckbox.checked) {
      rol = "admin"
    } else {
      rol = "user"
    }
    let newUser = {
      "username": document.querySelector("#userUsername").value,
      "password": password1,
      "name": document.querySelector("#userName").value,
      "surnames": document.querySelector("#userSurnames").value,
      "role": rol,
    }
    var userData = await register(newUser);
    if (userData != "") {
      //setUserData(userData);
      alert("Registro completado");
      fetchUsers()
    } else {
      alert("Error!");
    }
  }
}

async function register(newUser) {
  var request = new Request(DOMINIO + "/api/register",
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + localStorage.getItem("token") 
      },
      body: JSON.stringify(newUser)
    });

  try {
    const response = await fetch(request);
    const data = await response.json();
    return data;
  }
  catch (err) {
    console.error(err);
    return "";
  }
}