class AddReferencesToEvents < ActiveRecord::Migration[7.0]
  def change
    add_reference :events, :user, null: false, foreign_key: true
    add_reference :events, :prefecture, foreign_key: true
  end
end
