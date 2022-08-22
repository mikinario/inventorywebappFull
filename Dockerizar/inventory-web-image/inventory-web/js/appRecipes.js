//const DOMINIO = "https://inventorywebapp.site:8043"
//const DOMINIO = "http://inventorywebapp.site:8081"
const DOMINIO = "http://localhost:8081"

const mainHtml = document.getElementById("mainHtml");
const inputSearch = document.getElementById("inputSearch")
const buttonSearch = document.getElementById("buttonSearch")
const buttonAddRecipe = document.getElementById("btnAddRecipe")
const modalHtml = document.getElementById("bodyModal")
let jsonRecipes = []
let jsonRecipeProducts = []
let detailProducts = []
let IRecipe = 0
let maxList = 50;
let pageState = 6

init()

function init() {
    let user = JSON.parse(localStorage.getItem("user"))
	userMenu.innerHTML = "Hola " + user.name
    
    window.addEventListener('scroll', () => {
        let clientScreen = Math.ceil(document.scrollingElement.scrollTop + document.documentElement.clientHeight)
        let totalScreen = document.scrollingElement.scrollHeight
        if (clientScreen === totalScreen || clientScreen === totalScreen + 1 || clientScreen === totalScreen - 1) {
          if (pageState === 5) {
            maxList = maxList + 24
            printRecipes()
          } else if (pageState === 7) {
              maxList = maxList + 20
              printConsumitionHistory()
          }
        }
      });

    inputSearch.addEventListener('keypress', (e) => {
		if (e.key === 'Enter') {
			searchBar()
		}
	})
	buttonSearch.addEventListener('click', () => {
		searchBar()
	})
    buttonAddRecipe.addEventListener('click', () => {
		popModalRecipe()
	})

    fetchRecipes()
}

function fetchRecipes() {
    fetch(DOMINIO + "/api/recipes/", { 
		method: 'GET',
		headers: {
	'Authorization':'Bearer ' + localStorage.getItem("token") 
 		} })
        .then(result => result.json())
        .then(data => {
            jsonRecipes = data
            getRecipes()
        })
}

function getRecipes() {
    maxList = 60
    pageState = 5;
    IRecipe = 0
    mainHtml.innerHTML = ""
    printRecipes()
}

/*
function createRecipes() {
	for (let i = 0; i < 120; i++) {
    let recipeData = {
		"name": "RecetaPrueba" + i
	};
	fetch(DOMINIO + "/api/recipes/", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(recipeData)
	})
		.then(response => {
			response.json()
			fetchRecipeName(name)
		}
		)
		.then(response => console.log(response))
		.catch(error => error);
}
}
*/

function printRecipes() {
    if (jsonRecipes.length < maxList) {
        maxList = jsonRecipes.length
      }
    for (IRecipe; IRecipe < maxList; IRecipe++) {
        mainHtml.innerHTML += `<div class="col-3 d-grid gap-2 mb-3 ">
        <button class="btn btn-outline-secondary" onclick="fetchRecipeByID('${jsonRecipes[IRecipe].id}')"> 
            <h5 class="text-dark">${jsonRecipes[IRecipe].name}</h5>
            <h6>Click para ver</h6>
        </button>
        </div>
        `
    }
}

function popModalRecipe() {
    titleModal.innerHTML = "Añade tu Receta"
	modalHtml.innerHTML = `
    <div class="modal-body">
    <div class="form-floating mb-3">
      <input type="text" class="form-control" id="newRecipeName" placeholder="Nombre de la Receta">
      <label for="floatingInput">Nombre de la Receta</label>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
    <button type="submit" class="btn btn-primary" id="saveButton" onclick="insertRecipe()" data-bs-dismiss="modal" aria-label="Close">Guardar</button>
  </div>
 `
}

function fetchRecipeByID(id) {
    fetch(DOMINIO + "/api/recipes/" + id, { 
		method: 'GET',
		headers: {
	'Authorization':'Bearer ' + localStorage.getItem("token") 
 		} })
        .then(result => result.json())
        .then(data => {
            mainHtml.innerHTML = `<div class="row"> 
            <div id="div${data.id}" class="mb-4 mt-2 col-8">
            <h1>${data.name} <img src="/img/tools.svg" tag="edit" height="20" class="pointer" onclick="editRecipe('${data.name}', '${data.id}')"/></h1> 
            </div>
            <h3 id="totalRecipe" class="col-2 mt-3 offset-2">Total: </h3>
            </div> 
            <div id="listProductRecipe"></div>
            <img id="addNewProductImg" src="/img/+.svg" alt="sum" onCLick="addNewProduct(${id})" height="45" class="pointer col-1">
            `
            fetchRecipeProducts(id)
        })
}

