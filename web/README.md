TODO
====
- Facebook login with database storage
- admin view



FB group settings
Any member can add members, but an admin or a moderator must approve them.


All group posts must be approved by an admin or a moderator.?


Creating a migration
===
from:
http://stackoverflow.com/questions/21105748/sequelize-js-how-to-use-migrations-and-sync

Create a migration: sequelize migration:create
Write up and down functions in your migration file
According to your changes in migration file, change your model manually
Run sequelize db:migrate