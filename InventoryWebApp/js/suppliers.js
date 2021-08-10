let jsonSuppliers = []

function fetchSuppliers() {
	fetch(DOMINIO + "/api/suppliers", { 
		method: 'GET',
		headers: {
	'Authorization':'Bearer ' + localStorage.getItem("token") 
 		} })
		.then(result => result.json())
		.then(data => {
			jsonSuppliers = data
			getSuppliers()
		})
}


function getSuppliers() {
	pageState = 10;
	Isupplier = 0;
	maxList = 50;
	mainHtml.innerHTML = `
	<table class="table">
             <thead>
               <tr>
				 <th scope="col-1">ID</th>
                 <th scope="col-2">Nombre</th>
                 <th scope="col-3">Apellidos</th>
                 <th scope="col-3">Contacto</th>
                 <th scope="col-3 "><img src="img/green_+.svg" alt="sum" height="45" class="pointer offset-md-5 mb-3" type="button" data-bs-toggle="modal" data-bs-target="#mainModal" id="btnAddProduct" onclick="popModalSupplier()"></th>
               </tr>
             </thead>
             <tbody id="tbody">
             </tbody>
             </table>`
		;
	printSuppliers()
}

function printSuppliers() {
	if (jsonSuppliers.length < maxList) {
		maxList = jsonSuppliers.length
	}
	for (Isupplier; Isupplier < maxList; Isupplier++) {
		document.getElementById("tbody").innerHTML += `
             <tr id="s${Isupplier}">
                 <td class="col-1">${jsonSuppliers[Isupplier].id}</td>
                 <td class="col-2">${jsonSuppliers[Isupplier].name}</td>
                 <td class="col-3">${jsonSuppliers[Isupplier].surnames}</td>
				 <td class="col-3">${jsonSuppliers[Isupplier].contact}</td>
                 <td class="col-3"><button type="button" class="btn btn-warning" onclick="editSupplier('s${Isupplier}', '${jsonSuppliers[Isupplier].id}', '${jsonSuppliers[Isupplier].name}', '${jsonSuppliers[Isupplier].surnames}', '${jsonSuppliers[Isupplier].contact}')">Editar</button></td>
             </tr>
             `
	}
}




function editSupplier(sid, id, name, surnames, contact) {
	document.getElementById(sid).innerHTML = `
                 <td class="col-1">${id}</td>
                 <td class="col-2"><input type="text" class="form-control" value="${name}" id="editNameSupplier${sid}"></td>
                 <td class="col-3"><input type="text" class="form-control" value="${surnames}" id="editSurnamesSupplier${sid}"></td>
				 <td class="col-3"><input type="text" class="form-control" value="${contact}" id="editContactSupplier${sid}"></td>
                 <td class="col-3">
                 <button type="button" class="btn btn-danger" onclick="confirmDeleteSupplier(${id})" data-bs-toggle="modal" data-bs-target="#mainModal">Eliminar</button> 
                 <button type="button" class="btn btn-success" onclick="modifySupplier('${id}', '${sid}')">Guardar</button>
                 <button type="button" class="btn btn-secondary" onclick="cancelSupplier('${sid}', '${id}', '${name}', '${surnames}', '${contact}')">Cancelar</button>
                 </td>
         `
}

function cancelSupplier(sid, id, name, surnames, contact) {
	document.getElementById(sid).innerHTML = `
		 <td class="col-1">${id}</td>
         <td class="col-2">${name}</td>
         <td class="col-3">${surnames}</td>
		 <td class="col-3">${contact}</td>
         <td class="col-3"><button type="button" class="btn btn-warning" onclick="editSupplier('${sid}', '${id}' , '${name}' , '${surnames}', '${contact}')">Editar</button></td>
     
	 `
}

function confirmDeleteSupplier(id) {
	titleModal.innerHTML = "¿Estas Seguro que deseas Borrar este Proveedor?"
	modalHtml.innerHTML = `
                 <div class="modal-footer">
					<button type="submit" class="btn btn-primary" id="deleteButton" onclick="deleteSupplier(${id})" data-bs-dismiss="modal" aria-label="Close">Aceptar</button>
                   <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                 </div>
                 `
}

function deleteSupplier(id) {
		fetch(DOMINIO + "/api/suppliers/" + id, { 
			method: 'DELETE',
			headers: {
		'Authorization':'Bearer ' + localStorage.getItem("token") 
	 }
	})
			.then(response => {
				//response.json();
				fetchSuppliers();
			})
			.then(response => console.log(response))
			.catch(error => error);
}

function modifySupplier(supplierID, sid) {
	let supplierData = {
		id: supplierID,
		name: document.querySelector("#editNameSupplier" + sid).value,
		surnames: document.querySelector("#editSurnamesSupplier" + sid).value,
		contact: document.querySelector("#editContactSupplier" + sid).value
	}
	console.log(supplierData)
	fetch(DOMINIO + "/api/suppliers/", {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization':'Bearer ' + localStorage.getItem("token")
		},
		body: JSON.stringify(supplierData)
	})
		.then(response => {
			response.json();
			fetchSuppliers();
		})
		.then(response => console.log(response))
		.catch(error => error);
}

function popModalSupplier() {
    titleModal.innerHTML = "Añade tu Proveedor"
	modalHtml.innerHTML = `
                   <div class="modal-body">

				   <div class="form-floating mb-3">
                     <input type="text" class="form-control" id="newSupplierName" placeholder="Nombre">
                     <label for="floatingInput">Nombre</label>
                   </div>

                   <div class="form-floating mb-3">
                     <input type="text" class="form-control" id="newSupplierSurnames" placeholder="Apellidos">
                     <label for="floatingInput">Apellidos</label>
                   </div>

                   <div class="form-floating">
                     <input type="text" class="form-control" id="newSupplierContact" placeholder="Contacto">
                     <label for="floatingInput">Contacto</label>
                   </div>
                   
                 </div>
                 <div class="modal-footer">
                   <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                   <button type="submit" class="btn btn-primary" id="saveButton" onclick="insertSupplier()" data-bs-dismiss="modal" aria-label="Close">Guardar</button>
                 </div>
                 `
}

function insertSupplier() {
	let supplierData = {
		"name": document.querySelector("#newSupplierName").value,
		"surnames": document.querySelector("#newSupplierSurnames").value,
		"contact": document.querySelector("#newSupplierContact").value
	};
	fetch(DOMINIO + "/api/suppliers/", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization':'Bearer ' + localStorage.getItem("token")
		},
		body: JSON.stringify(supplierData)
	})
		.then(response => {
			response.json()
			fetchSuppliers();
		}
		)
		.then(response => console.log(response))
		.catch(error => error);
}