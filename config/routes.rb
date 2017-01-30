Rails.application.routes.draw do

  root 'pages#home'
  get '/', to: 'pages#home'

  post '/api/sources/compare', to: 'api/sources#compare'

  namespace :api do
    resources :sources, only: [:index, :compare]
  end

  # namespace :api do
  #   resources :sources, only: [:index, :compare] do
  #     collection do
  #       post :compare
  #     end
  #   end
  # end
  #
  # namespace :api do
  #   resources :sources, only: [:index] do
  #     collection do
  #       post :compare
  #     end
  #   end
  # end
  #
  # namespace :api do
  #   resources :sources, only: [:index] do
  #     collection do
  #       resources :compare, only: [:compare]
  #     end
  #   end
  # end
  #
  # namespace :api do
  #   resources :sources do
  #     post :compare
  #   end
  # end

end
