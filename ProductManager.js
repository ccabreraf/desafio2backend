class ProductManager{
    constructor(){
        this.products=[]
    }
    addProduct(title, description, price, thumbnail, code, stock){
        const validarCode = this.products.find(products.code===code);
        if (validarCode){
            console.log("ya existe un producto con este code");
            return
        }

        if (!title || !description || !price || !thumbnail || !code || !stock){
            console.log("Favor completar todos los campos")
            return
        }
        let nuevoProducto={
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        }

        if(this.products.length===0){
            nuevoProducto.id=1
        }else{
            nuevoProducto.id=this.products.length+1
        }

        this.products.push(nuevoProducto);
    }
    getProducts(){
        return this.products;
    }
    getProductsById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.log("Product not found");
        }
    }
}

let pm=new ProductManager();

console.log(pm.getProducts());

pm.addProduct('botella', 'botella 500cc', 1000, "../assets/bottle.jpg", 'AA01', 10)

console.log(pm.getProducts());
