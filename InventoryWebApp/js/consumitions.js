const consumitionBtn = document.getElementById("btnConsumitions")
const consumitionHistoryBtn = document.getElementById("btnConsumitionHistory")
let IConsumition = 0
let jsonConsumitionHistory = []
let jsonRestaurants = []

init()

function init() {
  consumitionBtn.addEventListener('click', () => {
    popConsumitionForm()
  })
  consumitionHistoryBtn.addEventListener('click', () => {
    fetchConsumitionHistory()
  })
  fetch(DOMINIO + "/api/restaurants", { 
		method: 'GET',
		headers: {
	'Authorization':'Bearer ' + localStorage.getItem("token") 
 		} })
    .then(result => result.json())
    .then(data => {
      jsonRestaurtants = data
    })
}

function popConsumitionForm() {
  fetch(DOMINIO + "/api/recipes", { 
		method: 'GET',
		headers: {
	'Authorization':'Bearer ' + localStorage.getItem("token") 
 		} })
  .then(result => result.json())
  .then(data => {
    jsonRecipes = data
  })
  let d = new Date()
  let date = d.toISOString().slice(0, 10)
  pageState = 6
  mainHtml.innerHTML = `<h4 class="text-center mt-3">Añade tu consumición</h4>
  <form class="mt-5">
  <div class="row justify-content-center mb-5">
    <label class="col-1 fw-bold" for="date">Fecha</label>
    <input class="col-5" type="date" id="newDateConsumition" value="${date}">
    </div>

    <div class="row justify-content-center mb-5">
    <label class="col-1 fw-bold">Restaurante</label>
    <input type="text" class="col-5" id="newRestaurantConsumition" list="restaurantDetailList" placeholder="Restaurante" autocomplete="off">
    <datalist class="col-1" id="restaurantDetailList"></datalist>
  </div>

  <div class="row justify-content-center mb-5">
    <label class="col-1 fw-bold">Receta</label>
    <input type="text" class="col-5" id="newRecipeConsumition" list="recipeDetailList" placeholder="Receta" autocomplete="off" onkeyup="recipeDataList()">
    <datalist id="recipeDetailList"></datalist>
  </div>

  <div class="row justify-content-center mb-5">
  <label class="col-1 fw-bold">Cantidad</label>
         <input type="number" class="col-5" min="0" id="newCantConsumition" placeholder="Cantidad">
         </div>

     <div class="row justify-content-center">
    <button type="button" class="col-3 btn btn-primary" onclick="saveConsumition()">Aplicar Consumición</button>
    </div>
  </form>`
  restaurantDataList()
}

function restaurantDataList() {
  const dataList = document.getElementById("restaurantDetailList")
  for (restaurant of jsonRestaurtants) {
    dataList.innerHTML += `
       <option value="${restaurant.name}" data-value="${restaurant.id}">
     `
  }
}

function recipeDataList() {
  const dataList = document.getElementById("recipeDetailList")
  dataList.innerHTML = ""
  let inputValue = document.getElementById("newRecipeConsumition")
  let textInput = inputValue.value.toLowerCase()
  if (textInput.length >= 2) {
    let result = jsonRecipes.filter(
      (data) => {
        let recipe = data.name.toLowerCase();
        return recipe.indexOf(textInput) > -1
      }
    )
    for (let recipe of result) {
      dataList.innerHTML += `
		 <option value="${recipe.name.toLowerCase()}" data-value="${recipe.id}">
	 `
    }
  }
}

function saveConsumition() {
  let date = document.getElementById("newDateConsumition")
  let restaurant = document.getElementById("newRestaurantConsumition")
  let recipe = document.getElementById("newRecipeConsumition")
  let cantidad = document.getElementById("newCantConsumition")

  const restaurantDataList = document.getElementById("restaurantDetailList")
  let restOption = restaurantDataList.querySelector(`[value="${restaurant.value}"]`)
  let restID = restOption.getAttribute("data-value")

  let recipetDetailList = document.getElementById("recipeDetailList")
  let recipeOption = recipetDetailList.querySelector(`[value="${recipe.value.toLowerCase()}"]`)
  let recipeID = recipeOption.getAttribute("data-value")

  insertConsumition(date, restID, recipeID, cantidad)
}

