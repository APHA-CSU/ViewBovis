"""
    Script for extracting access data from the nginx log. Designed to be
    run as a system service prior to shutdown of the server.
"""

import argparse
import json
import os
from datetime import date

DEFAULT_ACCESS_LOG_PATH = "/var/log/nginx/access.log"
DEFAULT_OUTPUT_PATH = "/var/log/viewbovis/"


def run(access_log_path, out_dir):
    """
        Parses the nginx access log and extracts data on the number of
        visits to each page within app from remote connections when run
        in production. Saves a json file with statistic to 'out_dir'.
    """
    requests = {"/ ": 0,
                "/sample": 0,
                "/sample/related": 0,
                "/sample/matrix": 0,
                "/charon/getDataset": 0}
    with open(access_log_path, "r") as f_log:
        for line in f_log:
            for route in requests.keys():
                if f"GET {route}" in line:
                    requests[route] += 1
    with open(os.path.join(out_dir, f"viewbovis_requests_{date.today()}.json"),
              "w") as f_json:
        json.dump(requests, f_json, indent=4)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(prog="parse_nginx_log")
    parser.add_argument("--log_path", dest="access_log_path",
                        default=DEFAULT_ACCESS_LOG_PATH,
                        help="path to nginx access log file")
    parser.add_argument("--out_dir", dest="out_dir",
                        default=DEFAULT_OUTPUT_PATH,
                        help="path to output directory")
    args = parser.parse_args()
    run(args.access_log_path, args.out_dir)
