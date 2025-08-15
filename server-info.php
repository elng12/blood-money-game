<?php
// Simple server information page to help diagnose issues
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Server Info - Blood Money Game</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .info-box { background: #f0f0f0; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .success { background: #d1fae5; }
        .error { background: #fee2e2; }
        h1 { color: #dc2626; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>🔧 Server Information & Diagnostics</h1>
    
    <div class="info-box">
        <h3>📊 Basic Server Info</h3>
        <table>
            <tr><th>Server Software</th><td><?php echo $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown'; ?></td></tr>
            <tr><th>PHP Version</th><td><?php echo phpversion(); ?></td></tr>
            <tr><th>Document Root</th><td><?php echo $_SERVER['DOCUMENT_ROOT'] ?? 'Unknown'; ?></td></tr>
            <tr><th>Server Name</th><td><?php echo $_SERVER['SERVER_NAME'] ?? 'Unknown'; ?></td></tr>
            <tr><th>Current Time</th><td><?php echo date('Y-m-d H:i:s T'); ?></td></tr>
        </table>
    </div>

    <div class="info-box">
        <h3>📁 File Existence Check</h3>
        <?php
        $files = [
            'sitemap.xml',
            'sitemap.txt', 
            'sitemap.html',
            'robots.txt',
            '.htaccess'
        ];
        
        echo '<table>';
        echo '<tr><th>File</th><th>Exists</th><th>Readable</th><th>Size</th></tr>';
        
        foreach ($files as $file) {
            $exists = file_exists($file);
            $readable = $exists && is_readable($file);
            $size = $exists ? filesize($file) . ' bytes' : 'N/A';
            
            $statusClass = $exists ? 'success' : 'error';
            echo "<tr class='$statusClass'>";
            echo "<td>$file</td>";
            echo "<td>" . ($exists ? '✅ Yes' : '❌ No') . "</td>";
            echo "<td>" . ($readable ? '✅ Yes' : '❌ No') . "</td>";
            echo "<td>$size</td>";
            echo "</tr>";
        }
        echo '</table>';
        ?>
    </div>

    <div class="info-box">
        <h3>🌐 URL Testing</h3>
        <p>Test these URLs in your browser:</p>
        <?php
        $baseUrl = 'https://' . $_SERVER['HTTP_HOST'];
        $testUrls = [
            $baseUrl . '/sitemap.xml',
            $baseUrl . '/sitemap.txt',
            $baseUrl . '/sitemap.html',
            $baseUrl . '/robots.txt'
        ];
        
        foreach ($testUrls as $url) {
            echo "<p><a href='$url' target='_blank'>$url</a></p>";
        }
        ?>
    </div>

    <div class="info-box">
        <h3>📋 Sitemap Content Preview</h3>
        <?php
        if (file_exists('sitemap.xml') && is_readable('sitemap.xml')) {
            echo '<h4>sitemap.xml content:</h4>';
            echo '<pre style="background: white; padding: 10px; overflow-x: auto;">';
            echo htmlspecialchars(file_get_contents('sitemap.xml'));
            echo '</pre>';
        } else {
            echo '<p class="error">❌ sitemap.xml not found or not readable</p>';
        }
        ?>
    </div>

    <div class="info-box">
        <h3>🔍 Recommendations</h3>
        <ul>
            <li>If files exist but URLs return 404: Check server configuration</li>
            <li>If files don't exist: Upload files to server root directory</li>
            <li>If files exist but aren't readable: Check file permissions (should be 644)</li>
            <li>If XML shows as download: Server needs MIME type configuration</li>
        </ul>
    </div>
</body>
</html>