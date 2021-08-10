const restaurantDetailList = document.getElementById("restaurantDetailList")

const btnAddOrder = document.getElementById("btnAddOrder")
let inputCounter = 0

let detailProducts = []

init()

function init() {
	btnAddOrder.addEventListener('click', () => {
		popModalOrder()
	})
}

function popModalOrder() {
	pageState = 4;
	restaurantDetailList.innerHTML = ""
	fetch(DOMINIO + "/api/restaurants", { 
		method: 'GET',
		headers: {
	'Authorization':'Bearer ' + localStorage.getItem("token") 
 		} })
		.then(result => result.json())
		.then(data => {
			for (option of data) {
				restaurantDetailList.innerHTML += `
    			 <option value="${option.name}" data-value="${option.id}">
    		 `
			}
		})
	fetch(DOMINIO + "/api/products", { 
		method: 'GET',
		headers: {
	'Authorization':'Bearer ' + localStorage.getItem("token") 
 		} })
		.then(result => result.json())
		.then(data => {
			detailProducts = data
		})
	mainHtml.innerHTML = `
	     <div class="row mb-3">
	     <h5 class="col-2">Restaurante</h5>
		 <h5 class="col-2">Código P.</h5>
	     <h5 class="col-2">Producto</h5>
	     <h5 class="col-2">Cantidad</h5>
	     <h5 class="col-2">Precio Ud.</h5>
	     <h5 class="col-1">Importe</h5>
	   </div>
	     <form id="addForm">
	     </form>
	     <div class="row">
	   <img src="/img/+.svg" alt="sum" onCLick="addNewInput()" height="45" class="pointer col-1">
	   <button type="button" class="btn btn-success col-2" onclick="saveNewOrder()">Guardar</button>
	   <div class="col-1"></div>
	   <div id="erroresForm" class="col-5 mt-3"></div>
	   </div>`

	addNewInput()

}

function saveNewOrder() {
	let divForm = document.querySelectorAll(".new-order")
	for (data of divForm) {
		let restaurant = data.querySelector(".inputNewRestaurant")
		let product = data.querySelector(".inputNewProduct")
		let quantity = data.querySelector(".inputNewQuantity")
		let idPrd = data.querySelector(".inputNewIdPrd")

		if (restaurant.value === "") {
			document.getElementById("erroresForm").innerHTML = `<h5 class="text-danger">Debes rellenar todos los campos</h5>`
		} else if (product.value === "") {
			document.getElementById("erroresForm").innerHTML = `<h5 class="text-danger">Debes rellenar todos los campos</h5>`
		} else if (quantity.value === "") {
			document.getElementById("erroresForm").innerHTML = `<h5 class="text-danger">Debes rellenar todos los campos</h5>`
		} else {
			let restOption = restaurantDetailList.querySelector(`[value="${restaurant.value}"]`)
			let restID = restOption.getAttribute("data-value")

			let prodID = idPrd.value

			insertInventory(restID, prodID, quantity.value)
		}
	}
}

function insertInventory(restID, prodID, quantity) {
	fetch(DOMINIO + "/api/inventory/" + restID + "/" + prodID , { 
		method: 'GET',
		headers: {
	'Authorization':'Bearer ' + localStorage.getItem("token") 
 		} })
		.then(result => result.json())
		.then(data => {
			if (data.length > 0) {
				let inventoryData = {
					"id": data[0].id,
					"restaurant": { "id": restID },
					"product": { "id": prodID },
					"cantidad": data[0].cantidad + parseInt(quantity)
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
						fetchInventory();
					})
					.then(response => console.log(response))
					.catch(error => error);
			} else {
				let inventoryData = {
					"restaurant": { "id": restID },
					"product": { "id": prodID },
					"cantidad": quantity
				}
				fetch(DOMINIO + "/api/inventory/", {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization':'Bearer ' + localStorage.getItem("token")
					},
					body: JSON.stringify(inventoryData)
				})
					.then(response => {
						response.json()
						fetchInventory();
					}
					)
					.then(response => console.log(response))
					.catch(error => error);
			}
		})
}

