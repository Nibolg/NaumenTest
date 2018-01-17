CREATE SEQUENCE table_name_id_seq;
create table Note (
   id Integer NOT NULL DEFAULT nextval('table_name_id_seq'),
   name VARCHAR,
   content TEXT,
   PRIMARY KEY (id)
);

INSERT INTO note VALUES
    (0, 'first note','content');
INSERT INTO note VALUES
    (0, 'second note','second content');