class Api::SourcesController < ApiController

  def index
    url = "https://openexchangerates.org/api/latest.json?app_id=4c6503f41fe84532abec479d9a7aee17"
    # url = "https://openexchangerates.org/api/latest.json?app_id=#{ENV[OPEN_EXCHANGE_RATES_API_KEY]}"
    base = HTTParty.get(url)['base']
    rates = HTTParty.get(url)['rates']
    timestamp = HTTParty.get(url)['timestamp']

    # http://meumobi.github.io/stocks%20apis/2016/03/13/get-realtime-stock-quotes-yahoo-finance-api.html
    # https://github.com/toddmotto/public-apis

    mutated_data = []
    count = 1
    rates.each_pair do |key, value|
      hash = {}
      hash[:currency] = key
      hash[:value] = value
      hash[:id] = count
      count += 1
      mutated_data << hash
    end

    data_json = { 'base': base, 'rates': mutated_data, 'queryTime': timestamp  }

    respond_to do |format|
      format.json { render json: data_json }
      format.html
    end
  end

  # def create
  # end
end
