Rails.application.routes.draw do

  root 'pages#home'
  get '/', to: 'pages#home'

  post '/api/sources/compare', to: 'api/sources#compare'

  namespace :api do
    resources :sources, only: [:index, :compare]
  end

end
