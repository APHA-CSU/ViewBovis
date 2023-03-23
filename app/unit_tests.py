import unittest
from unittest import mock

import pandas as pd

from viewbovis_data import ViewBovisData


class TestViewBovisData(unittest.TestCase):

    def setUp(self):
        def mock_cursor():
            pass

        def mock_close():
            pass

        with mock.patch("viewbovis_data.sqlite3.connect") as mock_connect:
            mock_connect.return_value.cursor.return_value = mock_cursor()
            mock_connect.return_value.close.return_value = mock_close()
            self.data = ViewBovisData("foo_path")

    def tearDown(self) -> None:
        self.data.__del__()
        return super().tearDown()

    def test_clean_metadata(self):
        # test usual input
        df_test_input = pd.DataFrame({"A": [None], "B": [None], "C": [None],
                                      "D": [None], "E": [None], "F": [None],
                                      "G": [None], "H": [None], "I": [None],
                                      "J": [None], "K": ["foo"], "L": [None]})
        df_test_output = pd.DataFrame({"A": [None], "B": [None], "C": [None],
                                       "D": [None], "E": [None], "F": [None],
                                       "G": [None], "H": [None], "I": [None],
                                       "K": ["foo"]})
        pd.testing.assert_frame_equal(self.data._clean_metadata(df_test_input),
                                      df_test_output)
        # test exception
        df_test_input = pd.DataFrame({"A": [None, None]})
        with self.assertRaises(Exception):
            self.data._clean_metadata(df_test_input)

    def test_submission_movement_metadata(self):
        # setup - mock private methods
        self.data._get_lat_long = mock.Mock()
        self.data._submission_metadata = mock.Mock()
        self.data._clean_metadata = mock.Mock(wraps=lambda x: x)
        # setup - return values for private method mocks
        self.data._submission_metadata.return_value = \
            pd.DataFrame({"Clade": ["A"], "Identifier": ["B"], "Host": ["C"],
                          "SlaughterDate": ["D"], "CPH": ["E"], "CPHH": ["F"],
                          "CPH_Type": ["G"], "County": ["H"], "RiskArea": ["I"],
                          "Loc0": ["J"], "Loc0_Type": ["K"],
                          "Loc0_StartDate": ["L"], "Loc0_Duration": ["M"],
                          "Loc0_EndDate": ["N"], "Loc1": ["O"],
                          "Loc1_Type": ["P"], "Loc1_StartDate": ["Q"],
                          "Loc1_Duration": ["R"], "Loc1_EndDate": ["S"],
                          "Loc2": ["T"], "Loc2_Type": ["U"],
                          "Loc2_StartDate": ["V"], "Loc2_Duration": ["W"],
                          "Loc2_EndDate": ["X"]}, index=["Y"])
        self.data._get_lat_long.return_value = \
            pd.DataFrame({"Lat": [1, 2, 3], "Long": [4, 5, 6]},
                         index=["J", "O", "T"])
        # expected output
        expected = {"submission": "Y", "clade": "A", "identifier": "B",
                    "species": "C", "slaughter_date": "D", "cph": "E",
                    "cphh": "F", "cph_type": "G", "county": "H",
                    "risk_area": "I", "move":
                        {"0": {"lat": 1, "lon": 4, "on_date": "L",
                               "off_date": "N", "stay_length": "M",
                               "type": "K"},
                         "1": {"lat": 2, "lon": 5, "on_date": "Q",
                               "off_date": "S", "stay_length": "R",
                               "type": "P"},
                         "2": {"lat": 3, "lon": 6, "on_date": "V",
                               "off_date": "X", "stay_length": "W",
                               "type": "U"}}}
        # test expected output
        self.assertDictEqual(self.data.submission_movement_metadata("A"),
                             expected)

    @mock.patch("viewbovis_data.glob.glob")
    @mock.patch("viewbovis_data.pd.read_csv")
    def test_related_submission_metadata(self, mock_read_csv, mock_glob):
        # setup - return values for external mocks
        mock_glob.return_value = "mock_matrix_path"
        mock_read_csv.return_value = \
            pd.DataFrame({"foo": [0, 3, 5]}, index=["foo", "bar", "baz"])
        # setup - mock private methods
        self.data._submission_metadata = mock.Mock()
        self.data._submission_to_sample = mock.Mock()
        self.data._sample_to_submission = mock.Mock()
        self.data._get_lat_long = mock.Mock()
        # setup - return values for private method mocks
        self.data._submission_metadata.side_effect = \
            [pd.DataFrame({"Clade": ["A"]}, index=["foo"]),
             pd.DataFrame({"Identifier": ["foo_id", "bar_id"],
                           "SlaughterDate": ["foo_date", "bar_date"],
                           "CPH": ["J", "O"], "Host": ["COW", "COW"]},
                          index=["foo_sub", "bar_sub"])]
        self.data._submission_to_sample = mock.Mock(wraps=lambda x: x)
        self.data._sample_to_submission = mock.Mock(wraps=lambda x: f"{x}_sub")
        self.data._get_lat_long.return_value = \
            pd.DataFrame({"Lat": [1, 2, 3], "Long": [4, 5, 6]},
                         index=["J", "O", "T"])
        # expected output
        expected = \
            {"foo_sub": {"lat": 1, "lon": 4, "snp_distance": 0,
                         "animal_id": "foo_id", "date": "foo_date"},
             "bar_sub": {"lat": 2, "lon": 5, "snp_distance": 3,
                         "animal_id": "bar_id", "date": "bar_date"}}
        # test expected output
        self.assertDictEqual(
            self.data.related_submissions_metadata("foo", 3), expected)


if __name__ == "__main__":
    unittest.main()
