class Api::V1::EventsController < Api::V1::BaseController
  include Rails.application.routes.url_helpers
  before_action :authenticate_user!, only: [:create]

  def index
    @events = Event.all.map do |event|
      event.as_json.merge(image_url: event.image.attached? ? url_for(event.image) : nil)
    end
    render json: @events
  end

  def create
    return if current_user.blank?

    @user_id = current_user.id
    @event = Event.new(event_params)
    @event.user_id = current_user.id
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
