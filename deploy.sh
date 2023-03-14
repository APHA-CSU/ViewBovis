DATA_DIR=$1
docker run --rm --expose 5000 --network host --mount type=bind,source=$DATA_DIR,target=/data viewbovis
