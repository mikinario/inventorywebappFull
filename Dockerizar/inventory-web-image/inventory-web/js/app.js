//const DOMINIO = "https://inventorywebapp.site:8043"
//const DOMINIO = "http://inventorywebapp.site:8081"
const DOMINIO = "http://localhost:8081"

const mainHtml = document.getElementById("mainHtml");
const detailHtml = document.getElementById("datalistOptions")

const detailInput = document.getElementById("detailistInput")
const saveButton = document.getElementById("saveButton")
const modalHtml = document.getElementById("bodyModal")
const titleModal = document.getElementById("titleModal")
const inputSearch = document.getElementById("inputSearch")
const buttonSearch = document.getElementById("buttonSearch")
const mainModal = document.getElementById("mainModal")

let jsonProducts = []
let jsonInventory = []
let jsonRestaurants = []
let Iproduct = 0;
let Iinventory = 0;
let maxList = 30;
let pageState = 1;

init()

function init() {
	inputSearch.addEventListener('keypress', (e) => {
		if (e.key === 'Enter') {
			searchBar()
		}
	})
	buttonSearch.addEventListener('click', () => {
		searchBar()
	})
	window.addEventListener('scroll', () => {
		let clientScreen = Math.ceil(document.scrollingElement.scrollTop + document.documentElement.clientHeight)
		let totalScreen = document.scrollingElement.scrollHeight
		if (clientScreen === totalScreen || clientScreen === totalScreen + 1 || clientScreen === totalScreen - 1) {
			if (pageState === 0) {
				//if (jsonProducts.length > Iproduct) {
					maxList = maxList + 20
					printProducts()
				//} 
			} else if (pageState === 1) {
				//if (jsonInventory.length > Iinventory ) {
					maxList = maxList + 20
					printInventory()
				//} 
			}
		}
	});
	fetchInventory()
}



function fetchProducts() {
	fetch(DOMINIO + "/api/products/", { 
		method: 'GET',
		headers: {
		'Authorization':'Bearer ' + localStorage.getItem("token") 
 		} })
		.then(result => result.json())
		.then(data => {
			jsonProducts = data
			getProducts()
		})
}

function getProducts() {
	pageState = 0;
	Iproduct = 0;
	maxList = 30;
	mainHtml.innerHTML = `
	<table class="table">
             <thead>
               <tr>
                 <th scope="col-1" class="pointer" onclick="orderProductList('id')">Código <img id="tbPrdId" src=${orderPrdId} data-target=${targetPrdId}></img></th>
                 <th scope="col-3" class="pointer" onclick="orderProductList('desc')">Descripción <img id="tbPrdDesc" src=${orderPrdDesc} data-target=${targetPrdDesc}></img></th>
                 <th scope="col-2" class="pointer" onclick="orderProductList('prc')">Precio Ud. <img id="tbPrdPrc" src=${orderPrdPrc} data-target=${targetPrdPrc}></img></th>
				 <th scope="col-3" class="pointer" onclick="orderProductList('supp')">Proveedor<img id="tbPrdSupp" src=${orderPrdSupp} data-target=${targetPrdSupp}></img></th>
                 <th scope="col-3"><img src="img/green_+.svg" alt="sum" height="45" class="pointer offset-md-5 mb-3" type="button" data-bs-toggle="modal" data-bs-target="#mainModal" id="btnAddProduct" onclick="popModalProduct()"></th>
               </tr>
             </thead>
             <tbody id="tbody">
             </tbody>
             </table>`
		;
	printProducts()
}

function printProducts() {
	if (jsonProducts.length < maxList) {
		maxList = jsonProducts.length
	}
	for (Iproduct; Iproduct < maxList; Iproduct++) {
		let supplier = jsonProducts[Iproduct].supplier.name + " " + jsonProducts[Iproduct].supplier.surnames
		document.getElementById("tbody").innerHTML += `
             <tr id="p${Iproduct}">
                 <td class="col-1">${jsonProducts[Iproduct].id}</td>
                 <td class="col-3">${jsonProducts[Iproduct].description}</td>
                 <td class="col-2">${jsonProducts[Iproduct].price} €</td>
				 <td class="col-3">${supplier}</td>
                 <td class="col-3"><button type="button" class="btn btn-warning" onclick="editProduct('p${Iproduct}', '${jsonProducts[Iproduct].id}' , '${jsonProducts[Iproduct].description}' , '${jsonProducts[Iproduct].price}',  '${supplier}', '${jsonProducts[Iproduct].supplier.id}')">Editar</button></td>
             </tr>
             `
	}
}

