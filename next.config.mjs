/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
              hostname: "picsum.photos"
          },{
              hostname: "merchplus.blob.core.windows.net"
          },{
            hostname:"lh3.googleusercontent.com"
          }
      ]
    }, 
    output :'standalone' ,
    eslint: {
      ignoreDuringBuilds: true,
    }
};

export default nextConfig;
