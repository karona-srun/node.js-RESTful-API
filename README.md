-- Active: 1688541104794@@127.0.0.1@3306@dbtesting
# Development
## Setting Up
### Install Dependencies
```shell script
composer install
```

### Configration Database 
- Configration database in config/config.json
``` Configration database in config/config.json
{
  "development": {
    "username": "root",
    "password": "ROOT@123",
    "database": "dbtesting",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

### Generates a table from migration file
```Generates a table from migration file
sequelize db:migrate   
```

### Run the project
```Run the project
npm run dev or node server.js 
````

### Use JWT
```
Authorization Bearer Token: token
```



### Documentation of sequelize

```Generates a model and its migration
sequelize model:create --name modelUser --attributes name:string --underscored  
```

```Generates a table from migration file
sequelize db:migrate   
```

```Sequelize <command>
Commands:
  - sequelize db:migrate                        Run pending migrations
  - sequelize db:migrate:schema:timestamps:add  Update migration table to have timestamps
  - sequelize db:migrate:status                 List the status of all migrations
  - sequelize db:migrate:undo                   Reverts a migration
  - sequelize db:migrate:undo:all               Revert all migrations ran
  - sequelize db:seed                           Run specified seeder
  - sequelize db:seed:undo                      Deletes data from the database
  - sequelize db:seed:all                       Run every seeder
  - sequelize db:seed:undo:all                  Deletes data from the database
  - sequelize db:create                         Create database specified by configuration
  - sequelize db:drop                           Drop database specified by configuration
  - sequelize init                              Initializes project
  - sequelize init:config                       Initializes configuration
  - sequelize init:migrations                   Initializes migrations
  - sequelize init:models                       Initializes models
  - sequelize init:seeders                      Initializes seeders
  - sequelize migration:generate                Generates a new migration file      [aliases: migration:create]
  - sequelize model:generate                    Generates a model and its migration [aliases: model:create]
  - sequelize seed:generate                     Generates a new seed file           [aliases: seed:create]

````
### Search Route API
```Search route
http://localhost:8080/api/users/?q=email
```

