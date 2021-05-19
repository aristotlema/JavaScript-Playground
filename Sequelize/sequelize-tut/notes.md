#setup connection with CLI

#sequelize cli
npm install -g sequelize-cli

sequelize init

sequelize - shows all commands

create model cli
sequelize model:generate --name User --attributes name:string,email:string,role:string