class TestController < ApplicationController
  def index
    @db = RetrieveDb.new('9585df718d544538ab8ffc97733913ea').call()
  end
end
