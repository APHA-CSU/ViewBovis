import sqlite3
import glob
import calendar
import re
from datetime import datetime
from os import path

import numpy as np
import pandas as pd


class Request:
    def __init__(self, data_path: str, id: str):
        self._id = id
        self._db_connect(data_path)
        self._load_soi()

    def __del__(self):
        self._db.close()

    def _db_connect(self, data_path: str):
        """
            Connects to the database and assigns the connection objects
            to attributes of the ViewBovisData class
        """
        self._matrix_dir = path.join(data_path, "snp_matrix")
        db_path = path.join(data_path, "viewbovis.db")
        self._db = sqlite3.connect(f"file:{db_path}?mode=ro", uri=True)
        self._cursor = self._db.cursor()

    def _load_soi(self):
        """
            Loads generic data for the SOI from the database into
            memory, assigning these data to class attributes. These
            data are, full metadata, the submission number, the xy for
            the positive test site, the full WGS metadata and the sample
            name

            Raises:
                NoDataException: if the SOI does not exist in either
                metadata or WGS data
        """
        self._df_metadata_soi = self._query_metadata([self._id])
        if not self._df_metadata_soi.empty:
            # get submission number incase eartag used in request
            self._submission = self._df_metadata_soi.index[0]
            self._df_wgs_metadata_soi = \
                self._query_wgs_metadata(self._submission)
            # retrieve x,y and lat,lon into tuples
            df_cph_2_osmapref = \
                self._get_os_map_ref(self._df_metadata_soi["CPH"])
            if not self._df_metadata_soi["CPH"][0]:
                self._xy = None
            else:
                self._xy = tuple(df_cph_2_osmapref.iloc[0, 2:].values.flatten())
        # missing metadata
        else:
            self._df_wgs_metadata_soi = self._query_wgs_metadata(self._id)
            self._xy = None
            if not self._df_wgs_metadata_soi.empty:
                self._submission = self._df_wgs_metadata_soi.index[0]
            # missing WGS & missing metadata
            else:
                raise NoDataException(self._id)
        # metadata and WGS both present
        if not self._df_wgs_metadata_soi.empty:
            self._sample_name = self._df_wgs_metadata_soi["Sample"][0]
        # missing WGS data
        else:
            self._sample_name = None
            self._exclusion = self._query_exclusion()

    def _query_metadata(self, ids: list) -> pd.DataFrame:
        """
            Fetches metadata for a given a list of ids. Returns a
            DataFrame containing metadata if it exists, otherwise
            returns an empty DataFrame
        """
        query = f"""SELECT * FROM metadata WHERE Submission IN
                    ({','.join('?' * len(ids))}) OR Identifier
                    IN ({','.join('?' * len(ids))}) """
        return pd.read_sql_query(query,
                                 self._db,
                                 index_col="Submission",
                                 params=ids+ids)

    def _query_wgs_metadata(self, id: str) -> pd.DataFrame:
        """
            Fetches WGS metadata for a given id. Returns a DataFrame
            containing WGS metadata if it exists, otherwise returns an
            empty DataFrame
        """
        query = "SELECT * FROM wgs_metadata WHERE Submission=:id"
        return pd.read_sql_query(query,
                                 self._db,
                                 index_col="Submission",
                                 params={"id": id})

    # TODO: unit test mocking pd.read_sql_query, i.e. just test the
    # if statement
    def _query_exclusion(self) -> str:
        """
            Returns the exclusion reason for the SOI. If the SOI is not
            in the list of excluded samples, None is returned
        """
        query = """SELECT Exclusion FROM excluded WHERE
                   Submission=:submission"""
        exclusion = pd.read_sql_query(query, self._db,
                                      params={"submission":
                                              self._submission})
        if exclusion.empty:
            return None
        else:
            return exclusion["Exclusion"][0]

    def _sample_to_submission(self, sample: str) -> str:
        """
            Maps a submission number to sample name. Returns 'None' if
            there is no WGS metadata for the sample
        """
        query = "SELECT * FROM wgs_metadata WHERE Sample=:sample"
        df_wgs_sub = pd.read_sql_query(query, self._db,
                                       params={"sample": sample})
        if df_wgs_sub.empty:
            return None
        return df_wgs_sub["Submission"][0]

    def _query_movdata(self, submission: str) -> pd.DataFrame:
        """
            Fetches movement data for a given submission. Returns an
            empty DataFrame if no data exists

            Raises:
                NoMetaDataException: for missing movement data
        """
        query = "SELECT * FROM movements WHERE Submission=:submission"
        mov_data = pd.read_sql_query(query, self._db, index_col="Submission",
                                     params={"submission": submission})
        if mov_data.empty:
            raise NoMetaDataException(submission)
        return mov_data

    # TODO: unit test? - yes definitely!
    def _transform_dateformat(self, date: str) -> str:
        """
            Transforms a date string format as yyyy-mm-dd to dd-mm-yyyy
        """
        # TODO: map in btb-forestry, where the sqlite db is built?
        month_mapper = {month: f"{index:02}" for index, month in
                        enumerate(calendar.month_abbr) if month}
        # transform the occasional month from abbreviated name to
        # numbers, e.g. "Jan" -> "01"
        transformed = 0
        try:
            date_transformed, _ = \
                re.subn(rf'\b(?:{"|".join(month_mapper.keys())})\b',
                        lambda x: month_mapper[x.group()], date)
            transformed = datetime.strptime(date_transformed, "%Y-%m-%d").strftime("%d/%m/%Y")
        # allow exception where date is not present
        except ValueError:
            transformed = ''

        return transformed

    def _get_os_map_ref(self, cphs: set) -> tuple:
        """
            Fetches x, y and OSMapRef for a given set of CPHs. Returns
            a DataFrame with columns 'x', 'y', 'OSMapRef' and the
            corresponding CPH in the index
        """
        query = f"""SELECT * FROM latlon WHERE CPH IN
                   ({','.join('?' * len(cphs))})"""
        return pd.read_sql_query(query,
                                 self._db,
                                 index_col="CPH",
                                 params=cphs)

    # TODO: unit test
    def _geo_distance(self, xy: tuple) -> float:
        """
            Returns the geographical distance in miles from the SOI

            Parameters:
                xy (tuple): latitude and longitude of the submission for
                which to find the distance to the SOI

            Returns:
                distance (float): the geographical distance in miles
        """
        return np.sqrt((xy[0] - self._xy[0])**2 +
                       (xy[1] - self._xy[1])**2) / 1609

    def _related_snp_matrix(self, snp_threshold: int) -> pd.DataFrame:
        """
            Retrieves the SNP matrix, relating the SOI and all
            genetically related isolates, i.e. the SNP matrix from the
            SOI clade filtered to all isolates <= the snp_threshold.
            Sample names in the row and column labels of the original
            SNP matrix files are converted to submission numbers and the
            matrix is reordered to ensure the SOI appears first in row
            and column

            Parameters:
                snp_threshold (int): maximum SNP distance for
                genetically related isolates

            Returns:
                df_snps_related_processed (pd.DataFrame): a SNP matrix
                for genetically related isolates with submission numbers
                as row and column labels

            Raises:
                NoWgsDataException: for missing WGS data
        """
        if self._df_wgs_metadata_soi.empty:
            if self._exclusion is None:
                raise NoWgsDataException(self._id)
            else:
                raise ExcludedSubmissionException(self._id, self._exclusion)
        clade = self._df_wgs_metadata_soi["group"][0]
        # load snp matrix for the required clade
        matrix_path = glob.glob(path.join(self._matrix_dir,
                                          f"{clade}_*_matrix.csv"))
        df_snps = pd.read_csv(matrix_path[0], index_col=0)
        # get isolates within snp_threshold
        related_samples = df_snps.loc[df_snps[self._sample_name]
                                      <= snp_threshold].index.to_list()
        df_snps_related = df_snps.loc[related_samples, related_samples].copy()
        # remove "snp-dists" index name
        df_snps_related_no_idx_name = df_snps_related.rename_axis(None)
        # map the index and columns from sample name to submission number
        df_snps_related_processed = df_snps_related_no_idx_name.\
            set_index(df_snps_related_no_idx_name.index.
                      map(lambda x: self._sample_to_submission(x))).\
            transpose().set_index(df_snps_related_no_idx_name.index.
                                  map(lambda x: self._sample_to_submission(x)))
        # sort the rows / columns of the matrix
        return self._sort_matrix(df_snps_related_processed)

    def _sort_matrix(self, df_matrix):
        """
            Sorts the rows and columns of df_matrix to ensure that the
            SOI appears first in both row and column
        """
        submission_list = \
            [self._submission] + [x for x in df_matrix.index.to_list()
                                  if x != self._submission]
        return df_matrix[submission_list].reindex(submission_list)

    def soi_metadata(self) -> dict:
        """
            Returns metadata for the SOI in dictionary format. For
            submissions with missing metadata, only 'submission' and
            'clade' fields will have valid values, all others will be
            'None'

            Raises:
                NoWgsDataException: for missing WGS data for the SOI
        """
        if self._df_metadata_soi.empty:
            return {"submission": self._df_wgs_metadata_soi.index[0],
                    "clade": self._df_wgs_metadata_soi["group"][0],
                    "identifier": None,
                    "species": None,
                    "animal_type": None,
                    "slaughter_date": None,
                    "cph": None,
                    "cph_type": None,
                    "county": None,
                    "risk_area": None,
                    "out_of_homerange": None,
                    "dob": None,
                    "sex": None,
                    "disclosing_test": None,
                    "import_country": None}
        elif self._df_wgs_metadata_soi.empty:
            if self._exclusion is None:
                raise NoWgsDataException(self._id)
            else:
                raise ExcludedSubmissionException(self._id, self._exclusion)
        else:
            return {"submission": self._df_metadata_soi.index[0],
                    "clade": self._df_wgs_metadata_soi["group"][0],
                    "identifier": self._df_metadata_soi["Identifier"][0],
                    "species": self._df_metadata_soi["Host"][0],
                    "animal_type": self._df_metadata_soi["Animal_Type"][0],
                    "slaughter_date":
                        self._transform_dateformat(
                            self._df_metadata_soi["SlaughterDate"][0]),
                    "cph": self._df_metadata_soi["CPH"][0],
                    "cph_type": self._df_metadata_soi["CPH_Type"][0],
                    "county": self._df_metadata_soi["County"][0],
                    "risk_area": self._df_metadata_soi["RiskArea"][0],
                    "out_of_homerange":
                        self._df_metadata_soi["OutsideHomeRange"][0],
                    "dob":
                        None if not self._df_metadata_soi["wsdBirthDate"][0]
                        else self._transform_dateformat(
                            self._df_metadata_soi["wsdBirthDate"][0].split()[0]
                            ),
                    "sex": self._df_metadata_soi["Gender"][0],
                    "disclosing_test":
                        self._df_metadata_soi["Disclosing_Test"][0],
                    "import_country":
                        self._df_metadata_soi["Import_Country"][0]}

    def soi_movement_metadata(self) -> dict:
        """
            Returns metadata and movement data for the SOI in dictionary
            format

            Raises:
                NoMetaDataException: for missing metadata for the SOI
            Raises:
                NonBovineException: if the SOI is not a cow
        """
        if self._df_metadata_soi.empty:
            raise NoMetaDataException(self._id)
        if self._df_metadata_soi["Host"][0] != "COW":
            raise NonBovineException(self._id)
        df_movements = self._query_movdata(self._submission)
        df_cph_2_osmapref = \
            self._get_os_map_ref(set(df_movements["Loc"].to_list()))
        return dict(self.soi_metadata(),
                    **{"move":
                        {str(row["Loc_Num"]):
                            {"cph": row["Loc"],
                             "os_map_ref": df_cph_2_osmapref["OSMapRef"]
                                [row["Loc"]],
                             "lat": df_cph_2_osmapref["Lat"][row["Loc"]],
                             "lon": df_cph_2_osmapref["Long"][row["Loc"]],
                             "on_date":
                                self._transform_dateformat(
                                    row["Loc_StartDate"]),
                             "off_date":
                                self._transform_dateformat(row["Loc_EndDate"]),
                             "stay_length": row["Loc_Duration"],
                             "type": row["CPH_Type"],
                             "county": row["County"],
                             "risk_area_at_move": row["Area_At_Movement"],
                             "risk_area_current": row["Current_Area"]}
                         for _, row in df_movements.iterrows()}})

    # TODO: workout how to include SOI without metadata
    def related_submissions_metadata(self, snp_threshold: int) -> dict:
        """
            Returns metadata and SNP distance for genetically related
            submissions. Submissions with missing metadata will be
            included but contain 'None' in the metadata fields

            Parameters:
                snp_threshold (str): maximum SNP distance for genetic
                related isolates

            Returns:
                metadata (dict): metadata for related samples
                    {submission_number:
                        "cph": CPH location of positive test
                        "lat": latitude,
                        "lon": longitude,
                        "species": species of the host animal,
                        "animal_type": e.g. farmed, pet, wild etc.
                        "snp_distance": SNPs to sample of interest,
                        "animal_id": eartag,
                        "clade": clade of sample,
                        "slaughter_date": date of slaughter,
                        "sex": sex of the host species, e.g. M/F,
                        "disclosing_test": the disclosing test type,
                            e.g. VE-WHT
                        "dob": the date of birth,
                        "import_country": the country the host was
                            imported from,
                        "distance": distance to the sample of interest
                            in miles
                     "SOI": the submission number of the SOI}

            Raises:
                NoMetaDataException: for missing metadata for the SOI

                NoMetaDataException: for missing CPH in metadata for the
                    SOI
        """
        if self._df_metadata_soi.empty:
            raise NoMetaDataException(self._id)
        elif self._xy is None:
            raise NoMetaDataException(self._id)
        df_snps_related = self._related_snp_matrix(snp_threshold)
        # get metadata for all related submissions
        df_metadata_related = \
            self._query_metadata(df_snps_related.index.to_list())
        if not df_metadata_related.empty:
            # get lat/long mappings for CPH of related submissions
            df_cph_2_osmapref = \
                self._get_os_map_ref(set(df_metadata_related["CPH"].to_list()))
        no_meta_submissions = \
            set(df_snps_related.index) - set(df_metadata_related.index)  # related samples without metadata
        # append no_meta_response to response to the create the full
        # response dictionary
        return \
            dict(**{index:
                    {"cph": row["CPH"],
                     "os_map_ref": None if not row["CPH"] else
                        df_cph_2_osmapref["OSMapRef"][row["CPH"]],
                     "lat": None if not row["CPH"] else
                        df_cph_2_osmapref["Lat"][row["CPH"]],
                     "lon": None if not row["CPH"] else
                        df_cph_2_osmapref["Long"][row["CPH"]],
                     "species": row["Host"],
                     "animal_type": row["Animal_Type"],
                     "snp_distance":
                        int(df_snps_related[self._submission][index]),
                     "animal_id": row["Identifier"],
                     "clade": row["Clade"],
                     "slaughter_date":
                         None if not row["SlaughterDate"] else
                         self._transform_dateformat(row["SlaughterDate"]),
                     "sex": row["Gender"],
                     "disclosing_test": row["Disclosing_Test"],
                     "dob":
                         None if not row["wsdBirthDate"] else
                         self._transform_dateformat(
                            row["wsdBirthDate"].split()[0]),
                     "import_country": row["Import_Country"],
                     "distance": None if not row["CPH"] else
                        self._geo_distance((df_cph_2_osmapref["x"][row["CPH"]],
                                            df_cph_2_osmapref["y"][row["CPH"]]
                                            ))}
                    for index, row in df_metadata_related.iterrows()},
                 **{subm: {"cph": None, "os_map_ref": None, "lat": None,
                           "lon": None, "species": None, "animal_type": None,
                           "snp_distance":
                               int(df_snps_related[self._submission][subm]),
                           "animal_id": None, "clade": None,
                           "slaughter_date": None, "sex": None,
                           "disclosing_test": None, "dob": None,
                           "import_country": None, "distance": None}
                    for subm in no_meta_submissions},
                 **{"SOI": self._submission})

    def snp_matrix(self, snp_threshold: int) -> dict:
        """
            Returns SNP matrix data for related submissions

            The SNP matrix is provided in "molten" format
            (see https://github.com/tseemann/snp-dists#snp-dists--m-molten-output-format)

            Parameters:
                snp_threshold (str): maximum SNP distance for
                genetically related isolates

            Returns:
                A dictionary containing the submission number of the
                SOI, the identifier of the SOI, a list of sampleIDs in
                the order they appear in the matrix (SOI first) and the
                SNP matrix in "molten" format

            Raises:
                MatrixTooLargeException: if the resulting SNP matrix
                exceeds 60 isolates
        """
        df_snps_related = self._related_snp_matrix(snp_threshold)
        submissions = df_snps_related.index.to_list()
        if len(submissions) > 60:
            raise MatrixTooLargeException()
        # restructure matrix - molten
        snps_related = df_snps_related.copy().stack().\
            reset_index().values.tolist()
        return {"soi": self._submission,
                "identifier": None if self._df_metadata_soi.empty
                else self._df_metadata_soi["Identifier"][0],
                "sampleIDs": submissions,
                "matrix": snps_related}


class NoDataException(Exception):
    def __init__(self, id):
        self.message = f"Invalid submission: {id}"

    def __str__(self):
        return self.message


class NoMetaDataException(NoDataException):
    def __init__(self, id):
        self.message = f"Incomplete or missing metadata for submission: {id}"


class NoWgsDataException(NoDataException):
    def __init__(self, id):
        self.message = f"Missing WGS data for submission: {id}"


class ExcludedSubmissionException(NoDataException):
    def __init__(self, id, exclusion):
        reasons = {"notMbovis": "not M. bovis",
                   "impureCulture": "contaminated sample",
                   "lowQualityData": "low quality data",
                   "identifiedOutlier": "identified outlier"}
        self.message = \
            f"Excluded submission: {id}\nReason: {reasons[exclusion]}"


class NonBovineException(NoDataException):
    def __init__(self, id):
        self.message = f"Non-bovine submission: {id}"


class MatrixTooLargeException(NoDataException):
    def __init__(self):
        self.message = ("SNP matrix exceeds the maximum size limit (60 "
                        "isolates). Consider reducing the SNP distance "
                        "threshold or viewing the phylogenetic tree in "
                        "Nextstrain instead.")
