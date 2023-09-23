class TestController < ApplicationController
  def index
    db = RetrieveDb.new('9585df718d544538ab8ffc97733913ea').call()
    @list = []
    db.each_pair {|key, value| @list.push([key, value])}

    query = QueryDb.new('9585df718d544538ab8ffc97733913ea').call()
    @querylist = []
    query.each_pair {|key, value| @querylist.push([key, value])}

    results = query['results']

    @resultlist = []

    results.each do |item|
      item.each_pair do |key, value|
          @resultlist.push([key, value])
      end
    end

  end

  def narrow
    retrieval = RetrieveDb.new('9585df718d544538ab8ffc97733913ea').call()
    query = QueryDb.new('9585df718d544538ab8ffc97733913ea').call()

    @has_more = retrieval['has_more']

    @rows = query['results']
    @cells = []

    #data types I can handle
    # Name Number Date Text Email Phone Checkbox Status Select Multi_Select URL

    @rows.each do |row|
      row['properties'].each_pair do |key,value|
        cellname = key
        celltype = value["type"]

        cellval = ParseCell.new(value, celltype).call()

        @cells.push(
          {
            name: cellname,
            type: celltype,
            value: cellval,
          }
        )
      end

      
    end
  end

end
