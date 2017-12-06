Create keyspace :

cqlsh <ip> <port> -u <username> -p <password> --cqlversion=3.4.4 -e "CREATE KEYSPACE sharelet WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 2};"

Import SCHEMA :

cqlsh 192.168.2.5 9042 -u cassandra -p cassandra -k sharelet_dev --cqlversion=3.4.4 -f schema.cql

