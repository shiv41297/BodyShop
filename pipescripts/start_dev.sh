#!/bin/bash
cd /var/www/html/bodyshop_app/nextjs/dev
ls -la
pwd
tar -xzf react-ssr-nextjs_artifact.tar.gz
rm -rf react-ssr-nextjs_artifact.tar.gz
cp env .env
pwd
ls -la
#pm2 reload bodyShop_SSR_React
pm2 delete bodyShop_SSR_React
pm2 start ./next/server.js --name bodyShop_SSR_React
#pm2 start npm --name bodyShop_SSR_React -- run start:server
pm2 status
