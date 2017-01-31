Rails.application.routes.draw do

  root 'pages#home'
  get '/', to: 'pages#home'

  post '/api/sources/latest_exchange', to: 'api/sources#latest_exchange'

  namespace :api do
    resources :sources, only: [:index, :latest_exchange]
  end

end
