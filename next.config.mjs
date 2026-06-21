/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      // Limite de tamanho para uploads (fotos e vídeos) enviados pelo painel.
      // Aumente este valor se precisar enviar vídeos maiores que isto.
      bodySizeLimit: "200mb",
    },
  },
};

export default nextConfig;
