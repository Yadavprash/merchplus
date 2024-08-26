import { Product } from "../types/productType"
import Image from "next/image"
export const CartItem = ({item , quantity} :{item:Product,quantity : number}) =>{
    const url = item?.Image ? (item.Image[0]?.url  + process.env.NEXT_PUBLIC_AZURE_BLOB_TOKEN) : "https://picsum.photos/500/500" ; 
    return <div className="flex  border-b">
        {/* {JSON.stringify(item)} */}
    <div className="my-2">
        <Image width={200} height={200} src={url} alt="prodImage"></Image>
    </div>
    <div className="w-full p-2">
        <div className="flex flex-col">
            <div>  {item.name} </div>
            <div> { "Black"} </div>
            <div> { "XL"} </div>
        </div>
        <div className="flex justify-end">
            <div className="flex mx-2 flex-col ">
                <div>
                    Item Price
                </div>
                <div>
                    {item.price}
                </div>
            </div>
            <div className="flex mx-2 flex-col">
                <div>
                    Quantity
                </div>
                <div>
                    {quantity}
                </div>
            </div>
            <div className="flex ml-2 flex-col">
                <div>Total Price</div>
                <div>₹ {item.price * quantity}</div>
            </div>
        </div>
        <div className="flex mt-2 justify-between">
            <div className="font-mono">
                Free Shipping + Free Returns
            </div>
            <div>
                <button className="underline">Remove</button>
            </div>
        </div>
    </div>
</div>
}