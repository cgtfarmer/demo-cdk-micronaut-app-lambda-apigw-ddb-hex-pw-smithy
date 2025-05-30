FROM gradle:8.4.0-jdk21 AS development

WORKDIR /usr/local/api

COPY . ./

RUN gradle build

CMD ["gradle", "run"]


# FROM development AS build

# RUN npm run build


# FROM nginx:1.26.2 AS production

# COPY --from=build /home/node/app/build/* /usr/share/nginx/html/
