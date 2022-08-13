# Stage 1
FROM node:16.13.2 as node

ENV NODE_ENV=production

WORKDIR /app

# Application files
COPY [".browserslistrc", ".editorconfig", ".eslintrc.js", "babel.config.js", "cypress.json", "jest.config.js", "package.json", "package-lock.json*", "tsconfig.json", "vue.config.js", "./"]
# COPY [".env*", "./"]
COPY ["src", "./src/"]
COPY ["public", "./public/"]

# NGINX files
COPY ["nginx", "./nginx"]

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
COPY --from=node /app/nginx/*  /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist /usr/share/nginx/html
EXPOSE 50999
# CMD ["nginx", "-g", "daemon off;"]
