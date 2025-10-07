    let nombre = prompt("Como te llamas?");
    alert("Bienvenido " + nombre);
    alert("Hice una calculadora para realizar ejercicios de funciones");
    alert("Hice un array con objetos");
    let array = []

    
    function agregar(valor) {
      document.getElementById('pantalla').value += valor;
    }

    function limpiar() {
      document.getElementById('pantalla').value = '';
    }

    function calcular() {
        let resultado = eval(document.getElementById('pantalla').value);
        document.getElementById('pantalla').value = resultado;
    }

    function agregarArray(){
        console.log("Agregar en array")
        let nombre = document.getElementById("nombre").value;
        let apellido = document.getElementById("apellido").value;
        let edad = document.getElementById("edad").value;
        console.log("Edad "+ edad);

        if(nombre === "" || apellido === "" || edad === ""){
            alert("Faltan datos");
        }
        else if(edad < 18){
            alert("Debes ser mayor de edad");
        }
        else{
            if(confirm("Seguro quieres agregarlo?")){
                array.push({"nombre":nombre, "apellido": apellido, "edad": edad});
                mostrarLista();
                alert("Se agrego nuevo usuario");
            }
            else{
                alert("No se agrego");
            }
        }
    }

    function eliminarArray(id){
        console.log("Entra eliminar");
        array.splice(id,1);
        mostrarLista();
    }

    function mostrarLista(){
        let html = "";
        for(let i = 0 ; i < array.length; i++){
            html += '<tr><th scope="row">'+i+'</th><td>'+array[i].nombre+'</td><td>'+array[i].apellido+'</td><td>'+array[i].edad+'</td><td><button type="button" class="btn btn-danger" onclick="eliminarArray('+ i +')">Eliminar</button></td></tr>'
            console.log(html);
            console.log(array[i]);
        }
        document.getElementById("datosTabla").innerHTML = html;
    }

    function limpiarForm(){
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("edad").value = "";
    }




