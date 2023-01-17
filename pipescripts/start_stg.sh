#!/bin/bash
cd /var/www/html/bodyshop_app/nextjs/stg
ls -la
pwd
tar -xzf react-ssr-nextjs_artifact.tar.gz
rm -rf react-ssr-nextjs_artifact.tar.gz
cp env .env
pwd
ls -la
pm2 reload bodyShop_STG_SSR_Next
#pm2 start npm --name bodyShop_SSR_Next -- run start
pm2 status
