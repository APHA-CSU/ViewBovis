"""
    First start at some end-to-end tests. Need to ensure the the app is
    running connecting to the test database,
    i.e. python deploy.py --data_path e2e_test_data/
"""

import unittest
import time

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common import exceptions

CHROMEDRIVER_PATH = "/usr/local/bin/chromedriver"


class E2ETests(unittest.TestCase):

    def setUp(self):
        # setup chromedriver
        s = Service(CHROMEDRIVER_PATH)
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--window-size=1920,1080")
        chrome_options.add_argument("--no-sandbox")
        # start chromedriver
        self.driver = webdriver.Chrome(service=s, options=chrome_options)
        # connect to ViewBovis
        self.driver.get("http://127.0.0.1:5000")
        # pass security modal
        security_modal = self.driver.find_element(By.ID, "checkbox--agree")
        security_modal.click()
        self.wait = WebDriverWait(self.driver, 10)

    def tearDown(self) -> None:
        self.driver.close()

    def test_snp_map_setup(self):
        # navigate to snp map
        snp_dist_btn = self.driver.find_element(By.ID, "snp_distance_tab")
        snp_dist_btn.click()
        snp_map_btn = self.driver.find_element(By.ID, "btn-view-snpmap")
        snp_map_btn.click()
        # search for related samples within 1 SNP of "a_id"
        search_box = self.driver.find_element(By.ID, "input__sampleID_temp--1")
        search_box.send_keys("a_id")
        snp_distance = self.driver.find_element(By.ID, "snp-distance-value")
        self.driver.execute_script("arguments[0].textContent = arguments[1];",
                                   snp_distance, "5")
        plot_isolates_btn = \
            self.driver.find_element(By.ID, "btn__plot-related-isolates")
        plot_isolates_btn.click()
        # show the table
        show_table_btn = self.driver.find_element(By.ID, "show-table")
        show_table_btn.click()
        # get table rows
        table = \
            self.wait.until(
                EC.visibility_of_element_located((By.XPATH,
                                                  "//div[@class='tabulator-table']")))
        rows = table.find_elements(By.XPATH, ".//div[@role='row']")
        rows_dict = {}
        # loop through rows
        for row in rows:
            # get the submission element for the row
            sub_element = row.find_element(By.XPATH,
                                           ".//div[@tabulator-field='submission']")
            rows_dict[sub_element.text] = row
        # loop through clickable rows (with associated map icons)
        for sub in ["b", "c", "d"]:
            # locate the associated submission on the map
            map_sub_div_element = \
                self.driver.find_element(By.XPATH,
                                         f"//div[@class='awesome-number-marker-icon-gray awesome-number-marker marker-{sub}_submission leaflet-zoom-animated leaflet-interactive']")
            related_icon_number = map_sub_div_element.find_element(By.TAG_NAME, "i")
            # assert icon number is white, i.e. not selected
            self.assertEqual(related_icon_number.get_attribute("style"), "color: white;")
            # hacky way to ensure that the row is in clickable state - will
            # try to click 10 times over the space of 1 second, if still not
            # clickable on the 10th try an Exception is raised.
            for _ in range(9):
                try:
                    rows_dict[f"{sub}_submission"].click()
                    break
                except exceptions.ElementClickInterceptedException:
                    time.sleep(0.1)
                rows_dict[f"{sub}_submission"].click()
            # assert that the related isolate number has changed colour
            related_icon_number = \
                map_sub_div_element.find_element(By.TAG_NAME, "i")
            self.assertEqual(related_icon_number.get_attribute("style"),
                             "color: rgb(255, 190, 51);")


if __name__ == "__main__":
    unittest.main()