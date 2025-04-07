# Etapa de desarrollo
FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia archivos necesarios
COPY package*.json ./
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto
EXPOSE 3000

# Comando para desarrollo con hot-reload
CMD ["npm", "run", "start:dev"]
