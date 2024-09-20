# Tables
## identityEntitlementsTables
### Overview
A table used to contain all objects related to user/player identity and entitlement including player groups.

### Required Attributes
**entityId (PK)**

**entityType (SK)**

### Object Types
**user**




### Fields

### Indexes

### Access Patterns (Facets)




# Random Notes

1. A user can be a player and/or and admin/owner. A player does not nessciarily need to be a user to play. They can be added by and administrator to a player group
    - We can add a provision to find a the groups a user belongs to by their email address if they choose to register on the site. Otherwise the will just be an unregistered player.
