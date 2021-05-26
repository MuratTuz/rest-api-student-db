# Movie REST API using swagger

After cloning the repository install the dependencies:

```bash
$ npm install
```

The commands below are for generating a model (table) and a bulk data for the application. It is important not to leave space between attributes. If not, it gives error. model:generate create also migration file for database.

```bash
sequelize model:generate --name table_name --attributes movieId:integer,duration:integer,person:string
sequelize seed:generate --name initial_bulk_data_file_name
```

Use the command below to create tables in the database:

```bash
$ NODE_ENV=test sequelize db:migrate 
```

Use the command below for initializing the database for the first time with bulk datas. There must be a Mysql database started in order to use this command.

```bash
NODE_ENV=test sequelize db:seed:all
```

Should any error, use the debug mode for finding the problem.

```bash
NODE_ENV=test sequelize db:seed:all --debug
```

Use the command below to generate the documentation (swagger.json) if it doesn't exist and to start the application:

```bash
$ npm start
```


Run the project and access the documentation at:

[http://localhost:3000/doc](http://localhost:3000/doc)

## Screenshots

Data Model:

![ScreenShot](/public/images/ClassDiagram1.png)


API Documentation:

![ScreenShot](/public/images/view_1.png)


## License
[MIT](LICENSE) License