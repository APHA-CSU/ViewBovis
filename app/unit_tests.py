import unittest
from unittest import mock

import pandas as pd
import numpy as np

from viewbovis_data import ViewBovisData


class TestViewBovisData(unittest.TestCase):

    def setUp(self):
        ViewBovisData._db_connect = mock.Mock()
        ViewBovisData._load_soi = mock.Mock()
        ViewBovisData.__del__ = mock.Mock()
        self.data = ViewBovisData("foo_path", "foo_id")

    def tearDown(self) -> None:
        self.data.__del__()
        return super().tearDown()

    def test_submission_movement_metadata(self):
        # setup - mock private methods
        self.data._get_lat_long = mock.Mock()
        self.data._submission_metadata = mock.Mock()
        self.data._submission_movdata = mock.Mock()
        # setup - return values for private method mocks
        self.data._submission_metadata.return_value = \
            pd.DataFrame({"Clade": ["A"], "Identifier": ["B"], "Host": ["C"],
                          "SlaughterDate": ["D"], "Animal_Type": ["E"],
                          "CPH": ["F"], "CPHH": ["G"], "CPH_Type": ["H"],
                          "County": ["I"], "RiskArea": ["J"], "Loc0": ["K"],
                          "OutsideHomeRange": ["L"]}, index=["Y"])
        self.data._submission_movdata.return_value = \
            pd.DataFrame({"Loc_Num": [0, 1, 2], "Loc": ["J", "O", "T"],
                          "County": ["M", "N", "O"],
                          "CPH_Type": ["P", "Q", "R"],
                          "Loc_StartDate": ["S", "T", "U"],
                          "Loc_Duration": ["V", "W", "X"],
                          "Loc_EndDate": ["Z", "AA", "AB"]},
                         index=["Y", "Y", "Y"])
        self.data._get_lat_long.return_value = \
            pd.DataFrame({"Lat": [1, 2, 3], "Long": [4, 5, 6]},
                         index=["J", "O", "T"])
        # expected output
        expected = {"submission": "Y", "clade": "A", "identifier": "B",
                    "species": "C", "slaughter_date": "D", "animal_type": "E",
                    "cph": "F", "cphh": "G", "cph_type": "H", "county": "I",
                    "risk_area": "J", "out_of_homerange": "L", "move":
                        {"0": {"cph": "J", "lat": 1, "lon": 4, "on_date": "S",
                               "off_date": "Z", "stay_length": "V",
                               "type": "P", "county": "M"},
                         "1": {"cph": "O", "lat": 2, "lon": 5, "on_date": "T",
                               "off_date": "AA", "stay_length": "W",
                               "type": "Q", "county": "N"},
                         "2": {"cph": "T", "lat": 3, "lon": 6, "on_date": "U",
                               "off_date": "AB", "stay_length": "X",
                               "type": "R", "county": "O"}}}
        # test expected output
        self.assertDictEqual(self.data.submission_movement_metadata(),
                             expected)
        # assert mock calls
        self.data._get_lat_long.assert_called_once_with(["J", "O", "T"])

    def test_related_submission_metadata(self):
        # setup - mock attributes
        setattr(self.data, "_submission", "foo_sub")
        # setup - mock private methods
        self.data._related_snp_matrix = mock.Mock()
        self.data._submission_metadata = mock.Mock()
        self.data._get_lat_long = mock.Mock()
        self.data._geo_distance = mock.Mock()
        # setup - return values for private method mocks
        self.data._related_snp_matrix.return_value = \
            pd.DataFrame({"foo_sub": [0, 3],
                          "bar_sub": [3, 0]},
                         index=["foo_sub", "bar_sub"])
        self.data._submission_metadata.return_value = \
            pd.DataFrame({"Identifier": ["foo_id", "bar_id"],
                          "SlaughterDate": ["foo_date", "bar_date"],
                          "CPH": ["J", "O"], "Host": ["COW", "COW"],
                          "CPHH": ["foo_herd", "bar_herd"],
                          "Clade": ["foo_clade", "bar_clade"]},
                         index=["foo_sub", "bar_sub"])
        self.data._get_lat_long.return_value = \
            pd.DataFrame({"Lat": [1, 2], "Long": [4, 5], "x": [1, 2],
                          "y": [4, 5]}, index=["J", "O"])
        self.data._geo_distance.side_effect = [0.0, 1.1]
        # expected output
        expected = \
            {"foo_sub": {"lat": 1, "lon": 4, "snp_distance": 0,
                         "animal_id": "foo_id", "herd": "foo_herd",
                         "clade": "foo_clade", "date": "foo_date",
                         "distance": 0.0},
             "bar_sub": {"lat": 2, "lon": 5, "snp_distance": 3,
                         "animal_id": "bar_id", "herd": "bar_herd",
                         "clade": "bar_clade", "date": "bar_date",
                         "distance": 1.1}}
        # test expected output
        self.assertDictEqual(
            self.data.related_submissions_metadata(3), expected)
        # assert mock calls
        self.data._submission_metadata.assert_called_once_with(["foo_sub",
                                                                "bar_sub"])
        self.data._get_lat_long.assert_called_once_with({"O", "J"})
        self.data._geo_distance.assert_has_calls([mock.call((1, 4)),
                                                  mock.call((2, 5))])

#self.data._submission_to_sample = mock.Mock(wraps=lambda x: x[:-4])
#self.data._sample_to_submission = mock.Mock(wraps=lambda x: f"{x}_sub")

if __name__ == "__main__":
    unittest.main()
