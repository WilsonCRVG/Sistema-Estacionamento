document.getElementById('formulario').addEventListener('submit' , cadastrarVeiculo)

function cadastrarVeiculo(e){
    var modeloCarro = document.getElementById('modeloCarro').value
    var motorista = document.getElementById('motorista').value
    var placaCarro = document.getElementById('placaCarro').value
    var time = new Date();

   

    carro={
        motorista : motorista,
        modelo : modeloCarro,
        placa: placaCarro,
        hora: time.getHours(),
        minutos: time.getMinutes()
    }

    //Campos de Validação
    if(!modeloCarro && !placaCarro && !motorista){
        alert("Preencha os Campos ! ")
        return false
    }

    
    if (!motorista){
        alert("Preencha o Campo MOTORISTA! ");
        return false;
    }

     if (!modeloCarro){
        alert("Preencha o Campo CARRO! ");
        return false;
    }

    if(!placaCarro){
        alert("Preencha o Campo PLACA !")
        return false;
    }
    

    //!placaCarro

   // localStorage.setItem('teste','Ola Mundo')
   // console.log(localStorage.getItem('teste'))

    if(localStorage.getItem('patio2')===null){
        var carros =[]
        carros.push(carro)
        localStorage.setItem('patio2',JSON.stringify(carros))
    }else{
        var carros = JSON.parse(localStorage.getItem('patio2'))
        carros.push(carro)
        localStorage.setItem('patio2',JSON.stringify(carros))
    }
    
    document.getElementById('formulario').reset()
    mostrarPatio()

    e.preventDefault()
}

function apagarVeiculo(placa){
    var carros = JSON.parse(localStorage.getItem('patio2'));

    for(i=0;i < carros.length;i++){
        if(carros[i].placa== placa){
            carros.splice(i,1);
        }
        localStorage.setItem('patio2',JSON.stringify(carros))
    }

    mostrarPatio()

}

function mostrarPatio(){
   var carros= JSON.parse(localStorage.getItem('patio2'))
   var carrosResultado = document.getElementById('resultados')

   carrosResultado.innerHTML = '';

   for(var i=0 ;i< carros.length;i++){
       var motorista = carros[i].motorista;
       var modelo = carros[i].modelo;
       var placa = carros[i].placa;
       var hora = carros[i].hora;
       var minutos = carros[i].minutos;

       carrosResultado.innerHTML += '<tr><td>'+motorista+   
                                    '</td><td>' +modelo+
                              '</td><td>' +placa+
                              '</td><td>' +hora+' : '+minutos+
                              '</td><td>' + '<button class="btn btn-danger" onclick="apagarVeiculo(\''+ placa +'\')">Excluir</button></td>'
                              '</tr>';
     }
}