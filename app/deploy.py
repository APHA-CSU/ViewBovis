import argparse
import logging
from os import path

import viewbovis

DEFAULT_DATA_PATH = \
    path.join(path.dirname(path.dirname(path.dirname(path.abspath(__file__)))),
              "data")

# setup app
app = viewbovis.app

# dev mode
if __name__ == '__main__':
    parser = argparse.ArgumentParser(prog="viewbovis")
    parser.add_argument("--data_path", help="path to data directory",
                        default=DEFAULT_DATA_PATH)
    args = parser.parse_args()
    app.data_path = args.data_path
    app.run()
# prod mode
else:
    app.data_path = DEFAULT_DATA_PATH
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)
