var selectedRow = null;
var productos =[];
function productoParaAgregar(e){
    event.preventDefault();
    var formularioDeDatos = leerDatos();
    if(selectedRow === null){
        insertarNuevoRegistro(formularioDeDatos);
    }
    else{
        registroFecha(formularioDeDatos);
    }
    restablecerFormulario();
}

//Recuperar datas
function leerDatos(){
    var formularioDeDatos = {};
    formularioDeDatos["producto"] = document.getElementById("producto").value;
    formularioDeDatos["descripcion"] = document.getElementById("descripcion").value;
    formularioDeDatos["cantidad"] = document.getElementById("cantidad").value;
    formularioDeDatos["precio"] = document.getElementById("precio").value;
    return formularioDeDatos;
}

//Insertar datos
function insertarNuevoRegistro(data){
    var table = document.getElementById("ProductoEnTienda").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.producto;
    var cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.descripcion;
    var cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.cantidad;
    var cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.precio;
    var cell5 = newRow.insertCell(4);
        cell5.innerHTML = `<button onClick='editar(this)'>Editar</button> <button onClick='eliminar(this)'>Eliminar</button>`
        productos.push(data);
        localStorage.setItem('productos', JSON.stringify(productos));
}
//Editar
function editar(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById('producto').value = selectedRow.cells[0].innerHTML;
    document.getElementById('descripcion').value = selectedRow.cells[1].innerHTML;
    document.getElementById('cantidad').value = selectedRow.cells[2].innerHTML;
    document.getElementById('precio').value = selectedRow.cells[3].innerHTML;
}

function registroDatos(formularioDeDatos){
    selectedRow.cells[0].innerHTML = formularioDeDatos.producto;
    selectedRow.cells[1].innerHTML = formularioDeDatos.descripcion;
    selectedRow.cells[2].innerHTML = formularioDeDatos.cantidad;
    selectedRow.cells[3].innerHTML = formularioDeDatos.precio;
    productos.splice(selectedRow.rowIndex-1,1,{producto:formularioDeDatos.producto,descripcion:formularioDeDatos.descripcion,cantidad:formularioDeDatos.cantidad,precio:formularioDeDatos.precio});
    localStorage.setItem('productos', JSON.stringify(productos));
}

//Eliminar
function eliminar(td){
    if(confirm('se eliminara el registro')){
        row = td.parentElement.parentElement;
        document.getElementById('ProductoEnTienda').deleteRow(row.rowIndex);
        productos.splice(row.rowIndex, -1,1);
        localStorage.setItem('productos', JSON.stringify(productos));
    }
    restablecerFormulario();
}

//Restablecer
function restablecerFormulario(){
    document.getElementById('producto').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('precio').value = '';
}

function guardarproductoslocalstorage(){
    if(localStorage.getItem('productos')==null){
        console.log("no hay productos")
    }    
        else{
            productos = JSON.parse(localStorage.getItem(productos));
            for (let index = 0; index < productos.length; index++) {
                let producto = productos[index].producto;
                let descripcion = productos[index].descripcion;
                let cantidad = productos[index].cantidad;
                let precio = productos[index].precio;

                document.getElementById('tbody').innerHTML +=
                
                `<tr>
                    <td>$[producto]</td>
                    <td>$[descripcion]</td>
                    <td>$[cantidad]</td>
                    <td>$[precio]</td>  
                    <td>cell5.innerHTML = onClick='editar(this)'>Editar</button> <button onClick='eliminar(this)'>Eliminar</td>  
                                      
                </tr>
                ` 

            }
        }
        
    }
