DATA_DIR=$1
if [ $2 = 'testing' ]
then
NAME='viewbovis-test'
PORT=3002
WORKERs=1
elif [ $2 = 'prod' ]
then
NAME='viewbovis'
PORT=3000
WORKERS=8
fi

echo $NAME
docker run --rm -d --network host --name ${NAME} \
    --mount type=bind,source=${DATA_DIR},target=/data \
    --mount type=bind,source=${DATA_DIR}/layers,target=/ViewBovis/app/static/data \
    --mount type=bind,source=/var/log/viewbovis-access.log,target=/ViewBovis/access.log \
    --mount type=bind,source=/var/log/viewbovis-error.log,target=/ViewBovis/error.log \
    aphacsubot/viewbovis:prod gunicorn -b 127.0.0.1:${PORT} -w ${WORKERS} deploy:app \
        --log-level=info --access-logfile /ViewBovis/access.log \
        --error-logfile /ViewBovis/error.log
