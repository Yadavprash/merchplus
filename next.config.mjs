
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
    reactStrictMode : true,
    distDir : 'build',
    output: 'standalone'

};

export default nextConfig;
