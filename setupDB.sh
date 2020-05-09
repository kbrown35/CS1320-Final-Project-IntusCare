#!/usr/bin/env bash

# install postgres (for Mac)
#brew install postgresql;

# If postgres hasn't automatically started after installation, then you'll need to run this cmd:
# brew services start postgresql  

# If running this returns an an error:
# "2020-04-30 06:56:19.647 EDT [53598] FATAL:  lock file "postmaster.pid" already exists
# 2020-04-30 06:56:19.647 EDT [53598] HINT:  Is another postmaster (PID 11327) running in data directory "/usr/local/var/postgres"?"
# that means that postgres is already running, and you should be able to proceed without this command
# postgres -D /usr/local/var/postgres;
psql -c "CREATE ROLE intusadmin WITH LOGIN PASSWORD 'cs132';" -d postgres;

psql -c "ALTER ROLE intusadmin CREATEDB;" -d postgres;
# Check that the role intusadmin has been created
psql -c "\du;" -d postgres;

# Using role intusadmin, create intus db and populate it with tables, 
# trigger functions, and some preliminary data. To make sure you are 
# starting fresh, drop any old versions of the database first

psql -c "DROP DATABASE IF EXISTS intus;" -d postgres -U intusadmin;
psql -c "CREATE DATABASE intus;" -d postgres -U intusadmin;

# psql -c "DROP TABLE patients CASCADE;" -d postgres -U intusadmin;
# psql -c "DROP TABLE form_data CASCADE;" -d postgres -U intusadmin;

psql -f database/nodePostgres/createTables.sql -d intus -U intusadmin;

psql -f database/nodePostgres/createFunctions.sql -d intus -U intusadmin;
 
psql -f database/nodePostgres/enterData.sql -d intus -U intusadmin;

# Install node's pg module that will allow us to connect to postgres via a node API.
# (If you initialized the repo with runnig npm init, this will have been done for you already,
# since this  module is listed as a dependency in package.json)
# npm install pg;

# Start the node server that connects to the above postgres db

node database/nodePostgres/postgresAPI.js;

# You should get a message that the server is running on port 3001. 








