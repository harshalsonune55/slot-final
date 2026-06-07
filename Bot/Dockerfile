# Debian-based (glibc) image — required by onnxruntime-node's prebuilt
# binaries (used by @xenova/transformers for local embeddings), which fail
# to load on musl-based Alpine with "ld-linux-x86-64.so.2: No such file".
FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

CMD ["node", "index.js"]
