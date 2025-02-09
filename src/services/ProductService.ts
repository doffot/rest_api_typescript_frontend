import { number, parse, pipe, safeParse, string, transform} from "valibot";
import { DraftProductShema,  ProductsSchema, Product, ProductSchema } from "../types";
import axios from "axios";
import { toBoolean } from "../utils";

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data : ProductData) {
   try {
     const result = safeParse(DraftProductShema, {
        name: data.name,
        price: +data.price
     })
     if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url,{
                name: result.output.name,
                price: result.output.price
            })
     } else {
        throw new Error('Datos no validos')
     }
   } catch (error) {
        console.log(error);
   }
}

export async function getProducs() {
   try {
      const url = `${import.meta.env.VITE_API_URL}/api/products`
      const { data } = await axios(url)
      const result = safeParse(ProductsSchema, data.data)
      if(result.success) {
         return result.output
      } else{
         throw new Error('hubo un error...')
      }
   } catch (error) {
      console.log(error);
   }
}

export async function getProducsById(id: Product['id']) {
   try {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
      const { data } = await axios(url)
      const result = safeParse(ProductSchema, data.data)
      if(result.success) {
         return result.output
      } else{
         throw new Error('hubo un error...')
      }
   } catch (error) {
      console.log(error);
   }
}

export async function updateProduct( data: ProductData, id: Product['id']) {

   try {

      const NumberSchema = pipe(string(), transform(Number), number());

      const result = safeParse(ProductSchema, {
         id,
         name: data.name,
         price: parse(NumberSchema, data.price),
         availability: toBoolean(data.availability.toString())
      })
      if( result.success) {
         const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
         await axios.put(url, {
            id,
            name: result.output.name,
            price: result.output.price,
            availability: result.output.availability
        })
      }
   } catch (error) {
      console.log(error);
   }
}

export async function deleteProduct(id: Product['id']) {
   try {
          const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
          await axios.delete(url)
   } catch (error) {
      console.log(error);
   }
}


export async function updateProductAvailability(id:Product['id']) {
   try {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
          await axios.patch(url)
   } catch (error) {
      console.log(error);
   }
   
}
