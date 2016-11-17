#!/usr/bin/env bash
CLOUDFRONT_DISTRIBUTION=E2X6XVNS18EPPG
OUTPUT=/tmp/sync-output
aws configure set preview.cloudfront true
npm run build
aws s3 sync public/ s3://docs.smooch.io/ --delete > $OUTPUT
PATTERN="s3://docs.smooch.io"
cloudfrond_items=''
cloudfrond_count=0

while read -r line; do
    cloudfrond_items+=",'"$line"'"
    ((cloudfrond_count++))

    base_path=$(echo $line | sed 's/\(.*\)\/.*/\1/')
    if [[ -z "$base_path" && "$line" = "/index.html" ]]
    then
        base_path='/'
    fi
    
    if [[ ! -z "$base_path" ]]
    then
        cloudfrond_items+=",'"$base_path"'"
        ((cloudfrond_count++))
    fi
done < <(awk -F $PATTERN '{print $NF}' $OUTPUT)

if [[ "$cloudfrond_count" -gt "0" ]]
then
    echo "Invalidating ${cloudfrond_count} items on Cloudfront..."
    INVALIDATION_BATCH="Paths={Quantity=${cloudfrond_count},Items=[${cloudfrond_items}]},CallerReference=\"build${CIRCLE_BUILD_NUM}\""
    aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION --invalidation-batch "${INVALIDATION_BATCH}"
fi
