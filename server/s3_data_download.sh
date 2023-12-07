S3_URI=$1
sudo aws s3 cp ${S3_URI}/Metadata/viewbovis.db /ViewBovis/.
sudo aws s3 cp ${S3_URI}/Metadata/metadata.json /ViewBovis/.
sudo rm /ViewBovis/snp_matrix/*
sudo aws s3 cp ${S3_URI}/snp-matrix/ /ViewBovis/snp_matrix/ --recursive
rm /home/ranch-159/NextstrainData/jsonExport/*
aws s3 cp ${S3_URI}/jsonExport/ /home/ranch-159/NextstrainData/jsonExport/ --recursive