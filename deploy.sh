DATA_DIR=$1
docker run --rm -d --expose 5000 --network host --name viewbovis \
    --mount type=bind,source=$DATA_DIR,target=/data \
    --mount type=bind,source=/var/log/viewbovis-access.log,target=/ViewBovis/access.log \
    --mount type=bind,source=/var/log/viewbovis-error.log,target=/ViewBovis/error.log \
    viewbovis
