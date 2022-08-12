# TAG=1.0 docker build --progress=plain -t ark.hangar.live/marut:${TAG} .
# TAG=1.0 docker run -p 50101:50101 -v "/$(pwd)/nginx/site.conf:/etc/nginx/conf.d/default.conf" --network=web --name marut ark.hangar.live/marut:${TAG}

# Stage 1
FROM node:16.13.2 as node

ENV NODE_ENV=production

WORKDIR /app

# application files
COPY ["babel.config.js", "jest.config.js", "package.json", "package-lock.json*", "tsconfig.json", "vue.config.js", "", "./"]
COPY [".env*", "./"]
COPY ["src", "./src/"]
COPY ["public", "./public/"]

# Install @vue/cli-service and @vue/cli globally
RUN npm install -g @vue/cli-service
RUN npm install -g @vue/cli

# Install all dependencies, get past prepare/postinstall
RUN npm install --production=false

# ci:frontend:build
# RUN npm run build : Deprecated
RUN vue-cli-service build --mode production

# Stage 2
FROM nginx:stable-alpine as production-stage
COPY --from=node /app/dist /usr/share/nginx/html
EXPOSE 50999
CMD ["nginx", "-g", "daemon off;"]
