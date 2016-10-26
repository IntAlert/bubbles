Shared Models
===
These models are used by the lambda function and the web application

This folder is *not* automatically imported into either of these components. Use ```gulp watch``` in the parent folder of the repo to copy these resources into the lambda and web application.

Creating a migration
===
from:
http://stackoverflow.com/questions/21105748/sequelize-js-how-to-use-migrations-and-sync

Create a migration: sequelize migration:create
Write up and down functions in your migration file
According to your changes in migration file, change your model manually
Run sequelize db:migrate