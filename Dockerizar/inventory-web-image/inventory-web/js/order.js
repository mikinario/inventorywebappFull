let orderPrdId = "/img/arrow-down.svg"
let orderPrdDesc = "/img/arrow-down.svg"
let orderPrdPrc = "/img/arrow-down.svg"
let orderPrdSupp = "/img/arrow-down.svg"
let targetPrdId = "up"
let targetPrdDesc = "up"
let targetPrdPrc = "up"
let targetPrdSupp = "up"

let orderInvRest = "/img/arrow-down.svg"
let orderInvProd = "/img/arrow-down.svg"
let orderInvCant = "/img/arrow-down.svg"
let orderInvPrc = "/img/arrow-down.svg"
let orderInvIdPrd = "/img/arrow-down.svg"
let targetInvRest = "up"
let targetInvProd = "up"
let targetInvIdPrd = "up"
let targetInvCant = "up"
let targetInvPrc = "up"

let orderChDate = "/img/arrow-down.svg"
let orderChRest = "/img/arrow-down.svg"
let orderChRecp = "/img/arrow-down.svg"
let orderChCant = "/img/arrow-down.svg"
let targetChDate = "up"
let targetChRest = "up"
let targetChRecp = "up"
let targetChCant = "up"

function orderProductList(target) {
	if (target === "id") {
		let tbPrdId = document.getElementById("tbPrdId")
		let idTarget = tbPrdId.getAttribute("data-target")
		if (idTarget === "up") {
			jsonProducts.sort((a, b) => {
				return a.id - b.id
			})
			orderPrdId = "/img/arrow-down.svg"
			targetPrdId = "down"
		} else {
			jsonProducts.sort((a, b) => {
				return b.id - a.id
			})
			orderPrdId = "/img/arrow-up.svg"
			targetPrdId = "up"
		}
	} else if (target === "desc") {
		let tbPrdDesc = document.getElementById("tbPrdDesc")
		let descTarget = tbPrdDesc.getAttribute("data-target")
		if (descTarget === "up") {
			jsonProducts.sort((a, b) => {
				return (a.description > b.description) ? 1 : ((a.description < b.description) ? -1 : 0)
			})
			orderPrdDesc = "/img/arrow-down.svg"
			targetPrdDesc = "down"
		} else {
			jsonProducts.sort((a, b) => {
				return (b.description > a.description) ? 1 : ((b.description < a.description) ? -1 : 0)
			})
			orderPrdDesc = "/img/arrow-up.svg"
			targetPrdDesc = "up"
		}
	} else if (target === "prc") {
		let tbPrdPrc = document.getElementById("tbPrdPrc")
		let prcTarget = tbPrdPrc.getAttribute("data-target")
		if (prcTarget === "up") {
			jsonProducts.sort((a, b) => {
				return a.price - b.price
			})
			orderPrdPrc = "/img/arrow-down.svg"
			targetPrdPrc = "down"
		} else {
			jsonProducts.sort((a, b) => {
				return b.price - a.price
			})
			orderPrdPrc = "/img/arrow-up.svg"
			targetPrdPrc = "up"
		}
	} else if (target === "supp") {
		let tbPrdSupp = document.getElementById("tbPrdSupp")
		let suppTarget = tbPrdSupp.getAttribute("data-target")
		if (suppTarget === "up") {
			jsonProducts.sort((a, b) => {
				return (a.supplier.name > b.supplier.name) ? 1 : ((a.supplier.name < b.supplier.name) ? -1 : 0)
			})
			orderPrdSupp = "/img/arrow-down.svg"
			targetPrdSupp = "down"
		} else {
			jsonProducts.sort((a, b) => {
				return (b.supplier.name > a.supplier.name) ? 1 : ((b.supplier.name < a.supplier.name) ? -1 : 0)
			})
			orderPrdSupp = "/img/arrow-up.svg"
			targetPrdSupp = "up"
		}
	}
	getProducts(jsonProducts)
}