function insertConsumition(date, restID, recipeID, cant) {
  let consumitionData = {
    "restaurant": { "id": restID },
    "recipe": { "id": recipeID },
    "date": date.value,
    "cantidad": cant.value
  };
  fetch(DOMINIO + "/api/consumitionHistory/", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
			'Authorization':'Bearer ' + localStorage.getItem("token")
    },
    body: JSON.stringify(consumitionData)
  })
    .then(response => {
      response.json()
    }
    )
    .then(response => console.log(response))
    .catch(error => error);

  fetch(DOMINIO + "/api/recipeProducts/recipes/" + recipeID, { 
		method: 'GET',
		headers: {
	'Authorization':'Bearer ' + localStorage.getItem("token") 
 		} })
    .then(result => result.json())
    .then(recipeProducts => {
      for (let product of recipeProducts) {
        fetch(DOMINIO + "/api/inventory/" + restID + "/" + product.product.id, { 
          method: 'GET',
          headers: {
        'Authorization':'Bearer ' + localStorage.getItem("token") 
           } })
          .then(result => result.json())
          .then(inventary => {
            let restCant = product.productCantidad * parseInt(cant.value)
            let newCant = inventary[0].cantidad - restCant
            if(newCant < 0) {
              newCant = 0
            }
            let inventoryData = {
              "id": inventary[0].id,
              "restaurant": { "id": restID },
              "product": { "id": product.product.id },
              "cantidad": newCant
            }
            fetch(DOMINIO + "/api/inventory/", {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + localStorage.getItem("token")
              },
              body: JSON.stringify(inventoryData)
            })
              .then(response => {
                response.json();
                popConsumitionForm();
              })
              .then(response => console.log(response))
              .catch(error => error);
          })
      }
    })
}

function fetchConsumitionHistory() {
  fetch(DOMINIO + "/api/restaurants", { 
		method: 'GET',
		headers: {
	'Authorization':'Bearer ' + localStorage.getItem("token") 
 		} })
    .then(result => result.json())
    .then(data => {
      jsonRestaurants = data
    })
  fetch(DOMINIO + "/api/consumitionHistory", { 
		method: 'GET',
		headers: {
	'Authorization':'Bearer ' + localStorage.getItem("token") 
 		} })
    .then(result => result.json())
    .then(data => {
      jsonConsumitionHistory = data
      headerConsumitionHistory()
    })
}

function headerConsumitionHistory() {
  let d = new Date()
  let date = d.toISOString().slice(0, 10)
  mainHtml.innerHTML = `
	<div class="row mb-4 mt-3">

  <div class="col-4">
  <input type="date" id="dateConsumition" value="${date}">
  <button class="button" onclick="filterByDate()">Filtrar por fecha</button>
  </div>

	<div class="col-4">
  <select id="selectRestaurant" class="">
	<option value="all" selected>Todos</option>
  <select>
  <button class="button" onclick="filterByRestaurant()">Filtrar por restaurante</button>
  </div>

  </div>
  <div id="mainHtml2"></div>`
  for (let restaurant of jsonRestaurants) {
    document.getElementById("selectRestaurant").innerHTML += `
		 <option value="${restaurant.id}">${restaurant.name}</option>
		 `
  }
  getConsumitionHistory()
}

function getConsumitionHistory() {
  IConsumition = 0
  maxList = 30
  pageState = 7
  document.getElementById("mainHtml2").innerHTML = `
 
  <table class="table">
  <thead>
    <tr>
      <th scope="col-2" class="pointer" onclick="orderConsumitionHistory('date')">Fecha <img id="tbChDate" src=${orderChDate} data-target=${targetChDate}></img></th>
      <th scope="col-3" class="pointer" onclick="orderConsumitionHistory('rest')">Restaurante <img id="tbChRest" src=${orderChRest} data-target=${targetChRest}></img></th>
      <th scope="col-3" class="pointer" onclick="orderConsumitionHistory('recp')">Receta <img id="tbChRecp" src=${orderChRecp} data-target=${targetChRecp}></img></th>
      <th scope="col-1" class="pointer" onclick="orderConsumitionHistory('cant')">Cantidad <img id="tbChCant" src=${orderChCant} data-target=${targetChCant}></img></th>
      <th scope="col-1"></th>
    </tr>
  </thead>
  <tbody id="tbody">
  </tbody>
  </table>`
    ;
  printConsumitionHistory()
}

