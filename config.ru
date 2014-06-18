

use Rack::Static,
  :urls => ["/images", "/js", "/css"],
  :root => "ShortTermMemoryTest"

# map "/" do
#   run lambda { |env|
#     [
#         200,
#         {
#             'Content-Type'  => 'text/html',
#             'Cache-Control' => 'max-age=86400'
#         },
#         File.open('ShortTermMemoryTest/index.html', File::RDONLY)
#     ]
#   }
# end

  run Proc.new { |env|
    if env['PATH_INFO']=="/"
      file = 'ShortTermMemoryTest/index.html'
    else
      file = 'ShortTermMemoryTest'+ env['PATH_INFO'] + '.html'
    end
    [
        200,
        {
            'Content-Type'  => 'text/html',
            'Cache-Control' => 'public, max-age=6400'
        },
        File.open( file, File::RDONLY)


    ]
  }
