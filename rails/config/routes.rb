Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
  namespace :api do
    namespace :v1 do
      get "health_check", to: "health_check#index"
      mount_devise_token_auth_for "User", at: "auth"
      resources :prefectures, only: [:index, :show]
      resources :events, only: [:index, :show, :create]

      namespace :current do
        resource :user, only: [:show]
      end
    end
  end
end