function editProduct(pid, id, desc, price, supplier, suppId) {
	document.getElementById(pid).innerHTML = `
                 <td class="col-1">${id}</td>
                 <td class="col-3"><input type="text" class="form-control" value="${desc}" id="editDescProduct${pid}"></td>
                 <td class="col-2"><input type="text" class="form-control" value="${price}" id="editPriceProduct${pid}"></td>
				 <td class="col-3">${supplier}</td>
                 <td class="col-3">
                 <button type="button" class="btn btn-danger" onclick="confirmDeleteProduct(${id})" data-bs-toggle="modal" data-bs-target="#mainModal">Eliminar</button> 
                 <button type="button" class="btn btn-success" onclick="modifyProduct('${id}', '${pid}', '${suppId}')">Guardar</button>
                 <button type="button" class="btn btn-secondary" onclick="cancelProduct('${pid}', '${id}', '${desc}', '${price}', '${supplier}', '${suppId}')">Cancelar</button>
                 </td>
         `
}

function cancelProduct(pid, id, desc, price, supplier, suppId) {
	document.getElementById(pid).innerHTML = `
		 <td class="col-1">${id}</td>
         <td class="col-3">${desc}</td>
         <td class="col-2">${price}</td>
		 <td class="col-3">${supplier}</td>
         <td class="col-3"><button type="button" class="btn btn-warning" onclick="editProduct('${pid}', '${id}' , '${desc}' , '${price}', '${supplier}', '${suppId}')">Editar</button></td>
     
	 `
}

function confirmDeleteProduct(id) {
	titleModal.innerHTML = "¿Estas Seguro que deseas Borrar este Producto?"
	modalHtml.innerHTML = `
                 <div class="modal-footer">
					<button type="submit" class="btn btn-primary" id="deleteButton" onclick="deleteProduct(${id})" data-bs-dismiss="modal" aria-label="Close">Aceptar</button>
                   <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                 </div>
                 `
}

function deleteProduct(id) {
		fetch(DOMINIO + "/api/products/" + id, { 
			method: 'DELETE',
			headers: {
		'Authorization':'Bearer ' + localStorage.getItem("token") 
	 }
	})
			.then(response => {
				//response.json();
				fetchProducts();
			})
			.then(response => console.log(response))
			.catch(error => error);
}

function modifyProduct(productID, pid, suppId) {
	let productData = {
		id: productID,
		description: document.querySelector("#editDescProduct" + pid).value,
		price: document.querySelector("#editPriceProduct" + pid).value,
		supplier: {id: suppId}
	}
	console.log(productData)
	fetch(DOMINIO + "/api/products/", {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization':'Bearer ' + localStorage.getItem("token")
		},
		body: JSON.stringify(productData)
	})
		.then(response => {
			response.json();
			fetchProducts();
		})
		.then(response => console.log(response))
		.catch(error => error);
}

function fetchRestaurants() {
	fetch(DOMINIO + "/api/restaurants", { 
		method: 'GET',
		headers: {
	'Authorization':'Bearer ' + localStorage.getItem("token") 
 		} })
		.then(result => result.json())
		.then(data => {
			getRestaurants(data)
		})
}

function getRestaurants(data) {
	pageState = 3;
	let Irestaurant = 0;
	mainHtml.innerHTML = `<table class="table">
	             <thead>
	               <tr>
	                 <th scope="col-2">ID</th>
	                 <th scope="col-7">Nombre</th>
	                 <th scope="col-3"><img src="img/green_+.svg" alt="sum" height="45" class="pointer offset-md-5 mb-3" type="button" data-bs-toggle="modal" data-bs-target="#mainModal" id="btnAddRestaurant" onclick="popModalRestaurant()"></th>
	               </tr>
	             </thead>
	             <tbody id="tbody">
	             </tbody>
	             </table>`
		;
	for (let restaurant of data) {
		document.getElementById("tbody").innerHTML += `
	             <tr id="r${Irestaurant}">
	                 <td class="col-2">${restaurant.id}</td>
	                 <td class="col-7">${restaurant.name}</td>
	                 <td class="col-3"><button type="button" class="btn btn-warning" onclick="editRestaurant('r${Irestaurant}', '${restaurant.id}' , '${restaurant.name}')">Editar</button></td>
	             </tr>
	             `
		Irestaurant++;
	}
}

