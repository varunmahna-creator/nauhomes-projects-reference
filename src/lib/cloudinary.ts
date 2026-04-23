import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export default cloudinary

export const uploadToCloudinary = async (
  file: File, 
  folder: string = 'nauhomes'
): Promise<{ url: string; public_id: string }> => {
  const buffer = await file.arrayBuffer()
  const bytes = Buffer.from(buffer)

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: 'auto',
          folder: folder,
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error) {
            reject(error)
          } else if (result) {
            resolve({
              url: result.secure_url,
              public_id: result.public_id,
            })
          } else {
            reject(new Error('Upload failed'))
          }
        }
      )
      .end(bytes)
  })
}