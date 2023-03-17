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
        self.data._submission_metadata = mock.Mock()
        self.data._clean_metadata = mock.Mock(wraps=lambda x: x)
        self.data._submission_metadata.return_value = \
            pd.DataFrame({"Clade": ["D"],
                          "Identifier": ["G"],
                          "Host": ["J"],
                          "SlaughterDate": ["M"],
                          "CPH": ["P"],
                          "CPHH": ["S"],
                          "CPH_Type": ["V"],
                          "County": ["Y"],
                          "RiskArea": ["AB"],
                          "Loc0": ["AE"],
                          "Loc0_Type": ["AH"],
                          "Loc0_StartDate": ["AK"],
                          "Loc0_Duration": ["AN"],
                          "Loc0_EndDate": ["AQ"],
                          "Loc1": ["AT"],
                          "Loc1_Type": ["AW"],
                          "Loc1_StartDate": ["AZ"],
                          "Loc1_Duration": ["BC"],
                          "Loc1_EndDate": ["BF"],
                          "Loc2": ["BI"],
                          "Loc2_Type": ["BL"],
                          "Loc2_StartDate": ["BO"],
                          "Loc2_Duration": ["BR"],
                          "Loc2_EndDate": ["BU"]},
                         index=["A"])
        self.data._get_lat_long = mock.Mock()
        self.data._get_lat_long.return_value = \
            pd.DataFrame({"Lat": [1, 2, 3],
                          "Long": [10, 11, 12]},
                         index=["AE", "AT", "BI"])
        print(self.data.submission_movement_metadata("A"))


if __name__ == "__main__":
    unittest.main()