function editRestaurant(rid, id, name) {
	document.getElementById(rid).innerHTML = `
	                 <td class="col-2">${id}</td>
	                 <td class="col-7"><input type="text" class="form-control" value="${name}" id="editNameRestaurant${rid}"></td>
	                 <td class="col-3">
	                 <button type="button" class="btn btn-danger" onclick="confirmDeleteRestaurant(${id})" data-bs-toggle="modal" data-bs-target="#mainModal">Eliminar</button> 
	                 <button type="button" class="btn btn-success" onclick="modifyRestaurant('${id}', '${rid}')">Guardar</button>
	                 <button type="button" class="btn btn-secondary" onclick="cancelRestaurant('${rid}','${id}','${name}')">Cancelar</button>
	                 </td>
	         `
}

function cancelRestaurant(rid, id, name) {
	document.getElementById(rid).innerHTML = `
		 <td class="col-1">${id}</td>
         <td class="col-4">${name}</td>
         <td class="col-3"><button type="button" class="btn btn-warning" onclick="editRestaurant('${rid}', '${id}' , '${name}')">Editar</button></td>
	 `
}

function confirmDeleteRestaurant(id) {
	titleModal.innerHTML = "¿Estas Seguro que deseas Borrar este Restaurante?"
	modalHtml.innerHTML = `
                 <div class="modal-footer">
					<button type="submit" class="btn btn-primary" id="deleteButton" onclick="deleteRestaurant(${id})" data-bs-dismiss="modal" aria-label="Close">Aceptar</button>
                   <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                 </div>
                 `
}

function deleteRestaurant(id) {
		fetch(DOMINIO + "/api/restaurants/" + id, { 
			method: 'DELETE',
			headers: {
		'Authorization':'Bearer ' + localStorage.getItem("token") 
	 }
	})
			.then(response => {
				//response.json();
				fetchRestaurants();
				
			})
			.then(response => console.log(response))
			.catch(error => error);
}

function modifyRestaurant(restaurantID, rid) {
	let restaurantData = {
		id: restaurantID,
		name: document.querySelector("#editNameRestaurant" + rid).value,
	}
	fetch(DOMINIO + "/api/restaurants/", {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization':'Bearer ' + localStorage.getItem("token")
		},
		body: JSON.stringify(restaurantData)
	})
		.then(response => {
			response.json();
			fetchRestaurants();
		})
		.then(response => console.log(response))
		.catch(error => error);
}

function searchBar() {
	console.log("Buscando")
	let option = document.getElementById("selectSearch").value
	let wordSearch = document.getElementById("inputSearch").value.toLowerCase();

	if (option == "0") {
		fetch(DOMINIO + "/api/products/", { 
			method: 'GET',
			headers: {
		'Authorization':'Bearer ' + localStorage.getItem("token") 
			 } })
			.then(result => result.json())
			.then(dataJson => {
				let result = dataJson.filter(
					(data) => {
						let id = data.id.toString();
						let title = data.description.toLowerCase();
						let suppName = data.supplier.name.toLowerCase() + " " + data.supplier.surnames.toLowerCase();
						return title.indexOf(wordSearch) > -1 || id.indexOf(wordSearch) > -1 || suppName.indexOf(wordSearch) > -1
					}
				)
				jsonProducts = result
				getProducts()
			})
	} else if (option == "1") {
		fetch(DOMINIO + "/api/restaurants/", { 
			method: 'GET',
			headers: {
		'Authorization':'Bearer ' + localStorage.getItem("token") 
			 } })
			.then(result => result.json())
			.then(dataJson => {
				let result = dataJson.filter(
					(data) => {
						let title = data.name.toLowerCase();
						return title.indexOf(wordSearch) > -1
					}
				)
				getRestaurants(result)
			})
	} else if (option == "2") {
		fetch(DOMINIO + "/api/inventory/", { 
			method: 'GET',
			headers: {
		'Authorization':'Bearer ' + localStorage.getItem("token") 
			 } })
			.then(result => result.json())
			.then(dataJson => {
				let result = dataJson.filter(
					(data) => {
						let rest = data.restaurant.name.toLowerCase();
						let idPrd = data.product.id.toString();
						let prod = data.product.description.toLowerCase();
						let cant = data.cantidad.toString();
						return rest.indexOf(wordSearch) > -1 || prod.indexOf(wordSearch) > -1 || cant.indexOf(wordSearch) > -1 || idPrd.indexOf(wordSearch) > -1
					}
				)
				jsonInventory = result
				headerInventory()
			})
	} else if (option == "4") {
		fetch(DOMINIO + "/api/suppliers/", { 
			method: 'GET',
			headers: {
		'Authorization':'Bearer ' + localStorage.getItem("token") 
			 } })
			.then(result => result.json())
			.then(dataJson => {
				let result = dataJson.filter(
					(data) => {
						let id = data.id.toString();
						let name = data.name.toLowerCase() + " " + data.surnames.toLowerCase();
						let contact = data.contact.toLowerCase();
						return id.indexOf(wordSearch) > -1 || name.indexOf(wordSearch) > -1 || contact.indexOf(wordSearch) > -1 
					}
				)
				jsonSuppliers = result
				getSuppliers()
			})
	}
}

