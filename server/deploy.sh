DATA_DIR=$1
docker run --rm -d --network host --name viewbovis \
    --mount type=bind,source=${DATA_DIR},target=/data \
    --mount type=bind,source=${DATA_DIR}/layers,target=/ViewBovis/app/static/data \
    --mount type=bind,source=/var/log/viewbovis-access.log,target=/ViewBovis/access.log \
    --mount type=bind,source=/var/log/viewbovis-error.log,target=/ViewBovis/error.log \
    aphacsubot/viewbovis:prod gunicorn -b 127.0.0.1:3002 -w 1 deploy:app \
    --log-level=info --access-logfile /ViewBovis/access.log \
    --error-logfile /ViewBovis/error.log
