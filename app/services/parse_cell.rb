require 'net/http'

class ParseCell
  def initialize(value, type)
    @val = value;
    @type = type;
  end


  def call
    value = @val
    celltype = @type

    if celltype == "date"
      cellval = value["date"]["start"]
    elsif celltype == "title"
      cellval = value["title"][0]["plain_text"]
    elsif celltype == "rich_text"
      cellval = value["rich_text"][0]["plain_text"]
    elsif celltype == "checkbox"
      cellval = value["checkbox"]
    elsif celltype == "status"
      cellval = value["status"]["name"]
    elsif celltype == "select"
      cellval = value["select"]["name"]
    elsif celltype == "multi_select"
      cellval = []
      value["multi_select"].each do |entry|
        cellval.push(entry["name"])
      end
    else
      cellval = value[celltype]
    end

    cellval
  end
end
