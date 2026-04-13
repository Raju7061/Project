FROM confluentinc/cp-kafka-connect:7.6.1

# Debezium Postgres (Java 11 compatible)
RUN confluent-hub install --no-prompt debezium/debezium-connector-postgresql:2.1.4

# Elasticsearch Sink
RUN confluent-hub install --no-prompt confluentinc/kafka-connect-elasticsearch:latest
