<?php
    extract($_POST);
    
    header('Content-type: application/vnd.ms-excel; charset=UTF-8');
    header("Content-Disposition: attachment; filename=$titulo.xls");
    header("Pragma: no-cache");
    header("Expires: 0");
    
    echo $excel;
    
?>
