# json.cache ['v1', tossup], expires_in: 30.minutes do
  json.extract! tossup, :id, :text, :answer, :number,
    :tournament_id, :category_id, :subcategory_id,
    :round, :created_at, :updated_at, :quinterest_id,
    :formatted_text
  json.tournament tossup.tournament, partial: "tournaments/tournament", as: :tournament
  json.category tossup.category, partial: "categories/category", as: :category
  json.subcategory tossup.subcategory, partial: "subcategories/subcategory", as: :subcategory
  json.url tossup_url(tossup, format: :json)
# end
