-- Create Users table
-- In a future iteration, I would implement is_admin to default false and add additional admin routes
CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR(25),
  password TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create PokePets table
CREATE TABLE pokePets (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    PokemonId VARCHAR(255) NOT NULL,
    Image VARCHAR(255),
    Type VARCHAR(255) NOT NULL
);

-- Create Pet table
CREATE TABLE userPet (
    ID SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    PokePetId INT NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Image VARCHAR(255),
    Hunger INT DEFAULT 50,
    Happiness INT DEFAULT 50,
    Health INT DEFAULT 100,
    FOREIGN KEY (PokePetId) REFERENCES pokePets(ID),
	lastInteraction TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(ID)
);
	
CREATE OR REPLACE FUNCTION update_last_interaction()
	RETURNS TRIGGER AS $$
	BEGIN
	    NEW.lastInteraction = CURRENT_TIMESTAMP;
	    RETURN NEW;
	END;
	$$ LANGUAGE plpgsql;

	
CREATE TRIGGER update_last_interaction_trigger
	BEFORE UPDATE ON userPet
	FOR EACH ROW
	EXECUTE FUNCTION update_last_interaction();


-- Create Interaction log table
CREATE TABLE interactionLog (
    ID SERIAL PRIMARY KEY,
    userId INT,
    petId INT,
    interactionType VARCHAR(255) NOT NULL,
    effectOnHunger INT,
    effectOnHappiness INT,
    effectOnHealth INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(ID),
    FOREIGN KEY (petId) REFERENCES userPet(ID)
);


