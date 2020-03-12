#!/usr/bin/env bash

if [ -f "reset.sh" ] && [ -f "dist.tar.gz" ]; then
  echo "ssh 移除原文件"
  rm -r ./static
  rm index.html

  echo "ssh 开始解压"

  tar -zxf ./dist.tar.gz

  echo "ssh 移除压缩文件和可执行文件"

  rm ./dist.tar.gz
  rm ./reset.sh
else
  echo "ssh 没有发现可执行文件"
fi
