# Step 1: Build the app
FROM node:18-alpine AS builder

WORKDIR /app

# Accept build argument
ARG VITE_API_URL_PROD

# Inject it into a temporary .env.production file
RUN echo "VITE_API_URL=$VITE_API_URL_PROD" > .env.production

COPY . .

RUN npm install && npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
