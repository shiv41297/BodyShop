cd /var/www/html/bodyshop_app/nextjs/dev
ls -la
pwd
tar xzf react-ssr-nextjs_artifact.tar.gz --no-overwrite-dir
cp env .env
rm -rf react-ssr-nextjs_artifact.tar.gz
pwd
#chown -R pythru-user:pythru-user /var/www/html/pythru/dev/node_services/pythru_customer
ls -la
#echo "pm2 reload"
#pm2 reload bodyShop_SSR_React
pm2 delete bodyShop_SSR_React
pm2 start ./dist/server.js --name bodyShop_SSR_React
pm2 save
#pm2 start npm --name bodyShop_SSR_React -- run start:server