function addNewInput() {
	const formHtml = document.getElementById("addForm")
	let createDiv = document.createElement("div")
	createDiv.setAttribute("class", "row mb-3 new-order")
	createDiv.setAttribute("id", "div" + inputCounter)
	formHtml.appendChild(createDiv)
	let divHtml = document.getElementById("div" + inputCounter)
	divHtml.innerHTML += `
     <div class="col-2">
       <label class="visually-hidden">Restaurante</label>
       <div class="input-group">
         <input class="form-control inputNewRestaurant" id="restaurante${inputCounter} " list="restaurantDetailList" placeholder="Restaurante" autocomplete="off" >
       </div>
     </div>

	 <div class="col-2">
       <label class="visually-hidden">Código Producto</label>
       <div class="input-group">
         <input type="number" class="form-control inputNewIdPrd" min="0" id="idPrd${inputCounter}" placeholder="Código producto" onChange="searchPrdByCp(${inputCounter})">
       </div>
     </div>

     <div class="col-2">
       <label class="visually-hidden">Producto</label>
       <div class="input-group">
         <input class="form-control inputNewProduct" id="producto${inputCounter}" list="productDetailList${inputCounter}" placeholder="Producto" autocomplete="off" onkeyup="listDetailProducts(${inputCounter})"
		 onChange="sumPriceAddInventory(${inputCounter})">
		 <datalist id="productDetailList${inputCounter}"></datalist>
       </div>
     </div>

     <div class="col-2">
       <label class="visually-hidden">Cantidad</label>
       <div class="input-group">
         <input type="number" class="form-control inputNewQuantity" min="0" id="cantidad${inputCounter}" placeholder="Cantidad" onChange="sumPriceAddInventory(${inputCounter})" onkeyup="sumPriceAddInventory(${inputCounter})">
       </div>
     </div>
     <div class="col-2">
       <label class="visually-hidden">Precio Ud.</label>
       <div class="input-group">
         <input type="number" class="form-control" id="precio${inputCounter}" placeholder="Precio Ud." disabled>
       </div>
     </div>
     <div class="col-1">
       <label class="visually-hidden">Importe</label>
       <div class="input-group">
         <input type="number" class="form-control" id="total${inputCounter}" placeholder="Imp." disabled>
       </div>
     </div>
     <img src="img/x.svg" alt="sum" onCLick="deleteInput(${inputCounter})" height="30" class="pointer col-1">
   `
	inputCounter++
}

function listDetailProducts(input) {
	let productDetailList = document.getElementById("productDetailList" + input)
	productDetailList.innerHTML = ""
	let inputProduct = document.getElementById("producto" + input)
	let textInput = inputProduct.value.toLowerCase()
	if (textInput.length >= 3) {
		let options = detailProducts.filter(
			(data) => {
				let product = data.description.toLowerCase();
				return product.indexOf(textInput) > -1
			}
		)
		for (let i = 0; i < 5; i++) { 
			if (options.length > i ) {
			productDetailList.innerHTML += `
		 <option value="${options[i].description.toLowerCase()}" data-value="${options[i].id}" data-price="${options[i].price}">
	 `
	}
		}
	}
}

function searchPrdByCp(counter) {
	let intPrdId = document.getElementById("idPrd" + counter)
	let prdId = intPrdId.value.toString()
	let intProduct = document.getElementById("producto" + counter)
	let result = detailProducts.filter(
		(data) => {
			let product = data.id.toString();
			return product === prdId;
		}
	)
	intProduct.value = result[0].description.toLowerCase();
	listDetailProducts(counter)
}

function sumPriceAddInventory(counter) {
	let inpProduct = document.getElementById("producto" + counter).value.toLowerCase()
	let inpCantidad = document.getElementById("cantidad" + counter).value

	if (inpProduct != "" && inpCantidad != "") {
		let inpPrecio = document.getElementById("precio" + counter)
		let inpTotal = document.getElementById("total" + counter)
		let intPrdId = document.getElementById("idPrd" + counter)
		let productDetailList = document.getElementById("productDetailList" + counter)
		let prodOption = productDetailList.querySelector(`[value="${inpProduct}"]`)
		let prodPrice = prodOption.getAttribute("data-price")
		let prodId = prodOption.getAttribute("data-value")

		inpPrecio.value = prodPrice
		inpTotal.value = (prodPrice * inpCantidad).toFixed(2)
		intPrdId.value = prodId
	} 
}

function deleteInput(num) {
	let divId = document.getElementById("div" + num)
	divId.remove()
} 