function printConsumitionHistory() {
  if (jsonConsumitionHistory.length < maxList) {
    maxList = jsonConsumitionHistory.length
  }
  for (IConsumition; IConsumition < maxList; IConsumition++) {
    let fecha = jsonConsumitionHistory[IConsumition].date.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
    document.getElementById("tbody").innerHTML += `
             <tr id="p${IConsumition}">
                 <td class="col-2">${fecha}</td>
                 <td class="col-3">${jsonConsumitionHistory[IConsumition].restaurant.name}</td>
                 <td class="col-3">${jsonConsumitionHistory[IConsumition].recipe.name}</td>
                 <td class="col-2">${jsonConsumitionHistory[IConsumition].cantidad}</td>
                 <td class="col-1"><img src="img/trash.svg" height="20" class="pointer" onclick="confirmDeleteConsumitionHisotry('${jsonConsumitionHistory[IConsumition].id}', '${jsonConsumitionHistory[IConsumition].restaurant.id}', '${jsonConsumitionHistory[IConsumition].recipe.id}', '${jsonConsumitionHistory[IConsumition].cantidad}' )" data-bs-toggle="modal" data-bs-target="#mainModal"></img></td>
            <th class="col-1></td>
                 </tr>
             `
  }
}

function filterByDate() {
  let date = document.getElementById("dateConsumition").value
  fetch(DOMINIO + "/api/consumitionHistory/date/" + date, { 
		method: 'GET',
		headers: {
	'Authorization':'Bearer ' + localStorage.getItem("token") 
 		} })
    .then(result => result.json())
    .then(data => {
      jsonConsumitionHistory = data
      getConsumitionHistory()
    })
}

function filterByRestaurant() {
  let idRestaurant = document.getElementById("selectRestaurant").value
  let url = ""
  if (idRestaurant == 'all') {
    url = "/api/consumitionHistory"
  } else {
    url = "/api/consumitionHistory/restaurats/" + idRestaurant
  }
  fetch(DOMINIO + url, { 
		method: 'GET',
		headers: {
	'Authorization':'Bearer ' + localStorage.getItem("token") 
 		} })
    .then(result => result.json())
    .then(data => {
      jsonConsumitionHistory = data
      getConsumitionHistory()
    })
}

function confirmDeleteConsumitionHisotry(id, restID, recpID, cant) {
  console.log(id)
  titleModal.innerHTML = "¿Estas Seguro que deseas Borrar este Registro?"
  modalHtml.innerHTML = `
                 <div class="modal-footer">
					          <button type="submit" class="btn btn-primary" id="deleteButton" onclick="restoreConsumitionHistory('${id}', '${restID}', '${recpID}', '${cant}')">Aceptar</button>
                   <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                 </div>
                 `
}

function restoreConsumitionHistory(id, restID, recpID, cant) {
  titleModal.innerHTML = "¿Quieres restablecer los productos del inventario?"
  modalHtml.innerHTML = `
                 <div class="modal-footer">
					        <button type="submit" class="btn btn-primary" onclick="deleteConsumitionHistory('${id}', '${restID}', '${recpID}', '${cant}', 'yes')" data-bs-dismiss="modal" aria-label="Close">Si</button>
                  <button type="button" class="btn btn-secondary" onclick="deleteConsumitionHistory('${id}', '${restID}', '${recpID}', '${cant}', 'no')" data-bs-dismiss="modal" aria-label="Close">No</button>
                 </div>
                 `
}

function deleteConsumitionHistory(id, restID, recipeID, cant, confirm) {
  fetch(DOMINIO + "/api/consumitionHistory/" + id, 
  { 
    method: 'DELETE',
    headers: {
'Authorization':'Bearer ' + localStorage.getItem("token") 
}})		
    .then(response => {
      
    })
    .then(response => console.log(response))
    .catch(error => error);
  if (confirm === "yes") {
    fetch(DOMINIO + "/api/recipeProducts/recipes/" + recipeID, { 
      method: 'GET',
      headers: {
    'Authorization':'Bearer ' + localStorage.getItem("token") 
       } })
      .then(result => result.json())
      .then(recipeProducts => {
        for (let product of recipeProducts) {
          fetch(DOMINIO + "/api/inventory/" + restID + "/" + product.product.id, { 
            method: 'GET',
            headers: {
          'Authorization':'Bearer ' + localStorage.getItem("token") 
             } })
            .then(result => result.json())
            .then(inventary => {
              let restCant = product.productCantidad * parseInt(cant)
              let inventoryData = {
                "id": inventary[0].id,
                "restaurant": { "id": restID },
                "product": { "id": product.product.id },
                "cantidad": inventary[0].cantidad + restCant
              }
              fetch(DOMINIO + "/api/inventory/", {
                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization':'Bearer ' + localStorage.getItem("token")
                },
                body: JSON.stringify(inventoryData)
              })
                .then(response => {
                  response.json();
                  fetchConsumitionHistory();
                })
                .then(response => console.log(response))
                .catch(error => error);
              })
            }
          })
      } else {
        fetchConsumitionHistory();
      }
    }