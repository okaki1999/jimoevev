class Api::V1::EventsController < ApplicationController
  include Rails.application.routes.url_helpers

  def index
    @events = Event.all.map do |event|
      event.as_json.merge(image_url: event.image.attached? ? url_for(event.image) : nil)
    end
    render json: @events
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      render json: @event, status: :created
    else
      render json: @event.errors, status: :unprocessable_entity
    end
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


  private

  def event_params
    params.require(:event).permit(:title, :content, :image)
  end
end
