# q: docker 如何运行一个容器
# a: docker run -it --name myubuntu ubuntu:16.04 /bin/bash
# q: docker 如何查看容器
# a: docker ps -a
# q: docker 如何进入容器
# a: docker exec -it myubuntu /bin/bash
# q: docker 如何运行一个已经存在的容器
# a: docker start myubuntu

# q: docker 如何生成一个镜像
# a: docker commit -m "ubuntu 16.04" -a "zhangsan" myubuntu ubuntu:16.04
# q: docker 如何在本地生成镜像
# a: docker save -o ubuntu:16.04.tar ubuntu:16.04

# docker run -it -d --name zz-platform-config --privileged -p 5173:5173 D:/projectCode/zz-platform/zz-platform-config:/app/zz-platform-config node:16.15.1 /bin/bash -c "cd /app/zz-platform-config && node -v && npm i && npm run dev"
