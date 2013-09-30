(->
  "use strict"
  
  Thirdspace =
    Models: {}
    Collections: {}
    Routers: {}
    Views: {}
    
    Member: null
    
    initialize: ->
      console.log "Welcome to 3rdspace"  if Thirdspace.Member

  @Thirdspace = Thirdspace
  $ Thirdspace.initialize
).call this