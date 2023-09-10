import { NextResponse } from "next/server"
import prisma from "@/lib/prisma";

export const GET = async (req, {params}) => {

    try {

        const result = await prisma.book.findMany();

        return NextResponse.json(result, {status: 200})
    } catch(err) {
        console.log(err);
    }
}