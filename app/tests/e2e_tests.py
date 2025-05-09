"""
    First start at some end-to-end tests. Need to ensure the the app is
    running connecting to the test database,
    i.e. python deploy.py --data_path test_data/
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
API_URL = "http://127.0.0.1:5000"


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
        self.driver.get(API_URL)
        # pass security modal
        security_modal = self.driver.find_element(By.ID, "checkbox--agree")
        security_modal.click()
        self.wait = WebDriverWait(self.driver, 10)

    def tearDown(self) -> None:
        self.driver.close()

    def test_snp_map(self):
        time.sleep(10.0)
        soi = "a"
        related_plots = ["b", "c", "d"]
        related_nonplots = ["e", "f"]
        distant_relations = ["g", "h"]
        # navigate to snp map
        snp_dist_btn = self.wait.until(EC.element_to_be_clickable((By.ID,"snp_distance_tab")))
        snp_dist_btn.click()
        # search for related samples within 5 SNP of "a_id"
        search_box = self.driver.find_element(By.ID, "input__sampleID_temp--1")
        search_box.send_keys(f"{soi}_id")
        snp_distance = self.driver.find_element(By.ID, "snp-distance-value")
        #Required value for snp_distance input slider is 5
        #React slider state updates only on user actions
        #click operation sets the snp distance to 5
        snp_distance.click()
        plot_isolates_btn = \
            self.driver.find_element(By.ID, "btn__plot-related-isolates")
        plot_isolates_btn.click()
        # show the table
        show_table_btn = self.driver.find_element(By.ID, "btn__show-table")
        show_table_btn.click()
        # get table rows
        table = \
            self.wait.until(
                EC.visibility_of_element_located((By.ID,
                                                  "table-sidebar-container")))
        #continue find element method after the table transit animation
        time.sleep(10.0)
        rows = table.find_elements(By.XPATH, ".//div[@role='row']")
        # build a dictionary with key as the isolated submission number
        # and value as the row element
        rows_dict = {}
        # loop through rows
        for row in rows:
            # get the submission element for the row
            sub_element = row.find_element(By.XPATH,
                                           ".//div[@tabulator-field='submission']")
            rows_dict[sub_element.text] = row
        # assert distantly related isolates are not included
        for sub in distant_relations:
            self.assertNotIn(f"{sub}_submission", rows_dict.keys())
        # assert the SOI row is not clickable
        self.assertIn("tabulator-unselectable",
                      rows_dict[f"{soi}_submission"].get_attribute("class"),
                      "SOI row is selectable!")
        # assert rows for submissions with missing location data are not
        # clickable
        for sub in related_nonplots:
            self.assertIn("tabulator-unselectable",
                          rows_dict[f"{sub}_submission"].get_attribute("class"),
                          "Non location row is selectable!")
        # assert the SOI row is highlighted
        self.assertIn("rgb(255, 190, 51)",
                      rows_dict[f"{soi}_submission"].get_attribute("style"),
                      "SOI row is not highlighted!")
        # loop through clickable rows (related isolates with associated
        # map icons)
        for sub in related_plots:
            # locate the associated submission on the map
                map_sub_div_element = \
                    self.driver.find_element(By.XPATH,
                                         f"//div[@class='leaflet-marker-icon number-marker-related marker-{sub}_submission leaflet-zoom-animated leaflet-interactive']")
                # assert that the filter is not applied to the marker icon
                self.assertNotEqual("filter: 'drop-shadow(rgb(255, 190, 51) 0px 0px 6px) drop-shadow(rgb(255, 190, 51) 0px 0px 6px) drop-shadow(rgb(255, 190, 51) 0px 0px 8px)';", map_sub_div_element.get_attribute("style"))
                # hacky way to ensure that the row is clickable: will try to
                # click 10 times over 1 second, if still not clickable on
                # the 10th try an Exception is raised.
                for _ in range(9):
                    try:
                        rows_dict[f"{sub}_submission"].click()
                        break
                    except exceptions.ElementClickInterceptedException:
                        time.sleep(0.1)
                    rows_dict[f"{sub}_submission"].click()
                self.assertIn("rgb(255, 190, 51)",
                            map_sub_div_element.get_attribute("style"),
                            "Correct map icon not highlighted!")
                if sub == "c":
                #todo - clustered icons
                    # click the map icon - make pop-up visible
                    map_sub_div_element.click()
                    # assert the pop-up contents
                    pop_up_header = self.wait.until(
                    EC.visibility_of_element_located((By.ID,
                                                    f"popup_header_{sub}_id")))
                    self.assertEqual(f"{sub}_id", pop_up_header.text)
                    # click the close button in the popup to make pop-up go away
                    self.driver.execute_script("document.getElementsByClassName('leaflet-popup-close-button')[0].click()")
                    self.wait.until(EC.invisibility_of_element(pop_up_header))
        # assert that submissions without location data are not plotted
        # on the map
        for sub in related_nonplots + distant_relations:
            try:
                map_sub_div_element = \
                    self.driver.find_element(By.XPATH,
                                             f"//div[@class='leaflet-marker-icon number-marker-related marker-{sub}_submission leaflet-zoom-animated leaflet-interactive']")
                self.fail("Unexpected isolate plotted on map!")
            except exceptions.NoSuchElementException:
                pass
    
    #todo - e2e test for cattlemovement page
    #todo - e2e test for nextstrain page


if __name__ == "__main__":
    unittest.main()
