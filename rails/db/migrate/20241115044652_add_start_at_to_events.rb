class AddStartAtToEvents < ActiveRecord::Migration[7.0]
  def change
    add_column :events, :start_at, :datetime
  end
end
