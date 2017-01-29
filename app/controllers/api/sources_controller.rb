class Api::SourcesController < ApiController

  def history
  end

  def latest
  end

  def compare
    binding.pry
    # look at params
    # should be
    # params[:value]
    # params[:from]
    # params[:to]
  end

  def index
    # url = "https://openexchangerates.org/api/latest.json?app_id=#{ENV[OPEN_EXCHANGE_RATES_API_KEY]}"
    currency_codes = "https://openexchangerates.org/api/currencies.json?app_id=4c6503f41fe84532abec479d9a7aee17"
    code_data = HTTParty.get(currency_codes)

    mutated_code_data = []
    count = 1
    code_data.each_pair do |key, value|
      hash = {}
      hash[:abbreviation] = key
      hash[:expansion] = value
      hash[:id] = count
      count += 1
      mutated_code_data << hash
    end


    latest = "https://openexchangerates.org/api/latest.json?app_id=4c6503f41fe84532abec479d9a7aee17"
    base = HTTParty.get(latest)['base']
    rates = HTTParty.get(latest)['rates']
    timestamp = HTTParty.get(latest)['timestamp']

    # http://meumobi.github.io/stocks%20apis/2016/03/13/get-realtime-stock-quotes-yahoo-finance-api.html
    # https://github.com/toddmotto/public-apis

    mutated_rates = []
    count = 1
    rates.each_pair do |key, value|
      hash = {}
      hash[:currency] = key
      hash[:value] = value
      hash[:id] = count
      count += 1
      mutated_rates << hash
    end

    data_json = { 'base': base, 'rates': mutated_rates, 'queryTime': timestamp, 'currencyCodes': mutated_code_data }

    respond_to do |format|
      format.json { render json: data_json }
      format.html
    end
  end

  # def create
  # end
end
