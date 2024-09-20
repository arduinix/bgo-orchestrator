


# Data Objects

### user
A user, player, or admin of the olympic gameplay
1. Can be a player and/or admin
2. Has a cognitoId if they have registered, will not have a cognito id if they are not registered.
3. When registering we can check the users table to see if they have been a part of any player groups or olympic events in the past
4. Users are members or admins of groups. Owners inherit the rights of group members olympic events are owned by groups and group admins are therefore allowed to manage the event.


### olympicEvent
The main container for the olympics.
1. olympicEvents can be created by any registered, user. Events can be totally planned and readied without paying, payment must take place to start the event.
2. olympicEvent are owned by one user, ownership can be transferred, but requires credit card information to be updated. Olympics cannot be started without valid credit card info.
3. Owners can add other administrators to help them organize the olympicEvent.
4. Contains a record that tracks which players have had first choice 


### playerGroup
1. Player groups are owned by an olypmicEvent.
2. When creating a new event, playerGroups can be imported to save time.
3. When an import happens, a copy of the groups is created with a new ID.
4. If a user has not registered in the app, they can still play. Upon registering, their cognito account is added to their user object and they will be able to log in and see the events that are or have been a part of.
5. Players can be playing or not playing. This will be adjustable on the player list and can be updated prior to starting a round
6. Need to decide what happens if a player decides to drop during a round.

### round
1. owned by an olympicEvent.
2. has a list of participatingPlayers, by userId
3. Has a list of selectedGames by gameId
4. Tracks start and end time

### table
1. Table represents physical table where a game is being played. The number of available tables is simply held in an olympic event.
2. An instance of table is created when the round is built and games are matched with players.
3. Tables primary key will be a combination of table number/id and roundID represented as round#123
4. Every instance of table will have a gamePlayed.
5. Tables can be automatically selected or selected as a preference when the gameSelection takes place.

### selectedGames
1. A list of games by ID that has been selected for that olympic event.
2. Games will default to in play when adding them, but can be taken out of play if that game is found to be undesirable
3. Selected games are part of an olympicEvent. They can be imported from the previous event, but a new id will be created for that specific event.


### games
1. A database of games
2. Boardgame geek has an XML API of boardgames that we should be able to use. [Board Game Geek API] (https://boardgamegeek.com/wiki/page/BGG_XML_API&redirectedfrom=XML_API#:~:text=You%20can%20access%20some%20information,the%20various%20parameters%20are%20listed.)







# Access Patterns (Facets)

# Tables
## identityEntitlementsTables
### Overview
A table used to contain all objects related to user/player identity and entitlement including player groups.

### Required Attributes




### Fields

### Indexes






# Random Notes

1. A user can be a player and/or and admin/owner. A player does not nessciarily need to be a user to play. They can be added by and administrator to a player group
    - We can add a provision to find a the groups a user belongs to by their email address if they choose to register on the site. Otherwise the will just be an unregistered player.
