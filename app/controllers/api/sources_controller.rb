class Api::SourcesController < ApiController

  def history
  end

  def latest
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

    data_json = { targetRate: target_rate }

    respond_to do |format|
      format.json { render json: data_json }
      format.html
    end

    # new_rates = []
    # count = 1
    # rates.each_pair do |key, value|
    #   hash = {}
    #   hash[:currency] = key
    #   hash[:value] = value
    #   hash[:id] = count
    #   count += 1
    #   new_rates << hash
    # end

    # binding.pry

    # # https://openexchangerates.org/api/convert/19999.95/GBP/EUR?app_id=YOUR_APP_APP_ID
    # value = params[:value]
    # from = params[:from]
    # to = params[:to]
    # currency_conversion = "https://openexchangerates.org/api/convert/#{value}/#{from}/#{to}?app_id=#{ENV['OPEN_EXCHANGE_RATES_API_KEY']}"
    # # currency_conversion = "https://openexchangerates.org/api/convert//19999.95/GBP/EUR?app_id=#{ENV['OPEN_EXCHANGE_RATES_API_KEY']}"
    # conversion_data = HTTParty.get(currency_conversion)
    # binding.pry
    # respond_to do |format|
    #   format.json { render json: conversion_data }
    #   format.html
    # end
    #
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

    # http://meumobi.github.io/stocks%20apis/2016/03/13/get-realtime-stock-quotes-yahoo-finance-api.html
    # https://github.com/toddmotto/public-apis

    # data_json = { 'base': base, 'rates': mutated_rates, 'queryTime': timestamp, 'currencyCodes': mutated_code_data }
    data_json = { 'currencyCodes': new_code_data }

    respond_to do |format|
      format.json { render json: data_json }
      format.html
    end
  end

  # def create
  # end
end
