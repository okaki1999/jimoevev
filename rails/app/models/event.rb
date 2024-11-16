class Event < ApplicationRecord
  include Hashid::Rails
  has_one_attached :image
end
