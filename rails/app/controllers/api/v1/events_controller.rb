class Api::V1::EventsController < Api::V1::BaseController
  include Rails.application.routes.url_helpers
  before_action :authenticate_user!, only: [:create, :user_index]

  def index
    @events = Event.all.map do |event|
      event.as_json.merge(image_url: event.image.attached? ? url_for(event.image) : nil)
    end
    render json: @events
  end

  def show
    event = Event.find(params[:id])
    event_data = event.as_json.merge(image_url: event.image.attached? ? url_for(event.image) : nil)
    render json: event_data
  end

  def new
    @event = Event.new
    render json: @event
  end
end