function addNewProduct(rid) {
    fetch(DOMINIO + "/api/products", { 
		method: 'GET',
		headers: {
	'Authorization':'Bearer ' + localStorage.getItem("token") 
 		} })
    .then(result => result.json())
    .then(data => {
        detailProducts = data
    })
    let tbody = document.getElementById("tbody")
    let img = document.getElementById("addNewProductImg")
    tbody.innerHTML += ` <tr>
    <td class="col-1"><input type="number" class="form-control" id="addNewIdPrd" placeholder="Código del producto" onChange="searchPrdByCp()"></td>
    <td class="col-5"><input type="text" class="form-control" list="productDetailList" placeholder="Descripción del Producto" autocomplete="off" id="addNewProduct" onkeyup="listDetailProducts()" onChange="selectIdProduct()"></td>
    <td class="col-1"><input type="number" class="form-control" id="addNewCant" placeholder="Cantidad del Producto"></td>
    <td class="col-1"><button type="button" class="btn btn-success" onclick="insertRecipeProducts(${rid})">Guardar</button></td>
    </tr>
    <datalist id="productDetailList"></datalist>
    `
   img.remove()
}

function listDetailProducts() {
    let productDetailList = document.getElementById("productDetailList")
	productDetailList.innerHTML = ""
    let inputProduct = document.getElementById("addNewProduct")
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

function searchPrdByCp() {
	let intPrdId = document.getElementById("addNewIdPrd")
	let prdId = intPrdId.value.toString()
	let intProduct = document.getElementById("addNewProduct")
	let result = detailProducts.filter(
		(data) => {
			let product = data.id.toString();
			return product === prdId;
		}
	)
	intProduct.value = result[0].description.toLowerCase();
	listDetailProducts()
}

function selectIdProduct() {
    let inpProduct = document.getElementById("addNewProduct").value.toLowerCase()
    let productDetailList = document.getElementById("productDetailList")
    let prodOption = productDetailList.querySelector(`[value="${inpProduct}"]`)
    let prodId = prodOption.getAttribute("data-value")
    let inpIdPrd = document.getElementById("addNewIdPrd")
    inpIdPrd.value = prodId
}

function insertRecipeProducts(rid) {
    let recipeProductData = {
        "recipe": { "id": rid },
        "product": { "id":  document.getElementById("addNewIdPrd").value },
        "productCantidad": document.getElementById("addNewCant").value
    }
    fetch(DOMINIO + "/api/recipeProducts/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
			'Authorization':'Bearer ' + localStorage.getItem("token")
        },
        body: JSON.stringify(recipeProductData)
    })
        .then(response => {
            response.json()
            fetchRecipeByID(rid);
        }
        )
        .then(response => console.log(response))
        .catch(error => error);
}

function editRecipe(name, id){
    let div = document.getElementById("div"+id)
    div.innerHTML = `
    <div class="row">
    <div class="col-5">
    <input type="text" class="form-control" value="${name}" id="editNameRecipe" style="height:80px ; font-size:24pt;"> 
    </div>
    <div class="col-1">
    <img src="/img/trash.svg" tag="edit" height="40" class="pointer mt-4" onclick="confirmDeleteRecipe(${id})" data-bs-toggle="modal" data-bs-target="#mainModal"/>
    </div>
    <div class="col-1">
    <img src="/img/check.svg" tag="edit" height="40" class="pointer mt-4" onclick="modifyRecipe(${id})"/>
    </div>
    <div class="col-1">
    <img src="/img/x.svg" tag="edit" height="40" class="pointer mt-4" onclick="cancelRecipe('${id}', '${name}')"/>
    </div>
    `
}

function cancelRecipe(id, name) {
    let div = document.getElementById("div"+id)
    div.innerHTML = `<h1 class="mb-4 mt-2">${name} <img src="/img/tools.svg" tag="edit" height="20" class="pointer" onclick="editRecipe('${name}', '${id}')"/> </h1>
    `
}

