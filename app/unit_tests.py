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


if __name__ == "__main__":
    unittest.main()
