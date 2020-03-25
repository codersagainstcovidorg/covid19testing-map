<?php

$rows = file('prod.csv');
$columns = explode(',', array_shift($rows));

$output = array_map(function($row) use($columns) {
    $location = array_combine($columns, str_getcsv($row));
    $location['location_latitude'] = (float)$location['location_latitude'];
    $location['location_longitude'] = (float)$location['location_longitude']; 
    return $location;
}, $rows);

$output = array_values(array_filter($output, function($row) {
    return (
        $row['location_latitude'] != 0 &&
        $row['location_longitude'] != 0 &&
        $row['is_hidden'] == 'FALSE'
    );
}));

file_put_contents('data.json', json_encode($output));
