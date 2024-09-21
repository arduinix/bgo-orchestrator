


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
4. A selected game object is created for each olympic event.


### games
1. A database of games
2. Boardgame geek has an XML API of boardgames that we should be able to use. [Board Game Geek API] (https://boardgamegeek.com/wiki/page/BGG_XML_API&redirectedfrom=XML_API#:~:text=You%20can%20access%20some%20information,the%20various%20parameters%20are%20listed.)


### gameSet
A Set of games that belong to a specific rating.
Difficutly is organized by table because sometimes people would like.




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



# Notes from Joe

Preregistration is helpful.

1. Categories are picked, supply chaig, get rich, rolling rights. 10 categories
2. 25 Games in each category. Ranked in difficurty in numberical order up to 25. Easiert game at table 1.
3. Games are Boxed up by table. Ranked by difficutly and stored at each table on the day.
4. People show up and are pre registered. This is helpful. Need to be able to add people to a player group throughout the day.
5. During round 1 the first category is picked.  This could be a dropdown.
6. Last person that got to pick their game gets to pick the next category and pick the next game that they are going to play.
7. Random list of names is generated. 100 names for example. Spreadsheet randomizes the order.
    - In the past, currently: MC says next name and it is written.
    - Something that slows the olympics down so much is the person picking the game.
    - Systems still puts people in order, but calling the next 5 people 
8. Can join an existing game or pick a game. To a max of 4 players. Every table has at least 3 players.
9. It would be helpful to have something that tells you how many games to pick.
10. A full round for one person would be one game.
11. GameRound (when the game is done), EventRound is when all games that were picked in a category are plyed and recorded, that signals the end of a round.
12. Leaderboard.
13. If someone drops out or skips, they just don't get counted.
14. If someone leaves during a round, they get last place.
15. A  non play would be progamiatic null and a logical 0.
16. If someone shows up late would be a null score.
17. Note a null score vs a zero.
18. A player at the table scans a QR code for scoring.
    - Issue, plugging in scores will automatically rank them gold silver bronze.
    - There should be a toggle that allows the user entering the scores to select high or low scores as the winner.
    - The score is for the personal record keeping, we are looking for the PLACE!
    - If there was a tie there would be no medal.
    - After the scoring is in, a second person will, need to verify the scores. This could be an SMS message or an email.
    - Scan a games QR code at the end of the game, this handles score entry and enter the player names
    