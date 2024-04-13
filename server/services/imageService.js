import { v2 as cloudinary } from 'cloudinary'

/* remove image from cloudinary */
export async function remove(public_id) {
    await cloudinary.uploader.destroy(public_id);
  }

  /* remove image from cloudinary */
export async function removePhoto(public_id) {
    await remove(public_id);
  }
  