((Thirdspace, Backbone) ->
  "use strict"

  Thirdspace.Models.Member = Backbone.Model.extend(
    defaults:
      name:
        first: null
        last: null

      email: null
      admin: false
      sessions: 10
      check_in_count: 0
      subcription:
        name: null
        cost: 0
        active: false
        start_date: new Date()

    parse: (response) ->
      response.id = response._id
      response

  )

  # [first, last] = person.name.split " "

).call this, Thirdspace, Backbone