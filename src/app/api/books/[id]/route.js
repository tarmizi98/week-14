import { NextResponse } from "next/server"
import prisma from "@/lib/prisma";

export const GET = async (req, {params}) => {

    try {

        const {id} = params;

        const foundBook = await prisma.book.findUnique({
            where: {
                id: +id
            }
        })

        if(!foundBook) {
            throw {name: "ErrorNotFound"}
        }

        return NextResponse.json(foundBook, {status: 200})

    } catch(err) {
        if(err.name === "ErrorNotFound") {
            return NextResponse.json({message: "Error Not Found"}, {status: 404})
        } else {
            return NextResponse.json({message: "Internal Server Error"}, {status: 500})
        }
    }

}

export const PUT = async (req, {params}) => {

    const {id} = params;
    const data = await req.formData();

    try {

        const editBook = await prisma.book.update({
            where: {
                id: +id
            },
            data: {
                title: data.get("title"),
                author: data.get("author"),
                publisher: data.get("publisher"),
                year: +data.get("year"),
                pages: +data.get("pages")
            }
        })


        return NextResponse.json(editBook, {status: 200})

    } catch(err) {
        throw(err)
    }

}

export const DELETE = async (req, {params}) => {

    const {id} = params;

    try {

        const deleteBook = await prisma.book.delete({
            where: {
                id: +id
            }
        })


        return NextResponse.json(deleteBook, {status: 200})

    } catch(err) {
        throw(err)
    }

}