window.addEventListener("load", function(){
    let pagina = window.location.pathname.split("/");
    if (!localStorage.getItem('carrito')) {
        localStorage.setItem('carrito', JSON.stringify([]));
    }
    
    if(pagina[pagina.length -1] == "products.html"){
        mostrarArticulos();
    }
    else if(pagina[pagina.length -1] == "carrito.html"){
        mostrarArticulosCarrito();
    }
    else{
        mostrarArticuloDescrption();
    }
})

let arrayArticulos = [
    {
        "id": 1,
        "nombre": "Producto 1",
        "categoria": "Ropa",
        "imagen": "../assets/img/productoExample.jpg",
        "descripcion": "Esta es la descripcion del artilo numero 1",
        "altImg": "Imagen descripcion de producto 1",
        "costo": 500
    },
    {
        "id": 2,
        "nombre": "Producto 2",
        "categoria": "Ropa",
        "imagen": "../assets/img/productoExample.jpg",
        "descripcion": "Esta es la descripcion del artilo numero 2",
        "altImg": "Imagen descripcion de producto 2",
        "costo": 100
    },
    {
        "id": 4,
        "nombre": "Producto 4",
        "categoria": "Ropa",
        "imagen": "../assets/img/productoExample.jpg",
        "descripcion": "Esta es la descripcion del artilo numero 4",
        "altImg": "Imagen descripcion de producto 4",
        "costo": 300
    }
]


function carritoLocalStorage(){
    let data = localStorage.getItem('carrito');
    if(!data)
        return [];
    else
        return  JSON.parse(data);
}

function guardarCarritoLocalStorage(carrito){
    localStorage.setItem('carrito', JSON.stringify(carrito));
    console.log("Se actualizo el carrito");
}

function mostrarArticulos(){
    console.log("Entra");
    let html = "";
    arrayArticulos.forEach((data) =>{
        html += `
            <div class="d-flex justify-content-center mb-5 m-sm-5">
                <div class="card" style="width: 18rem;">
                    <a class="link-card" href="./productDescription.html?id=${data.id}">
                        <img class="card-img-top" src="${data.imagen}" alt="${data.altImg}">
                        <div class="card-body">
                            <p class="card-title">${data.nombre}</p>
                            <p>$${data.costo}</p>
                        </div>
                    </a>
                </div>
            </div>
        `
    })
    document.getElementById("listaArticulos").innerHTML = html;
}

function mostrarArticuloDescrption(){

    let id = new URLSearchParams(window.location.search);
    let html = "";
    for(let data of arrayArticulos){
        if(data.id == id.get("id")){
            html = `
                <div class="d-flex justify-content-center">
                    <div class="card" style="width: 70%">
                        <img class="card-img-top" src="${data.imagen}" alt="${data.altImg}" height="80%" width="auto">
                        <div class="card-body">
                            <p class="card-title h2">${data.nombre}</p>
                            <p class="h3">$${data.costo}</p>
                            <p class="h5">Categoria: ${data.categoria}</p>
                            <p>${data.descripcion}</p>
                            <button href="#" class="btn btn-primary w-100" data-toggle="modal" data-target="#agregarProductoModal" onClick="agregarArticuloCarrito(${data.id})">Agregar</button>
                        </div>
                    </div>
                </div>
            `;
            break;
        }
    };
    document.getElementById("articuloDescription").innerHTML += html;
}

function mostrarArticulosCarrito(){
    let html = ""
    let costo = 0;
    let carrito = carritoLocalStorage();
    if(carrito != null){
        carrito.forEach((data) =>{
            costo += data.costo * data.cantidad;
            html += `
                <div id="${data.id}" class="media mb-5">
                    <img class="mr-3 d-flex size-image-carrito" src="${data.imagen}" alt="${data.altImg}" width="10%">
                    <div class="media-body d-flex justify-content-between">
                        <div>
                            <p class="m-0 font-size-movil font-weight-bold h5">${data.nombre}</p>
                            <p class="m-1">Categoria: ${data.categoria}</p>
                            <div class="firstColor d-flex justify-content-around align-items-center p-1">
                                <button class="rounded-circle size-buttons-carrito" onClick="restarArticulo(${data.id})">-</button>
                                <span class="valor">${data.cantidad}</span>
                                <button class="rounded-circle size-buttons-carrito" onClick="sumarArticulo(${data.id})">+</button>
                            </div>
                        </div>
                        <div class="d-flex flex-column">
                            <button type="button" class="d-flex justify-content-end btn btn-link justify-content-end" onClick="eliminarArticulo(${data.id})"><img class="size-icon-carrito-close" src="../assets/img/x.png"></button>
                            <p class="font-size-movil d-flex justify-content-end h5">Total producto</p>
                            <p class="font-size-movil d-flex justify-content-end h5">$${data.cantidad * data.costo}</p>              
                        </div>
                    </div>  
                </div>  
            `
        });
    }
    
    if(html == "")
        document.getElementById("listaArticulosCarrito").innerHTML = "<div>El carrito esta vacio.</div>";
    else
        document.getElementById("listaArticulosCarrito").innerHTML = html;
    document.getElementById("valorSubtotalProductos").innerHTML = "$" + costo;
    document.getElementById("valorTotalProductos").innerHTML = "$" + (costo + (costo * 0.16));
};

function sumarArticulo(id){
    let carrito = carritoLocalStorage();
    carrito.some((data) =>{
        if(data.id == id){
            data.cantidad++;
            return true
        }
        return false;
    });
    guardarCarritoLocalStorage(carrito);
    mostrarArticulosCarrito();
}

function restarArticulo(id){
    let carrito = carritoLocalStorage();
    carrito.some((data) =>{
        if(data.id == id){
            if(data.cantidad === 1)
                carrito = carrito.filter(data => data.id !== id);
            else
                data.cantidad--;
        }
    });
    guardarCarritoLocalStorage(carrito);
    mostrarArticulosCarrito();
}

function eliminarArticulo(id){
    console.log("Entra" + id);
    let carrito = carritoLocalStorage();
    carrito = carrito.filter(data => data.id !== id);
    guardarCarritoLocalStorage(carrito);
    mostrarArticulosCarrito();
}

function agregarArticuloCarrito(id){
    let carrito = carritoLocalStorage();
    let existe = carrito.find(item => item.id === id);

    if(existe){
        existe.cantidad++;
    }
    else{
        let existeArticulo = arrayArticulos.find( data => data.id === id);
        if(existeArticulo){
            carrito.push({
                "id": existeArticulo.id,
                "nombre": `${existeArticulo.nombre}`,
                "categoria": `${existeArticulo.categoria}`,
                "imagen": `${existeArticulo.imagen}`,
                "altImg": `${existeArticulo.altImg}`,
                "costo": existeArticulo.costo,
                "cantidad": 1, 
            })
        }
    }
    guardarCarritoLocalStorage(carrito);
}



