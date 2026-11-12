#!/usr/bin/env bash
# Run once from the-grand-vista/ to pull your Pinterest images into assets/images/
cd "$(dirname "$0")/assets/images" || exit 1
dl(){ curl -L -A "Mozilla/5.0" -o "$1" "$2"; }
dl hero-bg.jpg     https://i.pinimg.com/736x/a4/eb/d6/a4ebd622456f9f3825c09d5cb3b38006.jpg
dl bg-dining.jpg   https://i.pinimg.com/736x/f0/a6/a4/f0a6a439fe5c8b23216732ef8e01e445.jpg
dl bg-banquet.jpg  https://i.pinimg.com/736x/da/5f/e1/da5fe156d4e90fe5e76c477cc7dc0ad8.jpg
dl bg-lawn.jpg     https://i.pinimg.com/1200x/73/83/2b/73832bfc76daa8f0a9defecc0e1f1a78.jpg
dl bg-events.jpg   https://i.pinimg.com/1200x/0d/bb/ce/0dbbcedc210065a1d4cc4ff9923448c6.jpg
