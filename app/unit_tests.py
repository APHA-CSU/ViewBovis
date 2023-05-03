import unittest
from unittest import mock

import pandas as pd
import numpy.testing as nptesting

from viewbovis_data import ViewBovisData, NoDataException, NoMetaDataException,\
                           NoWgsDataException, NonBovineException


class TestViewBovisData(unittest.TestCase):

    def setUp(self):
        ViewBovisData._db_connect = mock.Mock()
        ViewBovisData.__del__ = mock.Mock()

    def tearDown(self) -> None:
        self.data.__del__()
        return super().tearDown()

    @mock.patch("viewbovis_data.ViewBovisData._submission_metadata")
    @mock.patch("viewbovis_data.ViewBovisData._submission_wgs_metadata")
    @mock.patch("viewbovis_data.ViewBovisData._get_lat_long")
    def test_load_soi(self,
                      mock_get_lat_long,
                      mock_submission_wgs_metadata,
                      mock_submission_metadata):
        # setup - mock attributes
        setattr(ViewBovisData, "_db", "mock_db")
        mock_get_lat_long.return_value = pd.DataFrame({"lat": ["foo_lat"],
                                                       "long": ["foo_long"],
                                                       "x": ["foo_x"],
                                                       "y": ["foo_y"]})
        # test missing all data
        mock_submission_wgs_metadata.return_value = pd.DataFrame()
        mock_submission_metadata.return_value = pd.DataFrame()
        # assert NoDataException is raised
        with self.assertRaises(NoDataException):
            self.data = ViewBovisData("foo_path", "foo_id")
        # test missing WGS data
        mock_submission_metadata.return_value = \
            pd.DataFrame({"CPH": ["foo_cph"]}, index=["foo_index"])
        self.data = ViewBovisData("foo_path", "foo_id")
        self.assertEqual(self.data._submission, "foo_index")
        self.assertEqual(self.data._xy, ("foo_x", "foo_y"))
        self.assertEqual(self.data._sample_name, None)
        # testing missing metadata
        mock_submission_metadata.return_value = pd.DataFrame()
        mock_submission_wgs_metadata.return_value = \
            pd.DataFrame({"Sample": ["foo_sample"]}, index=["foo_index"])
        self.data = ViewBovisData("foo_path", "foo_id")
        self.assertEqual(self.data._submission, "foo_index")
        self.assertEqual(self.data._xy, None)
        self.assertEqual(self.data._sample_name, "foo_sample")
        # test no missing data
        mock_submission_metadata.return_value = \
            pd.DataFrame({"CPH": ["foo_cph"]}, index=["foo_index"])
        self.data = ViewBovisData("foo_path", "foo_id")
        self.assertEqual(self.data._submission, "foo_index")
        self.assertEqual(self.data._xy, ("foo_x", "foo_y"))
        self.assertEqual(self.data._sample_name, "foo_sample")

    @mock.patch("viewbovis_data.ViewBovisData._load_soi")
    @mock.patch("viewbovis_data.glob.glob")
    @mock.patch("viewbovis_data.pd.read_csv")
    def test_related_snp_matrix(self, mock_read_csv, mock_glob, _):
        self.data = ViewBovisData("foo_path", "foo_id")
        # setup - mock attributes
        setattr(self.data, "_df_wgs_metadata_soi",
                pd.DataFrame({"group": ["foo_clade"]}, index=["foo_index"]))
        setattr(self.data, "_matrix_dir", "mock_matrix_dir")
        setattr(self.data, "_sample_name", "foo")
        # setup - mock private methods
        self.data._sample_to_submission = mock.Mock(wraps=lambda x: f"{x}_sub")
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
        # assert exception
        setattr(self.data, "_df_wgs_metadata_soi", pd.DataFrame())
        with self.assertRaises(NoWgsDataException):
            self.data._related_snp_matrix(1)

    @mock.patch("viewbovis_data.ViewBovisData._load_soi")
    def test_submission_movement_metadata(self, _):
        self.data = ViewBovisData("foo_path", "foo_id")
        # setup - mock attributes
        setattr(self.data, "_df_metadata_soi",
                pd.DataFrame({"Clade": ["A"], "Identifier": ["B"],
                              "Host": ["COW"], "SlaughterDate": ["D"],
                              "Animal_Type": ["E"], "CPH": ["F"],
                              "CPHH": ["G"], "CPH_Type": ["H"],
                              "County": ["I"], "RiskArea": ["J"],
                              "Loc0": ["K"], "OutsideHomeRange": ["L"]},
                             index=["Y"]))
        # setup - mock private methods
        self.data._submission_movdata = mock.Mock()
        self.data._get_lat_long = mock.Mock()
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
                    "species": "COW", "slaughter_date": "D", "animal_type": "E",
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
        self.assertDictEqual(self.data.submission_movement_metadata("cow"),
                             expected)
        # assert mock calls
        self.data._get_lat_long.assert_called_once_with({"J", "O", "T"})
        # assert exceptions
        setattr(self.data, "_df_metadata_soi", pd.DataFrame())
        with self.assertRaises(NoMetaDataException):
            self.data.submission_movement_metadata("cow")
        setattr(self.data, "_df_metadata_soi",
                pd.DataFrame({"Host": ["notCOW"]}, index=["Y"]))
        with self.assertRaises(NonBovineException):
            self.data.submission_movement_metadata("cow")

    @mock.patch("viewbovis_data.ViewBovisData._load_soi")
    def test_related_submission_metadata(self, _):
        self.data = ViewBovisData("foo_path", "foo_id")
        # setup - mock attributes
        setattr(self.data, "_submission", "foo_sub")
        # setup - mock private methods
        self.data._related_snp_matrix = mock.Mock()
        self.data._submission_metadata = mock.Mock()
        self.data._get_lat_long = mock.Mock()
        self.data._geo_distance = mock.Mock()
        # setup - return values for private method mocks
        self.data._related_snp_matrix.return_value = \
            pd.DataFrame({"foo_sub": [0, 3, 2],
                          "bar_sub": [3, 0, 10],
                          "baz_sub": [2, 10, 0]},
                         index=["foo_sub", "bar_sub", "baz_sub"])
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
                         "distance": 1.1},
             "baz_sub": {"lat": None, "lon": None, "snp_distance": 2,
                         "animal_id": None, "herd": None, "clade": None,
                         "date": None, "distance": None}}
        # test expected output
        self.assertDictEqual(
            self.data.related_submissions_metadata(3), expected)
        # assert mock calls
        self.data._submission_metadata.assert_called_once_with(["foo_sub",
                                                                "bar_sub",
                                                                "baz_sub"])
        self.data._get_lat_long.assert_called_once_with({"O", "J"})
        self.data._geo_distance.assert_has_calls([mock.call((1, 4)),
                                                  mock.call((2, 5))])

    @mock.patch("viewbovis_data.ViewBovisData._load_soi")
    def test_snp_matrix(self, _):
        self.data = ViewBovisData("foo_path", "foo_id")
        # setup - mock attributes
        setattr(self.data, "_submission", "foo_sub")
        # setup - mock private methods
        self.data._related_snp_matrix = mock.Mock()
        self.data._submission_metadata = mock.Mock()
        self.data._get_lat_long = mock.Mock()
        self.data._geo_distance = mock.Mock()
        # setup - return values for private method mocks
        self.data._related_snp_matrix.return_value = \
            pd.DataFrame({"foo_sub": [0, 3, 2],
                          "bar_sub": [3, 0, 10],
                          "baz_sub": [2, 10, 0]},
                         index=["foo_sub", "bar_sub", "baz_sub"])
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
            {"foo_sub": {"animal_id": "foo_id", "herd": "foo_herd",
                         "clade": "foo_clade", "date": "foo_date",
                         "distance": 0.0},
             "bar_sub": {"animal_id": "bar_id", "herd": "bar_herd",
                         "clade": "bar_clade", "date": "bar_date",
                         "distance": 1.1},
             "baz_sub": {"animal_id": None, "herd": None, "clade": None,
                         "date": None, "distance": None},
             "matrix": [['foo_sub', 'foo_sub', 0],
                        ['foo_sub', 'bar_sub', 3],
                        ['foo_sub', 'baz_sub', 2],
                        ['bar_sub', 'foo_sub', 3],
                        ['bar_sub', 'bar_sub', 0],
                        ['bar_sub', 'baz_sub', 10],
                        ['baz_sub', 'foo_sub', 2],
                        ['baz_sub', 'bar_sub', 10],
                        ['baz_sub', 'baz_sub', 0]]}
        # test expected output
        self.assertDictEqual(self.data.snp_matrix(3), expected)
        # assert mock calls
        self.data._submission_metadata.assert_called_once_with(["foo_sub",
                                                                "bar_sub",
                                                                "baz_sub"])
        self.data._get_lat_long.assert_called_once_with({"O", "J"})
        self.data._geo_distance.assert_has_calls([mock.call((1, 4)),
                                                  mock.call((2, 5))])


if __name__ == "__main__":
    unittest.main()
