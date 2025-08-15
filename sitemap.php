<?php
header('Content-Type: application/xml; charset=utf-8');
echo '<?xml version="1.0" encoding="UTF-8"?>';
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://bloodmoneygame.online/</loc>
    <lastmod><?php echo date('Y-m-d\TH:i:s+00:00'); ?></lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://bloodmoneygame.online/demo.html</loc>
    <lastmod><?php echo date('Y-m-d\TH:i:s+00:00'); ?></lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>