function fetchInventory() {
	fetch(DOMINIO + "/api/restaurants", { 
		method: 'GET',
		headers: {
	'Authorization':'Bearer ' + localStorage.getItem("token") 
 		} })
		.then(result => result.json())
		.then(data => {
			jsonRestaurants = data
		})
	fetch(DOMINIO + "/api/inventory", { 
		method: 'GET',
		headers: {
	'Authorization':'Bearer ' + localStorage.getItem("token") 
 		} })
		.then(result => result.json())
		.then(data => {
			jsonInventory = data
			headerInventory()
		})
}

function headerInventory() {
	mainHtml.innerHTML = `
	<div class="row">
	<div class="col-2">
	<select class="form-select btn-light mb-3" id="selectRestaurant" onchange="fetchInventoryByRestaurant()">
	<option value="all" selected>Todo el inventario</option>
  </select>
  </div>
  </div>
  <div id="mainHtml2"></div>`
	for (let restaurant of jsonRestaurants) {
		document.getElementById("selectRestaurant").innerHTML += `
		 <option value="${restaurant.id}">${restaurant.name}</option>
		 `
	}
	getInventory()
}

function getInventory() {
	Iinventory = 0
	pageState = 1;
	maxList = 30;
	document.getElementById("mainHtml2").innerHTML = `<table class="table">
	<thead>
	<tr>
		<th scope="col-2" class="pointer" onclick="orderInventoryList('rest')">Restaurante <img id="tbInvRest" src=${orderInvRest} data-target=${targetInvRest}></img></th>
		<th scope="col-1" class="pointer" onclick="orderInventoryList('idProd')">C.P <img id="tbInvIdPrd" src=${orderInvIdPrd} data-target=${targetInvIdPrd}></img></th>
		<th scope="col-3" class="pointer" onclick="orderInventoryList('prod')">Desc. Producto <img id="tbInvProd" src=${orderInvProd} data-target=${targetInvProd}></img></th>
		<th scope="col-1" class="pointer" onclick="orderInventoryList('cant')">Stock <img id="tbInvCant" src=${orderInvCant} data-target=${targetInvCant}></img></th>
		<th scope="col-1" class="pointer" onclick="orderInventoryList('prc')">Prc Ud. <img id="tbInvPrc" src=${orderInvPrc} data-target=${targetInvPrc}></img></th>
		<th scope="col-1">Importe</th>
		<th scope="col-3"></th>
  </tr>
	</thead>
	<tbody id="tbody">
	</tbody>
	</table>`;
	printInventory()
}

function printInventory() {
	if (jsonInventory.length < maxList) {
		maxList = jsonInventory.length
	}
	for (Iinventory; Iinventory < maxList; Iinventory++) {
		let total = jsonInventory[Iinventory].cantidad * jsonInventory[Iinventory].product.price
		document.getElementById("tbody").innerHTML += `
		 <tr id="i${Iinventory}">
			<td class="col-2">${jsonInventory[Iinventory].restaurant.name}</td>
			<td class="col-1">${jsonInventory[Iinventory].product.id}</td>
			 <td class="col-3">${jsonInventory[Iinventory].product.description}</td>
			 <td class="col-1">${parseFloat(jsonInventory[Iinventory].cantidad.toFixed(3))}</td>
			 <td class="col-1">${jsonInventory[Iinventory].product.price} €</td>
			 <td class="col-1">${total.toFixed(2)} €</td>
			 <td class="col-3"><button type="button" class="btn btn-warning" onclick="editInventory('i${Iinventory}', '${jsonInventory[Iinventory].restaurant.name}', '${jsonInventory[Iinventory].product.description}', '${parseFloat(jsonInventory[Iinventory].cantidad.toFixed(3))}', '${jsonInventory[Iinventory].product.price}', '${total.toFixed(2)}', '${jsonInventory[Iinventory].id}', '${jsonInventory[Iinventory].restaurant.id}', '${jsonInventory[Iinventory].product.id}')">Editar</button></td>
		 </tr>
		 `
	}
}

