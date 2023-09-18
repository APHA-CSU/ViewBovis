import pytest
import requests


API_URL = "http://127.0.0.1:5000"


def test_get_sample():
    r = requests.get(f"{API_URL}/sample?sample_name=a_submission")
    assert r.status_code == 200


def test_get_movements():
    r = requests.get(f"{API_URL}/sample/movements?sample_name=a_submission")
    assert r.status_code == 200


def test_get_related_samples():
    r = requests.get(f"{API_URL}"
                     "/sample/related?sample_name=a_submission&snp_distance=1")
    assert r.status_code == 200


def test_get_snp_matrix():
    r = requests.get(f"{API_URL}"
                     "/sample/matrix?sample_name=a_submission&snp_distance=1")
    assert r.status_code == 200
