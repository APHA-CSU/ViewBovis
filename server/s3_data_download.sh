S3_URI=$1
sudo aws s3 cp ${S3_URI}/Metadata/ /ViewBovis/. --recursive
sudo aws s3 cp ${S3_URI}/snp-matrix/ /ViewBovis/snp_matrix/ --recursive