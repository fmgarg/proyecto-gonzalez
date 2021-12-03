
const URL = 'https://fakestoreapi.com/products'

fetch (URL) 

    .then (response => response.json ())

    .then ( data => {

                    for (const article of data) {

                            $('#contenedor-lista-productos').append(
                                `
                                    <div class="card">
                                        <img class="card-img-top" src="${article.image}" alt="se esperaba una imagen" />
                                        <div class="card-body p-4">
                                                <div class="text-center">
                                                    <h3 class="fw-bolder"> ${article.title}</h3>
                                                    <div class="star d-flex justify-content-center small text-warning mb-2">
                                                        <div class="bi-star-fill"></div>
                                                        <div class="text-center"> <h5> Valoracion ${article.rating.rate} </h5></div>
                                                        <div class="bi-star-fill"></div>
                                                    </div>
                                                        <h4>PRECIO: $ ${article.price}.-</h4>
                                                        <h5>(Stock disponible ${article.rating.count} unidades)</h5>
                                                </div>
                                                <div class="card-text description">
                                                    <p class="text-justify">${article.description}</p>
                                                </div>
                                        </div>
                                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                            <input id="select-count-${article.id}" type="number" min="1" value="1" max="${article.rating.count}" />
                                            <div class="text-center">
                                                    
                                                    <button id="btn-add-${article.id}" class="btn btn-outline-dark mt-auto btnAddCart">   
                                                        agregar
                                                    </button>
                                            </div>
                                        </div>
                                    </div>
                                `
                            )

                            let count = 1
                                
                                $(`#select-count-${article.id}`).change(( event ) => {
                                    count = +event.target.value
                                })

                                console.log(count)
                                
                                $(`#btn-add-${article.id}`).on('click', () => {
                                    const id = article.id
                                    const title = article.title
                                    const price = article.price
                                    const stock = article.rating.count
                                    const cantidad = count
                                    const itemCarrito = new ItemCarrito(id, title, price, stock, cantidad)
                                    
                                    
                                    addItemCarrito( itemCarrito )
                                })
                        
                    }

                    
                    class ItemCarrito {
                        constructor (id, title, price, stock, cantidad, article) {
                            this.id = id
                            this.title = title
                            this.price = price
                            this.stock = stock
                            this.cantidad = cantidad
                            this.article = article
                        }
                    }
                    
                    //lista del carrito
                    let carrito = JSON.parse(localStorage.getItem('carrito')) || []


                    //metodo para agregar los itemCarrito al carrito
                    const addItemCarrito = (article) => {
                        const itemCarrito = carrito.find( itemCarrito => itemCarrito.id === article.id)
                        
                          
                        if (itemCarrito) {
                            console.log(carrito)
                            itemCarrito['cantidad'] = article.cantidad
                            itemCarrito['price'] = article.price
                            console.log('el producto ya existe en su carrito')
                    
                        } else {
                            
                            carrito.push(article)
                            console.log(carrito)
                        }
                       
                                
                        localStorage.setItem('carrito', JSON.stringify(carrito))  
                        
                        renderCarrito ()
                    }
                    
                    //metodo para hallar un itemCarrito por id
                    const findOne = (id) => {

                        const itemCarrito = carrito.find( itemCarrito => itemCarrito.id === id)
                    
                        if (!itemCarrito) {
                            throw new Error(`No existe el itemCarrito de id #${id}`)
                        }
                    
                        return itemCarrito
                    
                    }

                    //Metodo para eliminar un itemCarrito

                    const remove = (id) => {

                        const itemCarrito = findOne(id)
                        const index = carrito.indexOf(itemCarrito)
                        carrito.splice( index, 1)
                        localStorage.empty
                        localStorage.setItem('carrito', JSON.stringify(carrito))
                    
                    }
                    

                    //Metodo para agregar 
                    const renderCarrito = () => {
                        $('#contenedor-carrito').empty()
                        for (let itemCarrito of carrito) {
                            $('#contenedor-carrito').append (
                            `
                            <tr>
                                <th scope="row" class="table__ID">${itemCarrito.id}</th>
                                <td id="table-producto"> ${itemCarrito.title}</td>
                                    <img src="" alt="">
                                    <td id="table-stock"> ${itemCarrito.stock}</td>
                                <td id="table-cantidad-" class="shoppingCartPlantQuantity">${itemCarrito.cantidad}</td>
                                <td id="table-precio-" class="shoppingCartPlantPrice">${itemCarrito.price}</td>
                                <td id="table-subtotal-${itemCarrito.id}"></td>
                                <td><button id="btnDel${itemCarrito.id}" class="btn btnDel btn-outline-dark btn-danger">X</button></td>
                            </tr>
                            `
                            )
                            
                            //Metodo para obtener elementos del DOM
                            let btnDel = document.getElementsByClassName ("btnDel");
                            
                            $(`#btnDel${itemCarrito.id}`).on('click', () => {
                                console.log (itemCarrito.id)
                                remove(itemCarrito.id)
                                renderCarrito ()
                                console.log('producto eliminado')
                                //cartTotalPrice()
                            })
    
                        }

                        
                    }
                    
                    renderCarrito ()

                    //metodo que suma id= y devuelve otro array con id y total de cada id del array carrito
                    let subtotal = {};
	                for (let cuenta of carrito){
            		    if(!subtotal['id_'+cuenta.id]){
			                subtotal['id_'+cuenta.id] = 0;
		                }
		                subtotal['id_'+cuenta.id] += (cuenta.price *= cuenta.cantidad);
	                }
	                console.log(subtotal);
                    console.log (carrito)
                    

                    /*
                    //metodo que suma todos los price de un array y devuelve un array con un objeto con el total
                    let total = {};
	                for (let cuenta of subtotal){
            		    if(!total['totalCart']){
			                total['totalCart'] = 0;
		                }
		                total['totalCart'] += cuenta.price;
	                }
	                console.log(total);
                    alert(total)
                    */


                   /*//suma por id de productos ok
                    let suma = {};
	                for (let cuenta of carrito){
            		    if(!suma['producId_'+cuenta.id*cuenta.count]){
			                suma['producId_'+cuenta.id] = 0;
		                }
		                suma['producId_'+cuenta.id] += cuenta.price;
	                }
	                console.log(suma);
                    */

                    /*
                    function total (){
                        carrito.array.forEach(element => {
                            let subtotal = carrito.reduce((sum, value) => (typeof value.price == "number" ? sum + value.price : sum), 0);
                        });
                    }
                    
                    console.log(parseInt(total))
                    */


                    // Precio total del carrito
                    /*
                    function cartTotalPrice() {
                    let totalCount = 0;
                    const totalPrice = document.querySelector( '.total-price' );
                    const shoppingCartPlants = document.querySelectorAll( '.shoppingCartPlant' );
                    
                    shoppingCartPlants.forEach( ( shoppingCartPlant ) => {

                        let plantCartQuantityElement = 1
                        $(`#table-cantidad-`).change(( event ) => {
                            n1 = +event.target.value
                        })

                        const plantCartPriceElement = document.getElementById("table-precio-");
                        const plantCartPrice = Number( plantCartPriceElement.value);

                        const plantCartQuantity = Number( plantCartQuantityElement.value );

                        totalCount += plantCartPrice * plantCartQuantity;
                    });

                    totalPrice.innerHTML = `$${totalCount}`;
                    };

                    console.log(cartTotalPrice)
                    */

                    //const plantCartPriceElement = document.getElementById("table-cantidad-");
                    //const plantCartPrice = parseInt(plantCartPriceElement);
                    //console.log(plantCartPrice)
                    
                    //Metodo para obtener el subtotal
                    /*
                    let n1 = 1

                    $(`#table-cantidad-${itemCarrito.id}`).change(( event ) => {
                        n1 = +event.target.value
                    })

                    let n2 = document.getElementById("table-precio-${itemCarrito.id}");
                    let rtdo = n1*n2;
                    alert(rtdo);
                    */                    
    
    })