#!/usr/bin/env bash

port=$1
host=$2
dir=$3

cd dist

echo "压缩dist"

tar -zcf ./dist.tar.gz ./*

echo "上传文件"

chmod 777 ../pack/reset.sh
scp -r -P $port ./dist.tar.gz root@$host:$dir
scp -r -P $port ../pack/reset.sh root@$host:$dir

echo "执行远程脚本"

ssh -p $port root@$host "cd $dir/; ./reset.sh"

echo "移除本地tar压缩文件"

rm ./dist.tar.gz

echo "完成"
