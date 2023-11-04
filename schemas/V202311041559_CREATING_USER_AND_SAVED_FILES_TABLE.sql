create schema file_manager;

create table file_manager.users(
	id UUID primary key,
	full_name VARCHAR(100) not null,
	username VARCHAR(100) not null,
	password VARCHAR(300) not null,
	created_at DATE not null
);

create table file_manager.saved_files(
	id SERIAL PRIMARY KEY,
	file_reference VARCHAR(300) not null,
	created_at DATE not null,
	user_id UUID,
	foreign key (user_id) references file_manager.users(id)
);

CREATE INDEX idx_saved_files_user_id ON file_manager.saved_files(user_id);