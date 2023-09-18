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
                              "clade": "B6-11",
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
        # request complete data
        expected_resp_body = \
            {"SOI": "a_submission",
             "a_submission":
                {"animal_id": "a_id", "animal_type": "FARMED", "clade": "B6-11",
                 "cph": "01/012/0152", "disclosing_test": "a_test_type",
                 "distance": 0.0, "dob": "01/01/2021",
                 "import_country": None, "lat": 52.1140624236131,
                 "lon": -0.609298037192273, "os_map_ref": "SP9532747105",
                 "sex": "F", "slaughter_date": "01/01/2023", "snp_distance": 0,
                 "species": "COW"},
             "b_submission":
                {"animal_id": "b_id", "animal_type": "FARMED", "clade": "B6-11",
                 "cph": "01/075/0012", "disclosing_test": "b_test_type",
                 "distance": 12.980084790561195, "dob": "02/01/2021",
                 "import_country": "IRELAND", "lat": 51.9265023941018,
                 "lon": -0.622941104183655, "os_map_ref": "SP9478826227",
                 "sex": "F", "slaughter_date": "02/01/2023", "snp_distance": 1,
                 "species": "COW"},
             "c_submission":
                {"animal_id": "c_id", "animal_type": "FARMED", "clade": "B6-11",
                 "cph": "01/096/0047", "disclosing_test": "c_test_type",
                 "distance": 4.829357859514863, "dob": "03/01/2021",
                 "import_country": None, "lat": 52.1838881743903,
                 "lon": -0.612415934455539, "os_map_ref": "SP9496554867",
                 "sex": "F", "slaughter_date": "03/01/2023", "snp_distance": 2,
                 "species": "COW"},
             "d_submission":
                {"animal_id": "d_id", "animal_type": "FARMED", "clade": "B6-11",
                 "cph": "01/127/0106", "disclosing_test": "d_test_type",
                 "distance": 10.715307964158667, "dob": "04/01/2021",
                 "import_country": None, "lat": 51.9591624716284,
                 "lon": -0.61785103188392, "os_map_ref": "SP9506929866",
                 "sex": "F", "slaughter_date": "04/01/2023", "snp_distance": 3,
                 "species": "COW"},
             "e_submission":
                {"animal_id": "e_id", "animal_type": "WILD", "clade": "B6-11",
                 "cph": None, "disclosing_test": "c_test_type",
                 "distance": None, "dob": None, "import_country": None,
                 "lat": None, "lon": None, "os_map_ref": None, "sex": "F",
                 "slaughter_date": None, "snp_distance": 4, "species": "BADGER"},
             "f_submission":
                {"animal_id": "f_id", "animal_type": "WILD", "clade": "B6-11",
                 "cph": None, "disclosing_test": "d_test_type",
                 "distance": None, "dob": None, "import_country": None,
                 "lat": None, "lon": None, "os_map_ref": None, "sex": "F",
                 "slaughter_date": None, "snp_distance": 5, "species": "BADGER"},
             "g_submission":
                {"animal_id": "g_id", "animal_type": "FARMED", "clade": "B6-11",
                 "cph": "02/055/0027", "disclosing_test": "g_test_type",
                 "distance": 60.71069987042169, "dob": "05/01/2021",
                 "import_country": None, "lat": 51.4287725983194,
                 "lon": -1.49463432041959, "os_map_ref": "SU3523170095",
                 "sex": "F", "slaughter_date": "05/01/2023", "snp_distance": 6,
                 "species": "COW"},
             "h_submission":
                {"animal_id": "h_id", "animal_type": "FARMED", "clade": "B6-11",
                 "cph": "02/056/0022", "disclosing_test": "h_test_type",
                 "distance": 63.19178408232313, "dob": "04/01/2021",
                 "import_country": None, "lat": 51.3695780198466,
                 "lon": -1.46376836612594, "os_map_ref": "SU3742563527",
                 "sex": "F", "slaughter_date": "06/01/2023", "snp_distance": 6,
                 "species": "COW"},
             "no_meta_submission":
                {"animal_id": None, "animal_type": None, "clade": None,
                 "cph": None, "disclosing_test": None, "distance": None,
                 "dob": None, "import_country": None, "lat": None, "lon": None,
                 "os_map_ref": None, "sex": None, "slaughter_date": None,
                 "snp_distance": 6, "species": None}}
        r = requests.get(f"{API_URL}"
                         "/sample/related?sample_name=a_submission&"
                         "snp_distance=6")
        assert r.status_code == 200
        self.assertDictEqual(r.json(), expected_resp_body)

        # request missing data
        r = requests.get(f"{API_URL}"
                         "/sample/related?sample_name=no_meta_submission&"
                         "snp_distance=1")
        expected_resp_body = \
            {"warnings": True,
             "warning":
             "Incomplete or missing metadata for submission: no_meta_submission"}
        assert r.status_code == 200
        self.assertDictEqual(r.json(), expected_resp_body)

        # request missing data
        r = requests.get(f"{API_URL}"
                         "/sample/related?sample_name=no_data_submission&"
                         "snp_distance=1")
        expected_resp_body = \
            {"warnings": True,
             "warning": "Invalid submission: no_data_submission"}
        assert r.status_code == 200
        self.assertDictEqual(r.json(), expected_resp_body)

    def test_get_snp_matrix(self):
        r = requests.get(f"{API_URL}"
                         "/sample/matrix?sample_name=a_submission&"
                         "snp_distance=1")
        assert r.status_code == 200