function fetchInventoryByRestaurant() {
	let idRestaurant = document.getElementById("selectRestaurant").value
	let url = ""
	if (idRestaurant == 'all') {
		url = "/api/inventory"
	} else {
		url = "/api/inventory/restaurats/" + idRestaurant
	}
	fetch(DOMINIO + url, { 
		method: 'GET',
		headers: {
	'Authorization':'Bearer ' + localStorage.getItem("token") 
 		} })
		.then(result => result.json())
		.then(data => {
			jsonInventory = data
			getInventory()
		})
}

function editInventory(iid, rest, product, cantidad, price, total, id, restId, prodId) {
	document.getElementById(iid).innerHTML = `
	<td class="col-2">${rest}</td>
	<td class="col-1">${prodId}</td>
	<td class="col-3">${product}</td>
	<td class="col-1"><input type="text" class="form-control" value="${cantidad}" id="editCantidadInventory${iid}"></td>
	<td class="col-1">${price} €</td>
	<td class="col-1">${total} €</td>
	<td class="col-3">
	                 <button type="button" class="btn btn-danger" onclick="confirmDeleteInventory(${id})" data-bs-toggle="modal" data-bs-target="#mainModal">Eliminar</button> 
	                 <button type="button" class="btn btn-success" onclick="modifyInventory('${iid}', '${restId}', '${prodId}', '${id}')">Guardar</button>
	                 <button type="button" class="btn btn-secondary" onclick="cancelInventory('${iid}', '${rest}', '${product}', '${cantidad}', '${price}', ${total}, '${id}', ${restId}, ${prodId})">Cancelar</button>
	                 </td>
	         `
}

function cancelInventory(iid, rest, product, cantidad, price, total, id , restId, prodId) {
	document.getElementById(iid).innerHTML = `
	<td class="col-2">${rest}</td>
	<td class="col-1">${prodId}</td>
	<td class="col-3">${product}</td>
	<td class="col-1">${cantidad}</td>
	<td class="col-1">${price} €</td>
	<td class="col-1">${total} €</td>
	<td class="col-3"><button type="button" class="btn btn-warning" onclick="editInventory('${iid}', '${rest}', '${product}', '${cantidad}', '${price}', '${total}', '${id}', ${restId}, ${prodId})">Editar</button></td>
`
}

function confirmDeleteInventory(id) {
	titleModal.innerHTML = "¿Estas Seguro que deseas Borrar este Registro?"
	modalHtml.innerHTML = `
                 <div class="modal-footer">
					<button type="submit" class="btn btn-primary" id="deleteButton" onclick="deleteInventory(${id})" data-bs-dismiss="modal" aria-label="Close">Aceptar</button>
                   <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                 </div>
                 `
}

function deleteInventory(id) {
		fetch(DOMINIO + "/api/inventory/" + id, { 
			method: 'DELETE',
			headers: {
		'Authorization':'Bearer ' + localStorage.getItem("token") 
	 }
	})
			.then(response => {
				response.json();
				fetchInventory();
			})
			.then(response => console.log(response))
			.catch(error => error);
}

function modifyInventory(iid, restId, prodId, inventoryID) {
	let inventoryData = {
		"id": inventoryID,
		"restaurant": { "id": restId },
		"product": { "id": prodId },
		"cantidad": document.querySelector("#editCantidadInventory" + iid).value
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
			fetchInventoryByRestaurant();
		})
		.then(response => console.log(response))
		.catch(error => error);
}

