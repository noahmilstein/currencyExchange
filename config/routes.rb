Rails.application.routes.draw do

  root 'pages#home'
  get '/', to: 'pages#home'
  get 'rates', to: 'pages#rates'
  get 'about', to: 'pages#about'
  get 'convert', to: 'pages#convert'

  post '/api/sources/latest_exchange', to: 'api/sources#latest_exchange'
  post '/api/sources/all_rates', to: 'api/sources#all_rates'

  namespace :api do
    resources :sources, only: [:index, :latest_exchange, :all_rates]
  end

end
