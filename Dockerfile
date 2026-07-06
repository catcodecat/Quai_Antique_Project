FROM nginx:1.27-alpine

COPY index.html /usr/share/nginx/html/
COPY gallery.html /usr/share/nginx/html/
COPY menu.html /usr/share/nginx/html/
COPY reservation.html /usr/share/nginx/html/
COPY login.html /usr/share/nginx/html/
COPY register.html /usr/share/nginx/html/
COPY admin.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/
COPY config.js /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

EXPOSE 80
