import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile } from 'fs/promises'
import path from "path";

export const POST = async (req) => {

    const data = await req.formData();
    const file = data.get('image')

    if (!file) {
    return NextResponse.json({ success: false })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const image = path.join('images', file.name);
    const storageImage = path.join(process.cwd(), 'public', image);
    await writeFile(storageImage, buffer);
    // console.log(`open ${path} to see the uploaded file`)

    try {

        const book = await prisma.book.create({
            data: {
                title: data.get("title"),
                author: data.get("author"),
                publisher: data.get("publisher"),
                year: +data.get("year"),
                pages: +data.get("pages"),
                image: image
            }



        })

        return NextResponse.json(book)

    } catch(err) {
        throw(err)
    }

}