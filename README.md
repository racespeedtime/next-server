# next_server

## 初始化

```sh
pnpm i

cd ./backend && pnpm i
cd ../frontend && pnpm i
cd ../server && pnpm i
```

将根目录和`backend`下的`.env.example`复制并重命名为`.env`，配置环境值。
手动补充`server`的依赖环境，即`omp-server`和相关插件的存放。

初次构建后，连接到`mysql`容器，创建一个数据库对应`backend/.env`的`DB_NAME`，然后执行`backend/init.sql` 初始数据。

由于后端服务依赖于`mysql`，初次构建如果没有创建对应的数据库，可能造成后端项目报错并不断重启，建议配置好后执行一次`docker-compose restart`。

## 构建

将整体代码通过`git clone`或`sftp`等形式传输到服务器上。
>`server`的依赖环境如果跑在linux系统，则不应上传windows的环境依赖，应当在服务器上重新配置相关环境。

```sh

docker-compose up -d --build # 重新构建全部镜像并后台运行
# ----------------------------------------------------------------
docker-compose up -d --build backend # 只重新构建后端
docker-compose up -d --build frontend # 只重新构建前端
docker-compose up -d --build server # 只重新构建服务端
# ----------------------------------------------------------------
docker-compose up -d # 基于已构建镜像并后台运行
```
