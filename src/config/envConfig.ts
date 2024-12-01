const envConfig = {
  baseApi: process.env.NEXT_PUBLIC_BACKEND_URL,
  cloudinary_upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  cloudinary_url: process.env.NEXT_PUBLIC_CLOUDINARY_URL,
  jwt_access_secret: process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.NEXT_PUBLIC_JWT_ACCESS_EXPIRES_IN,
};

export default envConfig;
