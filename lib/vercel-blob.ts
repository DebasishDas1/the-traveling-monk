import { uploadTrekPhotoToCloudinary } from './cloudinary-upload'

export async function uploadTrekPhoto(file: File) {
  try {
    return await uploadTrekPhotoToCloudinary(file)
  } catch (error) {
    console.error('Upload error:', error)
    throw error
  }
}
