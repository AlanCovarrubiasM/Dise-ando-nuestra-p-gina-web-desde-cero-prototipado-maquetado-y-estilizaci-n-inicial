window.addEventListener("load", function(){
    let pagina = window.location.pathname.split("/");
    if (!localStorage.getItem('carrito')) {
        localStorage.setItem('carrito', JSON.stringify([]));
    }
    
    if(pagina[pagina.length -1] == "products.html"){
        mostrarArticulos();
        let buscarProductos = this.document.getElementById("buscarProductos");
    }
    else if(pagina[pagina.length -1] == "carrito.html"){
        mostrarArticulosCarrito();
        const buttonCotizacion = this.document.getElementById("buttonCotizacion"); 
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
        "marca": "Adidas",
        "imagen": "../assets/img/productoExample.jpg",
        "descripcion": "Esta es la descripcion del artilo numero 1",
        "altImg": "Imagen descripcion de producto 1",
        "costo": 500
    },
    {
        "id": 2,
        "nombre": "Producto 2",
        "categoria": "Ropa",
        "marca": "Nike",
        "imagen": "../assets/img/productoExample.jpg",
        "descripcion": "Esta es la descripcion del artilo numero 2",
        "altImg": "Imagen descripcion de producto 2",
        "costo": 100
    },
    {
        "id": 4,
        "nombre": "Producto 4",
        "categoria": "Ropa",
        "marca": "Adidas",
        "imagen": "../assets/img/productoExample.jpg",
        "descripcion": "Esta es la descripcion del artilo numero 4",
        "altImg": "Imagen descripcion de producto 4",
        "costo": 300
    }
]


function carritoLocalStorage(){
    try {
        let data = localStorage.getItem('carrito');
        if(!data)
            return [];
        else
            return  JSON.parse(data);   
    } catch (error) {
        Toastify({
            text: "Error: " + error,
            duration: 2000,
            gravity: "top", // Aparece en la parte superior
            position: "right", // Centra la notificación horizontalmente
            style: {
                background: "linear-gradient(to right, orange, red)",
            }
        }).showToast();    
    }
}

function guardarCarritoLocalStorage(carrito){
    try {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    } catch (error) {
        Toastify({
            text: "Error: " + error,
            duration: 2000,
            gravity: "top", // Aparece en la parte superior
            position: "right", // Centra la notificación horizontalmente
            style: {
                background: "linear-gradient(to right, orange, red)",
            }
        }).showToast();  
    }
}

function mostrarArticulos(){
    try {
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
    } catch (error) {
        Toastify({
            text: "Error: " + error,
            duration: 2000,
            gravity: "top", // Aparece en la parte superior
            position: "right", // Centra la notificación horizontalmente
            style: {
                background: "linear-gradient(to right, orange, red)",
            }
        }).showToast();
    }
}

function mostrarArticuloDescrption(){
    try {
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
                                <button href="#" class="btn btn-primary w-100" onClick="agregarArticuloCarrito(${data.id})">Agregar</button>
                            </div>
                        </div>
                    </div>
                `;
                break;
            }
        };
        document.getElementById("articuloDescription").innerHTML += html;
    } catch (error) {
        Toastify({
            text: "Error: " + error,
            duration: 2000,
            gravity: "top", // Aparece en la parte superior
            position: "right", // Centra la notificación horizontalmente
            style: {
                background: "linear-gradient(to right, orange, red)",
            }
        }).showToast();
    }
}

function mostrarArticulosCarrito(){
    try {
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
    } catch (error) {
        console.error(error);Toastify({
            text: "Error: " + error,
            duration: 2000,
            gravity: "top", // Aparece en la parte superior
            position: "right", // Centra la notificación horizontalmente
            style: {
                background: "linear-gradient(to right, orange, red)",
            }
        }).showToast();
    }
};

function sumarArticulo(id){
    try {
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
    } catch (error) {
        Toastify({
            text: "Error: " + error,
            duration: 2000,
            gravity: "top", // Aparece en la parte superior
            position: "right", // Centra la notificación horizontalmente
            style: {
                background: "linear-gradient(to right, orange, red)",
            }
        }).showToast();
    }
}

function restarArticulo(id){
    try {
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
    } catch (error) {
        console.error(error);Toastify({
            text: "Error: " + error,
            duration: 2000,
            gravity: "top", // Aparece en la parte superior
            position: "right", // Centra la notificación horizontalmente
            style: {
                background: "linear-gradient(to right, orange, red)",
            }
        }).showToast();
    }
}

function eliminarArticulo(id){
    try {
        let carrito = carritoLocalStorage();
        carrito = carrito.filter(data => data.id !== id);
        guardarCarritoLocalStorage(carrito);
        Toastify({
            text: "Se elimino el arcticulo del carrito",
            duration: 2000,
            gravity: "top", // Aparece en la parte superior
            position: "right", // Centra la notificación horizontalmente
            style: {
                background: "linear-gradient(to right, orange, red)",
            }
        }).showToast();
        mostrarArticulosCarrito(); 

    } catch (error) {
        Toastify({
            text: "Error: " + error,
            duration: 2000,
            gravity: "top", // Aparece en la parte superior
            position: "right", // Centra la notificación horizontalmente
            style: {
                background: "linear-gradient(to right, orange, red)",
            }
        }).showToast();
    }
}

function agregarArticuloCarrito(id){
    try {
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
        Toastify({
            text: "Se agrego el producto correctamente",
            duration: 2000,
            gravity: "top", // Aparece en la parte superior
            position: "right", // Centra la notificación horizontalmente
        }).showToast();
    } catch (error) {
        Toastify({
            text: "Error: " + error,
            duration: 2000,
            gravity: "top", // Aparece en la parte superior
            position: "right", // Centra la notificación horizontalmente
            style: {
                background: "linear-gradient(to right, orange, red)",
            }
        }).showToast();
    }
}

buttonCotizacion.addEventListener("click",() =>{
    if(carritoLocalStorage() == ""){
       Toastify({
            text: "Nada para descargar ",
            duration: 2000,
            gravity: "top", // Aparece en la parte superior
            position: "right", // Centra la notificación horizontalmente
            style: {
                background: "linear-gradient(to right, orange, yellow)",
            }
        }).showToast(); 
    }
    else
        generarCotizacion();
});

function generarCotizacion(){
    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        let fecha = new Date();

        pdf.setFont("helvetica");

        // ===== TÍTULO =====
        pdf.setFontSize(20);
        pdf.setFont("helvetica", "bold");
        pdf.text("Cotización", 20, 20);

        pdf.setFontSize(12);
        pdf.setFont("helvetica", "normal");
        pdf.text(fecha.toLocaleDateString("es-ES"), 20, 35);

        pdf.line(20, 40, 190, 40); // Línea separadora

        // ===== ENCABEZADOS =====
        pdf.setFont("helvetica", "bold");
        pdf.text("Producto", 20, 55);
        pdf.text("Categoría", 80, 55);
        pdf.text("Cant.", 130, 55);
        pdf.text("Precio", 150, 55);
        pdf.text("Total", 175, 55);

        pdf.line(20, 60, 190, 60);

        // ===== DATOS DINÁMICOS =====
        const productos = carritoLocalStorage();

        let y = 75;
        let subtotal = 0;

        pdf.setFont("helvetica", "normal");

        productos.forEach(item => {
            const total = item.cantidad * item.costo;
            subtotal += total;

            pdf.text(item.nombre, 20, y);
            pdf.text(item.categoria, 80, y);
            pdf.text(String(item.cantidad), 132, y);
            pdf.text("$" + item.costo, 150, y);
            pdf.text("$" + total, 175, y);

            y += 12; // Espaciado entre filas
        });

        pdf.line(20, y, 190, y); // Línea final de tabla

        // ===== TOTALES =====
        const impuesto = subtotal * 0.16;
        const totalFinal = subtotal + impuesto;

        pdf.setFont("helvetica", "bold");
        pdf.text("Subtotal:", 130, y + 20);
        pdf.text("$" + subtotal.toFixed(2), 175, y + 20);

        pdf.text("Impuesto (16%):", 130, y + 35);
        pdf.text("$" + impuesto.toFixed(2), 175, y + 35);

        pdf.setFontSize(14);
        pdf.text("TOTAL:", 130, y + 55);
        pdf.text("$" + totalFinal.toFixed(2), 175, y + 55);

        // ===== PIE DE PÁGINA =====
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "italic");
        pdf.text("Gracias por su preferencia.", 20, 280);

        // Descargar
        pdf.save("cotizacion.pdf");
        
        Toastify({
            text: "Descarga realizada",
            duration: 2000,
            gravity: "top", // Aparece en la parte superior
            position: "right", // Centra la notificación horizontalmente
        }).showToast();

    } catch (error) {
        Toastify({
            text: "Error: " + error,
            duration: 2000,
            gravity: "top", // Aparece en la parte superior
            position: "right", // Centra la notificación horizontalmente
            style: {
                background: "linear-gradient(to right, orange, red)",
            }
        }).showToast();
    }
}


