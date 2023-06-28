import unittest
from unittest import mock

import pandas as pd
import pandas.testing as pdtesting
import numpy.testing as nptesting

from viewbovis_data import ViewBovisData


def transform_dateformat_side_effect_func(value):
    return f"{value}_transformed"


class TestViewBovisData(unittest.TestCase):

    def setUp(self):
        ViewBovisData._db_connect = mock.Mock()
        ViewBovisData._load_soi = mock.Mock()
        ViewBovisData.__del__ = mock.Mock()
        self.data = ViewBovisData("foo_path", "foo_id")

    def tearDown(self) -> None:
        self.data.__del__()
        return super().tearDown()

    @mock.patch("viewbovis_data.glob.glob")
    @mock.patch("viewbovis_data.pd.read_csv")
    def test_related_snp_matrix(self, mock_read_csv, mock_glob):
        # setup - mock attributes
        setattr(self.data, "_df_metadata_sub",
                pd.DataFrame({"Clade": ["foo_clade"]}, index=["foo_index"]))
        setattr(self.data, "_matrix_dir", "mock_matrix_dir")
        setattr(self.data, "_sample_name", "foo")
        setattr(self.data, "_submission", "foo_sub")
        # setup - mock private methods
        self.data._sample_to_submission = mock.Mock(wraps=lambda x: f"{x}_sub")
        self.data._sort_matrix = mock.Mock(wraps=lambda x: x)
        # setup - return values for external mocks
        mock_read_csv.return_value = \
            pd.DataFrame({"foo": [0, 3, 5],
                          "bar": [3, 0, 10],
                          "baz": [5, 10, 0]},
                         index=["foo", "bar", "baz"])
        mock_glob.return_value = "mock_matrix_path"
        # expected output
        expected = pd.DataFrame({"foo_sub": [0, 3], "bar_sub": [3, 0]},
                                index=["foo_sub", "bar_sub"])
        nptesting.assert_array_equal(self.data._related_snp_matrix(3),
                                     expected)

    def test_sort_matrix(self):
        # setup - mock attributes
        setattr(self.data, "_submission", "foo")
        # expected output
        expected = pd.DataFrame({"foo": [0, 3, 5],
                                 "bar": [3, 0, 10],
                                 "baz": [5, 10, 0]},
                                index=["foo", "bar", "baz"])
        pdtesting.assert_frame_equal(self.data._sort_matrix(
            pd.DataFrame({"bar": [0, 3, 10],
                          "foo": [3, 0, 5],
                          "baz": [10, 5, 0]}, index=["bar", "foo", "baz"])),
            expected)

    def test_submission_movement_metadata(self):
        # setup - mock attributes
        setattr(self.data, "_df_metadata_sub",
                pd.DataFrame({"Clade": ["A"], "Identifier": ["B"],
                              "Host": ["C"], "SlaughterDate": ["D"],
                              "Animal_Type": ["E"], "CPH": ["F"],
                              "CPH_Type": ["H"], "County": ["I"],
                              "RiskArea": ["J"], "Loc0": ["K"],
                              "OutsideHomeRange": ["L"]},
                             index=["Y"]))
        # setup - mock private methods
        self.data._submission_movdata = mock.Mock()
        self.data._get_lat_long = mock.Mock()
        self.data._transform_dateformat = \
            mock.Mock(side_effect=transform_dateformat_side_effect_func)
        # setup - return values for private method mocks
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
                    "species": "C", "slaughter_date": "D_transformed", "animal_type": "E",
                    "cph": "F", "cph_type": "H", "county": "I",
                    "risk_area": "J", "out_of_homerange": "L", "move":
                        {"0": {"cph": "J", "lat": 1, "lon": 4, "on_date": "S_transformed",
                               "off_date": "Z_transformed", "stay_length": "V",
                               "type": "P", "county": "M"},
                         "1": {"cph": "O", "lat": 2, "lon": 5, "on_date": "T_transformed",
                               "off_date": "AA_transformed", "stay_length": "W",
                               "type": "Q", "county": "N"},
                         "2": {"cph": "T", "lat": 3, "lon": 6, "on_date": "U_transformed",
                               "off_date": "AB_transformed", "stay_length": "X",
                               "type": "R", "county": "O"}}}
        # test expected output
        self.assertDictEqual(self.data.submission_movement_metadata(),
                             expected)
        # assert mock calls
        self.data._get_lat_long.assert_called_once_with({"J", "O", "T"})

    def test_related_submission_metadata(self):
        # setup - mock attributes
        setattr(self.data, "_submission", "foo_sub")
        # setup - mock private methods
        self.data._related_snp_matrix = mock.Mock()
        self.data._submission_metadata = mock.Mock()
        self.data._get_lat_long = mock.Mock()
        self.data._geo_distance = mock.Mock()
        self.data._transform_dateformat = \
            mock.Mock(side_effect=transform_dateformat_side_effect_func)
        # setup - return values for private method mocks
        self.data._related_snp_matrix.return_value = \
            pd.DataFrame({"foo_sub": [0, 3],
                          "bar_sub": [3, 0]},
                         index=["foo_sub", "bar_sub"])
        self.data._submission_metadata.return_value = \
            pd.DataFrame({"Identifier": ["foo_id", "bar_id"],
                          "SlaughterDate": ["foo_date", "bar_date"],
                          "CPH": ["J", "O"], "Host": ["COW", "COW"],
                          "Clade": ["foo_clade", "bar_clade"]},
                         index=["foo_sub", "bar_sub"])
        self.data._get_lat_long.return_value = \
            pd.DataFrame({"Lat": [1, 2], "Long": [4, 5], "x": [1, 2],
                          "y": [4, 5]}, index=["J", "O"])
        self.data._geo_distance.side_effect = [0.0, 1.1]
        # expected output
        expected = \
            {"foo_sub": {"cph": "J", "lat": 1, "lon": 4, "snp_distance": 0,
                         "animal_id": "foo_id", "clade": "foo_clade",
                         "slaughter_date": "foo_date_transformed", "distance": 0.0},
             "bar_sub": {"cph": "O", "lat": 2, "lon": 5, "snp_distance": 3,
                         "animal_id": "bar_id", "clade": "bar_clade",
                         "slaughter_date": "bar_date_transformed", "distance": 1.1},
             "SOI": "foo_sub"}
        # test expected output
        self.assertDictEqual(
            self.data.related_submissions_metadata(3), expected)
        # assert mock calls
        self.data._submission_metadata.assert_called_once_with(["foo_sub",
                                                                "bar_sub"])
        self.data._get_lat_long.assert_called_once_with({"O", "J"})
        self.data._geo_distance.assert_has_calls([mock.call((1, 4)),
                                                  mock.call((2, 5))])

    def test_snp_matrix(self):
        # setup - mock attributes
        setattr(self.data, "_submission", "foo_sub")
        setattr(self.data, "_df_metadata_sub",
                pd.DataFrame({"Identifier": ["foo_id"]}))
        # setup - mock private methods
        self.data._related_snp_matrix = mock.Mock()
        # setup - return values for private method mocks
        self.data._related_snp_matrix.return_value = \
            pd.DataFrame({"foo_sub": [0, 3],
                          "bar_sub": [3, 0]},
                         index=["foo_sub", "bar_sub"])
        # expected output
        expected = {"soi": "foo_sub",
                    "identifier": "foo_id",
                    "sampleIDs": ["foo_sub", "bar_sub"],
                    "matrix": [["foo_sub", "foo_sub", 0],
                               ["foo_sub", "bar_sub", 3],
                               ["bar_sub", "foo_sub", 3],
                               ["bar_sub", "bar_sub", 0]]}
        # test expected output
        self.assertDictEqual(self.data.snp_matrix(3), expected)
        # assert mock calls


if __name__ == "__main__":
    unittest.main()
