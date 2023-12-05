<?php

namespace App\Helper;

if (!function_exists('convertBytes')) {
    function convertBytes($fileSize)
    {
        if ($fileSize >= 1073741824) {
            $fileSize = number_format($fileSize / 1073741824, 2) . ' GB';
        } elseif ($fileSize >= 1048576) {
            $fileSize = number_format($fileSize / 1048576, 2) . ' MB';
        } elseif ($fileSize >= 1024) {
            $fileSize = number_format($fileSize / 1024, 2) . ' KB';
        } else {
            $fileSize = $fileSize . ' bytes';
        }

        return $fileSize;
    }
}
