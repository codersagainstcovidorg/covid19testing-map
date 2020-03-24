<?php

$rows = file('prod.csv');
$columns = explode(',', array_shift($rows));

$output = array_map(function($row) use($columns) {
    $location = array_combine($columns, str_getcsv($row));
    $location['lat'] = (float)$location['lat'];
    $location['lng'] = (float)$location['lng']; 
    return $location;
}, $rows);

$output = array_values(array_filter($output, function($row) {
    return (
        $row['lat'] != 0 &&
        $row['lng'] != 0 &&
        $row['is-hidden'] == 'FALSE'
    );
}));

file_put_contents('data.json', json_encode($output));
