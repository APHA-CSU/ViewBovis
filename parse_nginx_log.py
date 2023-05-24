import argparse

DEFAULT_ACCESS_LOG_PATH = "/var/log/nginx/access.log"


def run(access_log_path):
    # TODO: add nextstrain requests
    requests = {"GET / ": 0,
                "GET /sample": 0,
                "GET /sample/related": 0,
                "GET /sample/matrix": 0,
                "GET /charon/getDataset": 0}
    with open(access_log_path, "r") as f:
        for line in f:
            for route in requests.keys():
                if f"GET {route}" in line:
                    requests[route] += 1
    print(requests)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(prog="parse_nginx_log")
    parser.add_argument("--log_path", dest="access_log_path",
                        default=DEFAULT_ACCESS_LOG_PATH,
                        help="path to nginx access log file")
    args = parser.parse_args()
    run(args.access_log_path)
