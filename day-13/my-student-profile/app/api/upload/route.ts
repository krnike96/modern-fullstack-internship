import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const formData = await request.formData()
    const file = formData.get('image') as File | null
    if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = path.join(process.cwd(), 'public/uploads')
    await mkdir(uploadDir, { recursive: true })

    const uniqueName = `${Date.now()}-${file.name}`
    const filePath = path.join(uploadDir, uniqueName)
    await writeFile(filePath, buffer)

    const imageUrl = `/uploads/${uniqueName}`
    return NextResponse.json({ imageUrl })
}