function orderInventoryList(target) {
	if (target === "rest") {
		let tbInvRest = document.getElementById("tbInvRest")
		let restTarget = tbInvRest.getAttribute("data-target")
		if (restTarget === "up") {
			jsonInventory.sort((a, b) => {
				return (a.restaurant.name > b.restaurant.name) ? 1 : ((a.restaurant.name < b.restaurant.name) ? -1 : 0)
			})
			orderInvRest = "/img/arrow-down.svg"
			targetInvRest = "down"
		} else {
			jsonInventory.sort((a, b) => {
				return (b.restaurant.name > a.restaurant.name) ? 1 : ((b.restaurant.name < a.restaurant.name) ? -1 : 0)
			})
			orderInvRest = "/img/arrow-up.svg"
			targetInvRest = "up"
		}
	} else if (target === "idProd") {
		let tbInvIdPrd = document.getElementById("tbInvIdPrd")
		let idPrdTarget = tbInvIdPrd.getAttribute("data-target")
		if (idPrdTarget === "up") {
			jsonInventory.sort((a, b) => {
				return a.product.id - b.product.id
			})
			orderInvIdPrd = "/img/arrow-down.svg"
			targetInvIdPrd = "down"
		} else {
			jsonInventory.sort((a, b) => {
				return b.product.id - a.product.id
			})
			orderInvIdPrd = "/img/arrow-up.svg"
			targetInvIdPrd = "up"
		}
	} else if (target === "prod") {
		let tbInvProd = document.getElementById("tbInvProd")
		let prodTarget = tbInvProd.getAttribute("data-target")
		if (prodTarget === "up") {
			jsonInventory.sort((a, b) => {
				return (a.product.description > b.product.description) ? 1 : ((a.product.description < b.product.description) ? -1 : 0)
			})
			orderInvProd = "/img/arrow-down.svg"
			targetInvProd = "down"
		} else {
			jsonInventory.sort((a, b) => {
				return (b.product.description > a.product.description) ? 1 : ((b.product.description < a.product.description) ? -1 : 0)
			})
			orderInvProd = "/img/arrow-up.svg"
			targetInvProd = "up"
		}
	} else if (target === "cant") {
		let tbInvCant = document.getElementById("tbInvCant")
		let cantTarget = tbInvCant.getAttribute("data-target")
		if (cantTarget === "up") {
			jsonInventory.sort((a, b) => {
				return a.cantidad - b.cantidad
			})
			orderInvCant = "/img/arrow-down.svg"
			targetInvCant = "down"
		} else {
			jsonInventory.sort((a, b) => {
				return b.cantidad - a.cantidad
			})
			orderInvCant = "/img/arrow-up.svg"
			targetInvCant = "up"
		}
	} else if (target === "prc") {
		let tbInvPrc = document.getElementById("tbInvPrc")
		let prcTarget = tbInvPrc.getAttribute("data-target")
		if (prcTarget === "up") {
			jsonInventory.sort((a, b) => {
				return a.product.price - b.product.price
			})
			orderInvPrc = "/img/arrow-down.svg"
			targetInvPrc = "down"
		} else {
			jsonInventory.sort((a, b) => {
				return b.product.price - a.product.price
			})
			orderInvPrc = "/img/arrow-up.svg"
			targetInvPrc = "up"
		}
	}
	getInventory(jsonInventory)
}

function orderConsumitionHistory(target) {
	if (target === "date") {
		let tbChDate = document.getElementById("tbChDate")
		let dateTarget = tbChDate.getAttribute("data-target")
		if (dateTarget === "up") {
			jsonConsumitionHistory.sort((a, b) => {
				return new Date(b.date) - new Date(a.date);
			})
			orderChDate = "/img/arrow-down.svg"
			targetChDate = "down"
		} else {
			jsonConsumitionHistory.sort((a, b) => {
				return  new Date(a.date) - new Date(b.date) 
			})
			orderChDate = "/img/arrow-up.svg"
			targetChDate = "up"
		}
	}
	else if (target === "rest") {
		console.log("hi")
		let tbChRest = document.getElementById("tbChRest")
		let restTarget = tbChRest.getAttribute("data-target")
		if (restTarget === "up") {
			jsonConsumitionHistory.sort((a, b) => {
				return (a.restaurant.name > b.restaurant.name) ? 1 : ((a.restaurant.name < b.restaurant.name) ? -1 : 0)
			})
			orderChRest = "/img/arrow-down.svg"
			targetChRest = "down"
		} else {
			jsonConsumitionHistory.sort((a, b) => {
				return (b.restaurant.name > a.restaurant.name) ? 1 : ((b.restaurant.name < a.restaurant.name) ? -1 : 0)
			})
			orderChRest = "/img/arrow-up.svg"
			targetChRest = "up"
		}
	} else if (target === "recp") {
		let tbChRecp = document.getElementById("tbChRecp")
		let recpTarget = tbChRecp.getAttribute("data-target")
		if (recpTarget === "up") {
			jsonConsumitionHistory.sort((a, b) => {
				return (a.recipe.name > b.recipe.name) ? 1 : ((a.recipe.name < b.recipe.name) ? -1 : 0)
			})
			orderChRecp = "/img/arrow-down.svg"
			targetChRecp = "down"
		} else {
			jsonConsumitionHistory.sort((a, b) => {
				return (b.recipe.name > a.recipe.name) ? 1 : ((b.recipe.name < a.recipe.name) ? -1 : 0)
			})
			orderChRecp = "/img/arrow-up.svg"
			targetChRecp = "up"
		}
	}
	else if (target === "cant") {
		let tbChCant = document.getElementById("tbChCant")
		let cantTarget = tbChCant.getAttribute("data-target")
		if (cantTarget === "up") {
			jsonConsumitionHistory.sort((a, b) => {
				return a.cantidad - b.cantidad
			})
			orderChCant = "/img/arrow-down.svg"
			targetChCant = "down"
		} else {
			jsonConsumitionHistory.sort((a, b) => {
				return b.cantidad - a.cantidad
			})
			orderChCant = "/img/arrow-up.svg"
			targetChCant = "up"
		}
	}
	getConsumitionHistory()
}