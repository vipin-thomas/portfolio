# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy custom nginx config (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