function confirmDeleteRecipe(id) {
	titleModal.innerHTML = "¿Estas Seguro que deseas Borrar esta Receta?"
	modalHtml.innerHTML = `
                 <div class="modal-footer">
					<button type="submit" class="btn btn-primary" id="deleteButton" onclick="deleteRecipe(${id})" data-bs-dismiss="modal" aria-label="Close">Aceptar</button>
                   <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                 </div>
                 `
}

function deleteRecipe(id) {
	fetch(DOMINIO + "/api/recipes/" + id, { 
        method: 'DELETE',
        headers: {
    'Authorization':'Bearer ' + localStorage.getItem("token") 
 }})		
    .then(response => {
			//response.json();
			fetchRecipes();
		})
		.then(response => console.log(response))
		.catch(error => error);
}

function modifyRecipe(id) {
    console.log("Funciona?")
	let recipeData = {
		id: id,
		name: document.querySelector("#editNameRecipe").value
	}
	fetch(DOMINIO + "/api/recipes/", {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization':'Bearer ' + localStorage.getItem("token")
		},
		body: JSON.stringify(recipeData)
	})
		.then(response => {
			response.json();
			fetchRecipeByID(id);
		})
		.then(response => console.log(response))
		.catch(error => error);
}

function fetchRecipeProducts(id) {
    fetch(DOMINIO + "/api/recipeProducts/recipes/" + id, { 
		method: 'GET',
		headers: {
	'Authorization':'Bearer ' + localStorage.getItem("token") 
 		} })
        .then(result => result.json())
        .then(data => {
            jsonRecipeProducts = data
            listRecipe(data)
        })
}

function listRecipe(data) {
    let IRecipeProduct = 0;
    let listProductRecipe = document.getElementById("listProductRecipe")
    let totalPriceRecipe = 0
    listProductRecipe.innerHTML += `
    <table class="table">
             <thead>
               <tr>
               <th scope="col-1">Código P.</th>
                 <th scope="col-5">Descripción del Producto</th>
                 <th scope="col-1">Cantidad</th>
                 <th scope="col-1">Precio Ud.</th>
                 <th scope="col-1">Importe</th>
                 <th scope="col-3"></th>
               
             </thead>
             <tbody id="tbody">
             </tbody>
             </table>`;
    for (let recipe of data) {
        let total = (recipe.productCantidad * recipe.product.price)
        document.getElementById("tbody").innerHTML += `
                     <tr id="p${IRecipeProduct}">
                     <td class="col-1">${recipe.product.id}</td>
                         <td class="col-5">${recipe.product.description}</td>
                         <td class="col-1">${recipe.productCantidad}</td>
                         <td class="col-1">${recipe.product.price} €</td>
                         <td class="col-1">${total.toFixed(2)} €</td>
                         <td class="col-3"><button type="button" class="btn btn-warning" onclick="editRecipeProduct('p${IRecipeProduct}', '${recipe.id}', '${recipe.product.description}', '${recipe.productCantidad}', '${recipe.product.price}', '${total.toFixed(2)}', '${recipe.product.id}', '${recipe.recipe.id}')">Editar</button></td>
                     </tr>
                     `
        IRecipeProduct++;
        totalPriceRecipe = totalPriceRecipe + total
    }
document.getElementById("totalRecipe").innerHTML += `${totalPriceRecipe.toFixed(2)} €`
}

function editRecipeProduct(rpid, id, desc, cant, price, total, pid, rid) {
    document.getElementById(rpid).innerHTML = `
            <td class="col-1">${pid}</td>
            <td class="col-5">${desc}</td>
            <td class="col-1"><input type="text" class="form-control" value="${cant}" id="editCantProduct${rpid}"></td>
            <td class="col-1">${price} €</td>
            <td class="col-1">${total} €</td>     
            <td class="col-3">
                 <button type="button" class="btn btn-danger" onclick="confirmDeleteRecipeProduct('${id}', '${rid}')" data-bs-toggle="modal" data-bs-target="#mainModal">Eliminar</button> 
                 <button type="button" class="btn btn-success" onclick="modifyRecipeProduct('${rpid}', '${id}', '${pid}', '${rid}')">Guardar</button>
                 <button type="button" class="btn btn-secondary" onclick="cancelRecipeProduct('${rpid}', '${id}', '${desc}', '${cant}' ,'${price}', '${total}', '${pid}', '${rid}')">Cancelar</button>
            </td>
         `
}

