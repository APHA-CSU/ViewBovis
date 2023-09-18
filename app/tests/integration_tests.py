import unittest
import requests


API_URL = "http://127.0.0.1:5000"


class TestViewBovisAPI(unittest.TestCase):

    def test_get_homepage(self):
        r = requests.get(f"{API_URL}/")
        assert r.status_code == 200

    def test_get_sample(self):
        # request complete data
        r = requests.get(f"{API_URL}/sample?sample_name=a_submission")
        expected_resp_body = {"submission": "a_submission",
                              "clade": "B6-11",
                              "identifier": "a_id",
                              "species": "COW",
                              "animal_type": "FARMED",
                              "slaughter_date": "01/01/2023",
                              "cph": "01/012/0152",
                              "cph_type": "Agricultural Holding",
                              "county": "a_county",
                              "risk_area": "LRA",
                              "out_of_homerange": "N",
                              "dob": "01/01/2021",
                              "sex": "F",
                              "disclosing_test": "a_test_type",
                              "import_country": None}
        assert r.status_code == 200
        self.assertDictEqual(r.json(), expected_resp_body)

        # request missing metadata
        r = requests.get(f"{API_URL}"
                         "/sample?sample_name=no_meta_submission")
        expected_resp_body = {"submission": "no_meta_submission",
                              "clade": "foo_clade",
                              "identifier": None,
                              "species": None,
                              "animal_type": None,
                              "slaughter_date": None,
                              "cph": None,
                              "cph_type": None,
                              "county": None,
                              "risk_area": None,
                              "out_of_homerange": None,
                              "dob": None,
                              "sex": None,
                              "disclosing_test": None,
                              "import_country": None}
        assert r.status_code == 200
        self.assertDictEqual(r.json(), expected_resp_body)

        # request missing wgs data
        r = requests.get(f"{API_URL}"
                         "/sample?sample_name=no_wgs_submission")
        expected_resp_body = \
            {"warnings": True,
             "warning": "Missing WGS data for submission: no_wgs_submission"}
        assert r.status_code == 200
        self.assertDictEqual(r.json(), expected_resp_body)

        # request missing data
        r = requests.get(f"{API_URL}/sample?sample_name=no_data_submission")
        expected_resp_body = \
            {"warnings": True,
             "warning": "Invalid submission: no_data_submission"}
        assert r.status_code == 200
        self.assertDictEqual(r.json(), expected_resp_body)

    def test_get_movements(self):
        # request complete data
        r = requests.get(f"{API_URL}/sample/movements?sample_name=a_submission")
        expected_resp_body = {"submission": "a_submission",
                              "clade": "B6-11",
                              "identifier": "a_id",
                              "species": "COW",
                              "animal_type": "FARMED",
                              "slaughter_date": "01/01/2023",
                              "cph": "01/012/0152",
                              "cph_type": "Agricultural Holding",
                              "county": "a_county",
                              "risk_area": "LRA",
                              "out_of_homerange": "N",
                              "dob": "01/01/2021",
                              "sex": "F",
                              "disclosing_test": "a_test_type",
                              "import_country": None,
                              "move":
                                  {"0":
                                      {"cph": "01/006/0045",
                                       "os_map_ref": "TL0889636395",
                                       "lat": 52.0153075045731,
                                       "lon": -0.414631106731372,
                                       "on_date": "01/01/2021",
                                       "off_date": "01/01/2022",
                                       "stay_length": "365",
                                       "type": "Agricultural Holding",
                                       "county": "a1_county",
                                       "risk_area_at_move": "LRA",
                                       "risk_area_current": "LRA"},
                                   "1":
                                      {"cph": "01/012/0152",
                                       "os_map_ref": "SP9532747105",
                                       "lat": 52.1140624236131,
                                       "lon": -0.609298037192273,
                                       "on_date": "01/01/2022",
                                       "off_date": "01/01/2023",
                                       "stay_length": "365",
                                       "type": "Market",
                                       "county": "a2_county",
                                       "risk_area_at_move": "LRA",
                                       "risk_area_current": "LRA"},
                                   "2":
                                      {"cph": "01/045/0064",
                                       "os_map_ref": "TL1401655639",
                                       "lat": 52.1872212958073,
                                       "lon": -0.333624906280236,
                                       "on_date": "01/01/2023",
                                       "off_date": "01/01/2023",
                                       "stay_length": "0",
                                       "type": "Slaughterhouse (Red Meat)",
                                       "county": "a3_county",
                                       "risk_area_at_move": "LRA",
                                       "risk_area_current": "LRA"}}}
        assert r.status_code == 200
        self.assertDictEqual(r.json(), expected_resp_body)

        # request missing metadata
        r = requests.get(f"{API_URL}"
                         "/sample/movements?sample_name=no_meta_submission")
        expected_resp_body = \
            {"warnings": True,
             "warning":
             "Incomplete or missing metadata for submission: no_meta_submission"}
        assert r.status_code == 200
        self.assertDictEqual(r.json(), expected_resp_body)

        # request non-bovine submission
        r = requests.get(f"{API_URL}/sample/movements?sample_name=e_submission")
        expected_resp_body = \
            {"warnings": True,
             "warning": "Non-bovine submission: e_submission"}
        assert r.status_code == 200
        self.assertDictEqual(r.json(), expected_resp_body)

        # request missing data
        r = requests.get(f"{API_URL}"
                         "/sample/movements?sample_name=no_data_submission")
        expected_resp_body = \
            {"warnings": True,
             "warning": "Invalid submission: no_data_submission"}
        assert r.status_code == 200
        self.assertDictEqual(r.json(), expected_resp_body)

    def test_get_related_samples(self):
        r = requests.get(f"{API_URL}"
                         "/sample/related?sample_name=a_submission&"
                         "snp_distance=1")
        assert r.status_code == 200

    def test_get_snp_matrix(self):
        r = requests.get(f"{API_URL}"
                         "/sample/matrix?sample_name=a_submission&"
                         "snp_distance=1")
        assert r.status_code == 200
