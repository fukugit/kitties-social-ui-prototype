/** @type {import('next').NextConfig} */
import localConfig from './src/env/local.mjs'
import developmentConfig from './src/env/development.mjs'

const appEnv = process.env.APP_ENV || "local";
let envConfig;
switch(appEnv) {
    case "development":
        envConfig = developmentConfig;
        break;
    case "local":
    default:
        envConfig = localConfig;
}

const nextConfig = {
    env: {
        NEXT_PUBLIC_BASE_URL: envConfig.baseUrl
    },
}

export default nextConfig;
