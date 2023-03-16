from setuptools import setup, find_packages
from shutil import rmtree

NAME = "viewbovis_data"

# setup
setup(name=NAME,
      url="https://github.com/aphascience/ViewBovis",
      install_requires=["flask==2.2.2", "pandas==1.5.3"],
      packages=find_packages())

# remove build and metadata
rmtree(f"{NAME}.egg-info", ignore_errors=True)
rmtree("dist", ignore_errors=True)
rmtree("build", ignore_errors=True)