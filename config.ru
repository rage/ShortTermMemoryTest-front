

use Rack::Static,
  :urls => ["/images", "/js", "/css"],
  :root => "ShortTermMemoryTest"

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'max-age=86400'
    },
    File.open('ShortTermMemoryTest/index.html', File::RDONLY)
  ]
}