function cancelRecipeProduct(rpid, id, desc, cant, price, total, pid, rid) {
	document.getElementById(rpid).innerHTML = `
    <td class="col-1">${pid}</td>
    <td class="col-5">${desc}</td>
    <td class="col-1">${cant}</td>
    <td class="col-1">${price} €</td>
    <td class="col-1">${total} €</td>
    <td class="col-3"><button type="button" class="btn btn-warning" onclick="editRecipeProduct('${rpid}', '${id}', '${desc}', '${cant}', '${price}', '${total}', '${pid}', '${rid}')">Editar</button></td>
	 `
}

function confirmDeleteRecipeProduct(id, rid) {
	titleModal.innerHTML = "¿Estas Seguro que deseas Borrar este Producto?"
	modalHtml.innerHTML = `
                 <div class="modal-footer">
					<button type="submit" class="btn btn-primary" id="deleteButton" onclick="deleteRecipeProduct('${id}', '${rid}')" data-bs-dismiss="modal" aria-label="Close">Aceptar</button>
                   <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                 </div>
                 `
}

function deleteRecipeProduct(id, rid) {
	fetch(DOMINIO + "/api/recipeProducts/" + id, { 
        method: 'DELETE',
        headers: {
    'Authorization':'Bearer ' + localStorage.getItem("token") 
 }})		
		.then(response => {
			fetchRecipeByID(rid)
		})
		.then(response => console.log(response))
		.catch(error => error);
}

function modifyRecipeProduct(rpid, id, pid, rid) {
	let recipeProductData = {
		"id": id,
		"recipe": { "id": rid },
		"product": { "id": pid },
		"productCantidad": document.querySelector("#editCantProduct" + rpid).value
	}
	fetch(DOMINIO + "/api/recipeProducts", {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization':'Bearer ' + localStorage.getItem("token")
		},
		body: JSON.stringify(recipeProductData)
	})
		.then(response => {
			response.json();
			fetchRecipeByID(rid)
		})
		.then(response => console.log(response))
		.catch(error => error);
}

function insertRecipe() {
    let name = document.querySelector("#newRecipeName").value
    let recipeData = {
		"name": name
	};
	fetch(DOMINIO + "/api/recipes/", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization':'Bearer ' + localStorage.getItem("token")
		},
		body: JSON.stringify(recipeData)
	})
		.then(response => {
			response.json()
			fetchRecipeName(name)
		}
		)
		.then(response => console.log(response))
		.catch(error => error);
}


function fetchRecipeName(nombre) {
    fetch(DOMINIO + "/api/recipes/name/" + nombre, { 
		method: 'GET',
		headers: {
	'Authorization':'Bearer ' + localStorage.getItem("token") 
 		} })
    .then(result => result.json())
    .then(data => {
        mainHtml.innerHTML = `<div class="row"> 
            <div id="div${data.id}" class="mb-4 mt-2 col-10">
            <h1>${data.name} <img src="/img/tools.svg" tag="edit" height="20" class="pointer" onclick="editRecipe('${data.name}', '${data.id}')"/></h1> 
            </div>
            <h3 id="totalRecipe" class="col-2 mt-3">Total: </h3>
            </div> 
            <div id="listProductRecipe"></div>
            <img id="addNewProductImg" src="/img/+.svg" alt="sum" onCLick="addNewProduct(${data.id})" height="45" class="pointer col-1">
            `
            fetchRecipeProducts(data.id)
        })
}

function searchBar() {
	console.log("Buscando")
	let option = document.getElementById("selectSearch").value
	let wordSearch = document.getElementById("inputSearch").value.toLowerCase();

	if (option == "3") {
		fetch(DOMINIO + "/api/recipes/", { 
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
                jsonRecipes = result
				getRecipes()
			})
	} else if (option == "4") {
        fetch(DOMINIO + "/api/consumitionHistory/", { 
            method: 'GET',
            headers: {
        'Authorization':'Bearer ' + localStorage.getItem("token") 
             } })
        .then(result => result.json())
        .then(dataJson => {
            let result = dataJson.filter(
                (data) => {
                    let date = data.date.toString();
                    let rest = data.restaurant.name.toLowerCase();
                    let recp = data.recipe.name.toLowerCase();
                    let cant = data.cantidad.toString();
                    return /* date.indexOf(wordSearch) > -1 || */ rest.indexOf(wordSearch) > -1 || recp.indexOf(wordSearch) > -1 || cant.indexOf(wordSearch) > -1
                }
            )
            jsonConsumitionHistory = result
            headerConsumitionHistory()
        })
	} 
}