function popModalProduct() {
	if (jsonSuppliers.length == 0) {
		console.log("se hace el fetch")
		fetch(DOMINIO + "/api/suppliers")
		.then(result => result.json())
		.then(data => {
			jsonSuppliers = data
		})
	} else {console.log("No se hace")}
	titleModal.innerHTML = "Añade tu Producto"
	modalHtml.innerHTML = `
                   <div class="modal-body">

				   <div class="form-floating mb-3">
                     <input type="number" class="form-control" id="newProductId" placeholder="Codigo">
                     <label for="floatingInput">Código</label>
                   </div>

                   <div class="form-floating mb-3">
                     <input type="text" class="form-control" id="newProductName" placeholder="Descripción del producto">
                     <label for="floatingInput">Descripción del producto</label>
                   </div>

                   <div class="form-floating mb-3">
                     <input type="number" class="form-control" id="newProductPrice" placeholder="Precio por unidad">
                     <label for="floatingInput">Precio</label>
                   </div>

				   <div class="form-floating">
                     <input type="text" class="form-control" id="newProductSupplier" list="supplierDetailList" placeholder="Nombre del Proveedor" onkeyup="listDetailSupplier()" autocomplete="off">
                     <label for="floatingInput">Nombre del Proveedor</label>
                   </div>
				   <datalist id="supplierDetailList"></datalist>
                   
                 </div>
                 <div class="modal-footer">
                   <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                   <button type="submit" class="btn btn-primary" id="saveButton" onclick="insertProduct()" data-bs-dismiss="modal" aria-label="Close">Guardar</button>
                 </div>
                 `
}

function listDetailSupplier() {
	supplierDetailList.innerHTML = ""
	let inputSupplier = document.getElementById("newProductSupplier")
	let textInput = inputSupplier.value.toLowerCase()
	if (textInput.length >= 3) {
		let result = jsonSuppliers.filter(
			(data) => {
				let name = data.name.toLowerCase() + " " + data.surnames.toLowerCase();
				return name.indexOf(textInput) > -1 
			}
		)
		for (let option of result) {
			supplierDetailList.innerHTML += `
		 <option value="${option.name.toLowerCase()} ${option.surnames.toLowerCase()}" data-value="${option.id}">
	 `
		}
	}
	console.log(document.getElementById("supplierDetailList"))

}

function popModalRestaurant() {
	titleModal.innerHTML = "Añade tu Restaurante"
	modalHtml.innerHTML = `
                   <div class="modal-body">

                   <div class="form-floating mb-3">
                     <input type="text" class="form-control" id="newRestaurantName" placeholder="Nombre del Restaurante">
                     <label for="floatingInput">Nombre</label>
                   </div>
                 </div>
                 <div class="modal-footer">
                   <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                   <button type="submit" class="btn btn-primary" id="saveButton" onclick="insertRestaurant()" data-bs-dismiss="modal" aria-label="Close">Guardar</button>
                 </div>
                 `
}

function insertProduct() {
	let supplier = document.getElementById("newProductSupplier").value
	let suppOption = document.getElementById("supplierDetailList").querySelector(`[value="${supplier}"]`)
	let suppID = suppOption.getAttribute("data-value")
	let productData = {
		"id": document.querySelector("#newProductId").value,
		"description": document.querySelector("#newProductName").value,
		"price": document.querySelector("#newProductPrice").value,
		"supplier": { "id": suppID }
	};
	fetch(DOMINIO + "/api/products/", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization':'Bearer ' + localStorage.getItem("token")
		},
		body: JSON.stringify(productData)
	})
		.then(response => {
			response.json()
			fetchProducts();
		}
		)
		.then(response => console.log(response))
		.catch(error => error);
}

function insertRestaurant() {
	let restaurantData = {
		"name": document.querySelector("#newRestaurantName").value
	};
	fetch(DOMINIO + "/api/restaurants/", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization':'Bearer ' + localStorage.getItem("token")
		},
		body: JSON.stringify(restaurantData)
	})
		.then(response => {
			response.json()
			fetchRestaurants();
		}
		)
		.then(response => console.log(response))
		.catch(error => error);
}
/*
function addMuchProducts() {
	let idProduct = 1500000000
	for (let i = 0; i < 100; i++) {
		let productData = {
			"id": idProduct,
			"description": "xProducto" + i,
			"price": 5.50,
			"supplier": { "id": 1 }
		};
		idProduct = idProduct + 0102030405
		fetch(DOMINIO + "/api/products/", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization':'Bearer ' + localStorage.getItem("token")
			},
			body: JSON.stringify(productData)
		})
			.then(response => {
				response.json()
				fetchProducts();
			}
			)
			.then(response => console.log(response))
			.catch(error => error);
	}
	
}
*/