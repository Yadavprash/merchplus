import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
export  async function POST(req:NextRequest){
    const {query}:{query:string} = await req.json();

    if(typeof query !== "string" || !query.trim()){
        return NextResponse.json({
            msg: "Invalid query parameters"
        })
    }

    try {
        
        const products = await prisma.product.findMany({
            where:{
                OR:[
                    {name : {contains :query ,mode:"insensitive"}},
                    {categories :{some:{name: {contains :query ,mode:"insensitive"}}}},
                    {description : {contains :query ,mode:"insensitive"}}
                ]
            },
            include:{
                categories:true,
                styles:{
                    include:{
                        images:{
                            orderBy:{
                                url:"asc"
                            }
                        }
                    }
                }
            }
        })
        return NextResponse.json({products});
    } catch (error) {
        return NextResponse.json({
            msg: "Invalid query parameters"
        })
    }

}