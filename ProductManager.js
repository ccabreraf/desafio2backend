const fs =require("fs")

class ProductManager{
    constructor(path){
        this.path=path,
    this.products=[  
    ]
    }

    getProducts=async()=>{
    const productlist= await fs.promises.readFile(this.path,"utf-8")
    const parselist=JSON.parse(productlist)
    return parselist
    }

    generateId=async()=>{
        const largoid=this.products.length
        if(largoid==0){
            return 1
        }
        else{
            return (this.products[largoid-1].id)+1
        }
    }

    addProduct=async(title,description,price,thumbnail,code,stock)=>{
        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.error("Ingresar todos los datos del producto a agregar (title, description, price, thumbnail, code, stock")
            return 
        }
        else{
            const coderepetido=this.products.find(elemento=>elemento.code===code)
            if(coderepetido){
                console.error("Codigo repetido, favor verificar nuevamente")
                return
            }
            else{
                const id=await this.generateId()
                const productnew={
                    id,title,description,price,thumbnail,code,stock
                }
                this.products.push(productnew)
                await fs.promises.writeFile(this.path,JSON.stringify(this.products,null,2))
            }
        }
    }

    updateProduct=async(id,title,description,price,thumbnail,code,stock)=>{
        if(!id|| !title || !description || !price || !thumbnail|| !code||!stock){
            console.error("Ingresar todos los datos del producto a modificar (title, description, price, thumbnail, code, stock")
            return 
        }
        else{
            const mostrarproducts=await this.getProducts()
            const coderepetido=mostrarproducts.find(elemento=>elemento.code===code)
            if(coderepetido){
                console.error("Codigo repetido del producto a actualizar, favor verificar nuevamente")
                return
            }
            else{
                const currentProductsList=await this.getProducts()
                const newProductsList=currentProductsList.map(elemento=>{
                    if(elemento.id===id){
                    const updatedProduct={
                        ...elemento,
                        title,description,price,thumbnail,code,stock
                    }
                    return updatedProduct
                    }
                    else{
                        return elemento
                    }
                })
                await fs.promises.writeFile(this.path,JSON.stringify(newProductsList,null,2))
            }
        }
    }

    deleteProduct=async(id)=>{
        const mostrarproducts=await this.getProducts()
        const notfound=mostrarproducts.filter(elemento=>elemento.id!==id)
        await fs.promises.writeFile(this.path,JSON.stringify(notfound,null,2))
    }

    getProductbyId=async(id)=>{
        const mostrarproducts=await this.getProducts()
        const found=mostrarproducts.find(element=>element.id===id)
        return found
    }

}

async function generator(){
    
const pm=new ProductManager("./files/products.json");
// await pm.addProduct("botella","description botella",1000,"direccionimagen1","AA001",100)
// await pm.addProduct("vaso","description vaso",2500,"direccionimagen2","AA002",200)
// await pm.addProduct("tupperware","description tupperware",3000,"direccionimagen3","AA003",300)
await pm.updateProduct(3,"nuevotupperware","nuevadescription tupperware",3000,"direccionimagen","AA007",3000)
// await pm.deleteProduct(1)
// const productbyid=await pm.getProductbyId(1)
const productos=await pm.getProducts()
//  const listado=await pm.getProducts()
// console.log(productbyid)
console.log(productos);
}

generator()