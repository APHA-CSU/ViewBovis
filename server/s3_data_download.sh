S3_URI=$1
sudo aws s3 cp ${S3_URI}/Metadata/viewbovis.db /ViewBovis/.
sudo aws s3 cp ${S3_URI}/snp-matrix/ /ViewBovis/snp_matrix/ --recursive
aws s3 cp ${S3_URI}/jsonExport/ /home/ranch-159/NextstrainData/jsonExport/ --recursive