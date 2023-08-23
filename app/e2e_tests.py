import unittest

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

CHROMEDRIVER_PATH = "/usr/local/bin/chromedriver"


class E2ETests(unittest.TestCase):

    def setUp(self):
        s = Service(CHROMEDRIVER_PATH)
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--window-size=1920,1080")
        chrome_options.add_argument("--no-sandbox")
        self.driver = webdriver.Chrome(service=s, options=chrome_options)
        self.driver.get("http://127.0.0.1:5000")

    def tearDown(self) -> None:
        self.driver.close()

    def test_snp_map(self):
        security_modal = self.driver.find_element(By.ID, "checkbox--agree")
        security_modal.click()
        snp_dist_btn = self.driver.find_element(By.ID, "snp_distance_tab")
        snp_dist_btn.click()
        snp_map_btn = self.driver.find_element(By.ID, "btn-view-snpmap")
        snp_map_btn.click()
        search_box = self.driver.find_element(By.ID, "input__sampleID_temp--1")
        search_box.send_keys("a_id")
        snp_distance = self.driver.find_element(By.ID, "snp-distance-value")
        self.driver.execute_script("arguments[0].textContent = arguments[1];",
                                   snp_distance, "1")
        plot_isolates_btn = \
            self.driver.find_element(By.ID, "btn__plot-related-isolates")
        plot_isolates_btn.click()
        wait = WebDriverWait(self.driver, 10)
        soi_icon = \
            wait.until(EC.visibility_of_any_elements_located((By.XPATH,
                       "//div[@class='awesome-number-marker-icon-gray awesome-number-marker marker-b_submission leaflet-zoom-animated leaflet-interactive']")))
        self.assertEquals(soi_icon[0].get_attribute("style"),
                          "margin-left: -17px; margin-top: -42px; width: 35px; height: 45px; transform: translate3d(780px, 456px, 0px); z-index: 456; outline: none;")


if __name__ == "__main__":
    unittest.main()
