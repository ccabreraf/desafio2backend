class ProductManager{
    constructor(){
        this.products=[]
    }
    addProduct(title, description, price, thumbnail, code, stock){
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

        const validarCode = this.products.find(products.code===code);
        if (validarCode){
            console.log("ya existe un producto con este code");
            return
        }

        if (!title || !description || !price || !thumbnail || !code || !stock)
            console.log("Favor completar todos los campos")

        this.products.push(nuevoProducto)
    }
}