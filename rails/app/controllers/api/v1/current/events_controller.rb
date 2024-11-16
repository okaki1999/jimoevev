class Api::V1::Current::EventsController < Api::V1::BaseController
  include Rails.application.routes.url_helpers
  before_action :authenticate_user!, only: [:index]

  def index
    return if current_user.blank?

    @events = Event.where(user_id: current_user.id).map do |event|
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

  def destroy
    return if current_user.blank?

    @event = Event.find_by(id: params[:id], user_id: current_user.id)
    if @event.nil?
      render json: { error: "Event not found or not authorized" }, status: :not_found
      return
    end
    if @event.destroy
      render json: { message: "Event successfully deleted" }, status: :ok
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  private

    def event_params
      params.require(:event).permit(:title, :content, :image, :start_at)
    end
end
