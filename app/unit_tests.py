import unittest
from unittest import mock

import pandas as pd
import pandas.testing as pdtesting
import numpy.testing as nptesting

from viewbovis_data import Request, NoDataException, NoMetaDataException, \
                           NoWgsDataException, NonBovineException, \
                           ExcludedSubmissionException


def transform_dateformat_side_effect_func(value):
    return f"{value}_transformed"


class TestRequest(unittest.TestCase):

    def setUp(self):
        Request._db_connect = mock.Mock()
        Request.__del__ = mock.Mock()

    def tearDown(self) -> None:
        self.request.__del__()
        return super().tearDown()

    @mock.patch("viewbovis_data.Request._query_metadata")
    @mock.patch("viewbovis_data.Request._query_wgs_metadata")
    @mock.patch("viewbovis_data.Request._get_os_map_ref")
    def test_load_soi(self,
                      mock_get_os_map_ref,
                      mock_query_wgs_metadata,
                      mock_query_metadata):
        # setup - mock attributes
        setattr(Request, "_db", "mock_db")
        mock_get_os_map_ref.return_value = pd.DataFrame({"lat": ["foo_lat"],
                                                         "long": ["foo_long"],
                                                         "x": ["foo_x"],
                                                         "y": ["foo_y"]})

        # test missing all data
        mock_query_wgs_metadata.return_value = pd.DataFrame()
        mock_query_metadata.return_value = pd.DataFrame()
        # assert NoDataException is raised
        with self.assertRaises(NoDataException):
            self.request = Request("foo_path", "foo_id")

        # test missing WGS data
        mock_query_metadata.return_value = \
            pd.DataFrame({"CPH": ["foo_cph"]}, index=["foo_index"])
        self.request = Request("foo_path", "foo_id")
        self.assertEqual("foo_index", self.request._submission)
        self.assertEqual(("foo_x", "foo_y"), self.request._xy)
        self.assertEqual(None, self.request._sample_name)

        # testing missing metadata
        mock_query_metadata.return_value = pd.DataFrame()
        mock_query_wgs_metadata.return_value = \
            pd.DataFrame({"Sample": ["foo_sample"]}, index=["foo_index"])
        self.request = Request("foo_path", "foo_id")
        self.assertEqual("foo_index", self.request._submission)
        self.assertEqual(None, self.request._xy)
        self.assertEqual("foo_sample", self.request._sample_name)

        # test no missing data
        mock_query_metadata.return_value = \
            pd.DataFrame({"CPH": ["foo_cph"]}, index=["foo_index"])
        self.request = Request("foo_path", "foo_id")
        self.assertEqual("foo_index", self.request._submission)
        self.assertEqual(("foo_x", "foo_y"), self.request._xy)
        self.assertEqual("foo_sample", self.request._sample_name)

    @mock.patch("viewbovis_data.Request._load_soi")
    @mock.patch("viewbovis_data.glob.glob")
    @mock.patch("viewbovis_data.pd.read_csv")
    def test_related_snp_matrix(self, mock_read_csv, mock_glob, _):
        # setup - instantiate request object
        self.request = Request("foo_path", "foo_id")

        # setup - mock attributes
        setattr(self.request, "_df_wgs_metadata_soi",
                pd.DataFrame({"group": ["foo_clade"]}, index=["foo_index"]))
        setattr(self.request, "_matrix_dir", "mock_matrix_dir")
        setattr(self.request, "_sample_name", "foo")
        setattr(self.request, "_submission", "foo_sub")

        # setup - mock private methods
        self.request._sample_to_submission = mock.Mock(wraps=lambda x: f"{x}_sub")
        self.request._sort_matrix = mock.Mock(wraps=lambda x: x)

        # setup - return values for external mocks
        mock_read_csv.return_value = \
            pd.DataFrame({"foo": [0, 3, 5],
                          "bar": [3, 0, 10],
                          "baz": [5, 10, 0]},
                         index=["foo", "bar", "baz"]).rename_axis("snp-dists")
        mock_glob.return_value = "mock_matrix_path"

        # test normal operation
        # expected output
        expected = pd.DataFrame({"foo_sub": [0, 3], "bar_sub": [3, 0]},
                                index=["foo_sub", "bar_sub"])
        true_output = self.request._related_snp_matrix(3)
        nptesting.assert_array_equal(expected, true_output)
        self.assertEqual(None, true_output.index.name)

        # test missing WGS data
        setattr(self.request, "_df_wgs_metadata_soi", pd.DataFrame())
        with self.assertRaises(NoWgsDataException):
            self.request._related_snp_matrix(1)

    @mock.patch("viewbovis_data.Request._load_soi")
    def test_soi_metadata(self, _):
        # setup - instantiate request object
        self.request = Request("foo_path", "foo_id")

        # setup - mock attributes
        setattr(self.request, "_df_metadata_soi",
                pd.DataFrame({"Clade": ["A"], "Identifier": ["B"],
                              "Host": ["COW"], "SlaughterDate": ["D"],
                              "Animal_Type": ["E"], "CPH": ["F"],
                              "CPH_Type": ["H"], "County": ["I"],
                              "RiskArea": ["J"], "Loc0": ["K"],
                              "OutsideHomeRange": ["L"], "wsdBirthDate": ["M"],
                              "Gender": ["N"], "Disclosing_Test": ["O"],
                              "Import_Country": ["P"]},
                             index=["Y"]))
        setattr(self.request, "_df_wgs_metadata_soi",
                pd.DataFrame({"group": ["A"]}, index=["Y"]))

        # setup - mock private methods
        self.request._transform_dateformat = \
            mock.Mock(side_effect=transform_dateformat_side_effect_func)

        # test normal operation
        # expected output
        expected = {"submission": "Y", "clade": "A", "identifier": "B",
                    "species": "COW", "animal_type": "E",
                    "slaughter_date": "D_transformed", "cph": "F",
                    "cph_type": "H", "county": "I", "risk_area": "J",
                    "out_of_homerange": "L", "dob": "M_transformed",
                    "sex": "N", "disclosing_test": "O", "import_country": "P"}
        # test expected output
        self.assertDictEqual(expected, self.request.soi_metadata())
        # assert mock calls
        self.request._transform_dateformat.assert_has_calls([mock.call("D"),
                                                             mock.call("M")])
        self.request._transform_dateformat.reset_mock()

        # setup - mock attributes - missing dates
        setattr(self.request, "_df_metadata_soi",
                pd.DataFrame({"Clade": ["A"], "Identifier": ["B"],
                              "Host": ["COW"], "SlaughterDate": ["D"],
                              "Animal_Type": ["E"], "CPH": ["F"],
                              "CPH_Type": ["H"], "County": ["I"],
                              "RiskArea": ["J"], "Loc0": ["K"],
                              "OutsideHomeRange": ["L"], "wsdBirthDate": None,
                              "Gender": ["N"], "Disclosing_Test": ["O"],
                              "Import_Country": ["P"]},
                             index=["Y"]))
        # test normal operation
        # expected output
        expected = {"submission": "Y", "clade": "A", "identifier": "B",
                    "species": "COW", "animal_type": "E",
                    "slaughter_date": "D_transformed", "cph": "F",
                    "cph_type": "H", "county": "I", "risk_area": "J",
                    "out_of_homerange": "L", "dob": None, "sex": "N",
                    "disclosing_test": "O", "import_country": "P"}
        # test expected output
        self.assertDictEqual(expected, self.request.soi_metadata())
        # assert mock calls
        self.request._transform_dateformat.assert_called_once_with("D")

        # setup - mock attributes - missing metadata
        setattr(self.request, "_df_metadata_soi", pd.DataFrame())
        # test normal operation
        # expected output
        expected = {"submission": "Y", "clade": "A", "identifier": None,
                    "species": None, "animal_type": None,
                    "slaughter_date": None, "cph": None, "cph_type": None,
                    "county": None, "risk_area": None, "out_of_homerange": None,
                    "dob": None, "sex": None, "disclosing_test": None,
                    "import_country": None}
        # test expected output
        self.assertDictEqual(expected, self.request.soi_metadata())

        # test missing WGS data
        # assert exception
        setattr(self.request, "_df_wgs_metadata_soi", pd.DataFrame())
        setattr(self.request, "_excluded", None)
        with self.assertRaises(NoWgsDataException):
            self.request.soi_metadata()

        # test excluded sample
        # assert exception
        setattr(self.request, "_df_wgs_metadata_soi", pd.DataFrame())
        setattr(self.request, "_excluded", "impureCulture")
        with self.assertRaises(ExcludedSubmissionException):
            self.request.soi_metadata()

    @mock.patch("viewbovis_data.Request._load_soi")
    def test_soi_movement_metadata(self, _):
        # setup - instantiate request object
        self.request = Request("foo_path", "foo_id")

        # setup - mock attributes
        setattr(self.request, "_df_metadata_soi",
                pd.DataFrame({"Host": ["COW"]}))
        setattr(self.request, "_df_wgs_metadata_soi",
                pd.DataFrame({"group": ["A"]}))
        setattr(self.request, "_submission", "Y")

        # setup - mock private methods
        self.request.soi_metadata = mock.Mock()
        self.request._query_movdata = mock.Mock()
        self.request._get_os_map_ref = mock.Mock()
        self.request._transform_dateformat = \
            mock.Mock(side_effect=transform_dateformat_side_effect_func)

        # setup - return values for public & private method mocks
        self.request.soi_metadata.return_value = \
            {"submission": "Y", "clade": "A", "identifier": "B",
             "species": "COW", "animal_type": "E", "slaughter_date": "D",
             "cph": "F", "cph_type": "H", "county": "I", "risk_area": "J",
             "out_of_homerange": "L", "dob": "M", "sex": "N",
             "disclosing_test": "O", "import_country": "P"}
        self.request._query_movdata.return_value = \
            pd.DataFrame({"Loc_Num": [0, 1, 2], "Loc": ["J", "O", "T"],
                          "County": ["M", "N", "O"],
                          "CPH_Type": ["P", "Q", "R"],
                          "Loc_StartDate": ["S", "T", "U"],
                          "Loc_Duration": ["V", "W", "X"],
                          "Loc_EndDate": ["Z", "AA", "AB"],
                          "Area_At_Movement": ["AC", "AD", "AE"],
                          "Current_Area": ["AF", "AG", "AH"]},
                         index=["Y", "Y", "Y"])
        self.request._get_os_map_ref.return_value = \
            pd.DataFrame({"Lat": [1, 2, 3], "Long": [4, 5, 6],
                          "OSMapRef": ["foo_ref", "bar_ref", "baz_ref"]},
                         index=["J", "O", "T"])

        # test normal operation
        # expected output
        expected = {"submission": "Y", "clade": "A", "identifier": "B",
                    "species": "COW", "slaughter_date": "D", "animal_type": "E",
                    "cph": "F", "cph_type": "H", "county": "I",
                    "risk_area": "J", "out_of_homerange": "L", "dob": "M",
                    "sex": "N", "disclosing_test": "O", "import_country": "P", "move":
                        {"0": {"cph": "J", "lat": 1, "lon": 4, "os_map_ref": "foo_ref",
                               "on_date": "S_transformed", "off_date": "Z_transformed",
                               "stay_length": "V", "type": "P", "county": "M",
                               "risk_area_at_move": "AC", "risk_area_current": "AF"},
                         "1": {"cph": "O", "lat": 2, "lon": 5, "os_map_ref": "bar_ref",
                               "on_date": "T_transformed", "off_date": "AA_transformed",
                               "stay_length": "W", "type": "Q", "county": "N",
                               "risk_area_at_move": "AD", "risk_area_current": "AG"},
                         "2": {"cph": "T", "lat": 3, "lon": 6, "os_map_ref": "baz_ref",
                               "on_date": "U_transformed", "off_date": "AB_transformed",
                               "stay_length": "X", "type": "R", "county": "O",
                               "risk_area_at_move": "AE", "risk_area_current": "AH"}}}
        # test expected output
        self.assertDictEqual(expected, self.request.soi_movement_metadata())
        # assert mock calls
        self.request._get_os_map_ref.assert_called_once_with({"J", "O", "T"})

        # test missing metadata
        # assert exception
        setattr(self.request, "_df_metadata_soi", pd.DataFrame())
        with self.assertRaises(NoMetaDataException):
            self.request.soi_movement_metadata()

        # test not a cow
        # assert exception
        setattr(self.request, "_df_metadata_soi",
                pd.DataFrame({"Host": ["notCOW"]}, index=["Y"]))
        with self.assertRaises(NonBovineException):
            self.request.soi_movement_metadata()

    @mock.patch("viewbovis_data.Request._load_soi")
    def test_sort_matrix(self, _):
        # setup - instantiate request object
        self.request = Request("foo_path", "foo_id")

        # setup - mock attributes
        setattr(self.request, "_submission", "foo")

        # test normal operation
        # expected output
        expected = pd.DataFrame({"foo": [0, 3, 5],
                                 "bar": [3, 0, 10],
                                 "baz": [5, 10, 0]},
                                index=["foo", "bar", "baz"])
        pdtesting.assert_frame_equal(expected, self.request._sort_matrix(
            pd.DataFrame({"bar": [0, 3, 10],
                          "foo": [3, 0, 5],
                          "baz": [10, 5, 0]}, index=["bar", "foo", "baz"])))

    @mock.patch("viewbovis_data.Request._load_soi")
    def test_related_submissions_metadata(self, _):
        # setup - instantiate request object
        self.request = Request("foo_path", "foo_id")

        # setup - mock attributes
        setattr(self.request, "_submission", "foo_sub")
        setattr(self.request, "_df_metadata_soi",
                pd.DataFrame({"foo": ["bar"]}))
        setattr(self.request, "_xy", (1, 2))

        # setup - mock private methods
        self.request._related_snp_matrix = mock.Mock()
        self.request._query_metadata = mock.Mock()
        self.request._get_os_map_ref = mock.Mock()
        self.request._geo_distance = mock.Mock()
        self.request._transform_dateformat = \
            mock.Mock(side_effect=transform_dateformat_side_effect_func)

        # setup - return values for private method mocks
        self.request._related_snp_matrix.return_value = \
            pd.DataFrame({"foo_sub": [0, 3, 1],
                          "bar_sub": [3, 0, 2],
                          "baz_sub": [1, 2, 0]},
                         index=["foo_sub", "bar_sub", "baz_sub"])
        self.request._query_metadata.return_value = \
            pd.DataFrame({"Identifier": ["foo_id", "bar_id"],
                          "SlaughterDate": ["foo_date", None],
                          "CPH": ["J", None], "Host": ["COW", "COW"],
                          "Clade": ["foo_clade", "bar_clade"],
                          "Animal_Type": ["J", "K"],
                          "OutsideHomeRange": ["L", "M"],
                          "wsdBirthDate": ["N", None],
                          "Gender": ["P", "Q"], "Disclosing_Test": ["R", "S"],
                          "Import_Country": ["T", "U"]},
                         index=["foo_sub", "bar_sub"])
        self.request._get_os_map_ref.return_value = \
            pd.DataFrame({"x": [1, 2], "y": [4, 5], "Lat": [1, 2],
                          "Long": [4, 5], "OSMapRef": ["foo_ref", "bar_ref"]},
                         index=["J", "O"])
        self.request._geo_distance.side_effect = [1.1, 0.0]

        # test normal operation
        # expected output
        expected = \
            {"foo_sub": {"cph": "J", "lat": 1, "lon": 4, "os_map_ref": "foo_ref",
                         "snp_distance": 0, "animal_id": "foo_id",
                         "species": "COW", "animal_type": "J", "clade": "foo_clade",
                         "slaughter_date": "foo_date_transformed", "sex": "P",
                         "disclosing_test": "R", "dob": "N_transformed",
                         "import_country": "T", "distance": 1.1},
             "bar_sub": {"cph": None, "lat": None, "lon": None, "os_map_ref": None,
                         "snp_distance": 3, "animal_id": "bar_id",
                         "species": "COW", "animal_type": "K", "clade": "bar_clade",
                         "slaughter_date": None, "sex": "Q",
                         "disclosing_test": "S", "dob": None,
                         "import_country": "U", "distance": None},
             "baz_sub": {"cph": None, "lat": None, "lon": None, "os_map_ref": None,
                         "snp_distance": 1, "animal_id": None, "species": None,
                         "animal_type": None, "clade": None, "slaughter_date": None,
                         "sex": None, "disclosing_test": None, "dob": None,
                         "import_country": None, "distance": None},
             "SOI": "foo_sub"}
        # test expected output
        self.assertDictEqual(expected,
            self.request.related_submissions_metadata(3))
        # assert mock calls
        self.request._query_metadata.assert_called_once_with(["foo_sub",
                                                              "bar_sub",
                                                              "baz_sub"])
        self.request._get_os_map_ref.assert_called_once_with({None, "J"})
        self.request._geo_distance.assert_called_once_with((1, 4))

        # test missing metadata
        setattr(self.request, "_df_metadata_soi", pd.DataFrame())
        # assert NoMetaDataException
        with self.assertRaises(NoMetaDataException):
            self.request.related_submissions_metadata(1)
        # test missing cph
        setattr(self.request, "_xy", None)
        # assert NoMetaDataException
        with self.assertRaises(NoMetaDataException):
            self.request.related_submissions_metadata(1)

    @mock.patch("viewbovis_data.Request._load_soi")
    def test_snp_matrix(self, _):
        # setup - instantiate request object
        self.request = Request("foo_path", "foo_id")

        # setup - mock attributes
        setattr(self.request, "_submission", "foo_sub")
        setattr(self.request, "_df_metadata_soi",
                pd.DataFrame({"Identifier": ["foo_id"]}))

        # setup - mock private methods
        self.request._related_snp_matrix = mock.Mock()

        # setup - return values for private method mocks
        self.request._related_snp_matrix.return_value = \
            pd.DataFrame({"foo_sub": [0, 3],
                          "bar_sub": [3, 0]},
                         index=["foo_sub", "bar_sub"])

        # test normal operation
        # expected output
        expected = {"soi": "foo_sub",
                    "identifier": "foo_id",
                    "sampleIDs": ["foo_sub", "bar_sub"],
                    "matrix": [["foo_sub", "foo_sub", 0],
                               ["foo_sub", "bar_sub", 3],
                               ["bar_sub", "foo_sub", 3],
                               ["bar_sub", "bar_sub", 0]]}
        # test expected output
        self.assertDictEqual(expected, self.request.snp_matrix(3))
        # assert mock calls
        self.request._related_snp_matrix.assert_called_once_with(3)


if __name__ == "__main__":
    unittest.main()
