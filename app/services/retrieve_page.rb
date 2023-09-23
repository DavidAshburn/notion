require 'net/http'

class RetrievePage
  def initialize(page_id)
    @page_id = page_id;    
  end


  def call
    uri = URI("https://api.notion.com/v1/pages/#{@page_id}")
    
    req = Net::HTTP::Get.new(uri)
    req['Authorization'] = "Bearer #{ENV["NOTION"]}"
    req['accept'] = "application/json"
    req['Notion-Version'] = "2022-06-28"

    res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') { |http|
      http.request(req)
    }

    res.body
  end
end