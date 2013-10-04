((Thirdspace, Backbone) ->
  "use strict"

  Thirdspace.Collections.Members = Backbone.Collection.extend(
    model: Thirdspace.Models.Member
    url: "/members"

    comparator: (model) ->
      model.get "id"

  )

).call this, Thirdspace, Backbone