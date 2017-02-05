class Api::SourcesController < ApiController
  # http://meumobi.github.io/stocks%20apis/2016/03/13/get-realtime-stock-quotes-yahoo-finance-api.html
  # https://github.com/toddmotto/public-apis

  # def history
  # end
  # def latest
  # end

  def all_rates
    base = params[:baseCurrency]
    all_rates = "https://openexchangerates.org/api/latest.json?app_id=#{ENV['OPEN_EXCHANGE_RATES_API_KEY']}&base=#{base}"
    allRates = HTTParty.get(all_rates)['rates']
    all_codes = "https://openexchangerates.org/api/currencies.json?app_id=#{ENV['OPEN_EXCHANGE_RATES_API_KEY']}"
    allCodes = HTTParty.get(all_codes)

    formatted_base = ''
    formatted_data = []
    count = 1
    allRates.each_pair do |key, value|
      if key != base
        hash = {}
        hash[:abbreviated] = key
        hash[:expanded] = allCodes[key]
        hash[:rate] = value
        hash[:id] = count
        count += 1
        formatted_data << hash
      elsif key == base
        hash = {}
        hash[:abbreviated] = key
        hash[:expanded] = allCodes[key]
        hash[:rate] = value
        hash[:id] = count
        count +=1
        formatted_base = hash
      end
    end

    data_json = { allCurrencies: formatted_data, baseCurrency: formatted_base }
    respond_to do |format|
      format.json { render json: data_json }
      format.html
    end
  end

  def latest_exchange
    compareFrom = params[:compareFrom]
    compareTo = params[:compareTo]
    latest = "https://openexchangerates.org/api/latest.json?app_id=#{ENV['OPEN_EXCHANGE_RATES_API_KEY']}&base=#{compareFrom}"
    base = HTTParty.get(latest)['base']
    rates = HTTParty.get(latest)['rates']
    timestamp = HTTParty.get(latest)['timestamp']

    target_rate = []
    rates.each_pair do |key, value|
      if key == compareTo
        target_rate << value
      end
    end

    data_json = { targetRate: target_rate, timestamp: timestamp }
    respond_to do |format|
      format.json { render json: data_json }
      format.html
    end
  end

  def index
    currency_codes = "https://openexchangerates.org/api/currencies.json?app_id=#{ENV['OPEN_EXCHANGE_RATES_API_KEY']}"
    code_data = HTTParty.get(currency_codes)

    new_code_data = []
    count = 1
    code_data.each_pair do |key, value|
      hash = {}
      hash[:abbreviation] = key
      hash[:expansion] = value
      hash[:id] = count
      count += 1
      new_code_data << hash
    end

    data_json = { 'currencyCodes': new_code_data }
    respond_to do |format|
      format.json { render json: data_json }
      format.html
    end
  end

end
