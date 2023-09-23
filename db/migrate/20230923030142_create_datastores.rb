class CreateDatastores < ActiveRecord::Migration[7.0]
  def change
    create_table :datastores do |t|
      t.string :store_id

      t.timestamps
    end
  end
end
