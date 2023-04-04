# 基于node:16.15.1镜像构建
FROM node:16.15.1

# 安装pnpm
RUN npm install -g pnpm

# 安装http-server
RUN npm install -g http-server

# 设置工作目录
WORKDIR /app

# 将当前目录下的所有文件复制到工作目录下
COPY . ./v-admin

# 进入工作目录
WORKDIR /app/v-admin

# 安装依赖
RUN pnpm install

# 构建
RUN pnpm build

# 暴露端口
EXPOSE 3000


# 进入打包输出目录
WORKDIR /app/v-admin/app/dist

# 使用http-server启动服务
CMD ["http-server", "-p", "3000"]
