require 'net/http'

class RetrieveDb
  def initialize(store_id)
    @db_id = store_id;    
  end


  def call
    uri = URI("https://api.notion.com/v1/databases/#{@db_id}")
    
    req = Net::HTTP::Get.new(uri)
    req['Authorization'] = "Bearer #{ENV["NOTION"]}"
    req['Notion-Version'] = "2022-06-28"
    req['Content-Type'] = "application/json"

    res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') { |http|
      http.request(req)
    }

    res.body
  end
end


