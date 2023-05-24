import argparse
import json
from datetime import date

DEFAULT_ACCESS_LOG_PATH = "/var/log/nginx/access.log"


def run(access_log_path):
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
    with open(f"viewbovis_requests_{date.today()}.json", "w") as f_json:
        json.dump(requests, f_json, indent=4)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(prog="parse_nginx_log")
    parser.add_argument("--log_path", dest="access_log_path",
                        default=DEFAULT_ACCESS_LOG_PATH,
                        help="path to nginx access log file")
    args = parser.parse_args()
    run(args.access_log_path)
