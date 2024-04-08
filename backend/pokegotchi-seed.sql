-- both users password = "password"

-- users data
INSERT INTO users (username, password, email, is_admin)
VALUES ('rian',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'rian@email.com',
        TRUE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'supreme@ruler.com',
        TRUE);

-- pokepets data
INSERT INTO pokepets (Name, PokemonId, Image, Type)
VALUES ('Bulbasaur', '1', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/1.gif', 'Grass'),
        ('Charmander', '4', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/4.gif', 'Fire'),
        ('Squirtle', '7', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/7.gif', 'Water'),
        ('Pikachu', '25', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/25.gif', 'Electric'),
        ('Jigglypuff', '39', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/39.gif', 'Normal'),
        ('Meowth', '52', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/52.gif', 'Normal'),
        ('Psyduck', '54', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/54.gif', 'Water'),
        ('Growlithe', '58', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/58.gif', 'Fire'),
        ('Poliwag', '60', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/60.gif', 'Water'),
        ('Abra', '63', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/63.gif', 'Psychic'),
        ('Machop', '66', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/66.gif', 'Fighting'),
        ('Geodude', '74', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/74.gif', 'Rock'),
        ('Slowpoke', '79', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/79.gif', 'Water'),
        ('Magnemite', '81', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/81.gif', 'Electric'),
        ('Doduo', '84', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/84.gif', 'Normal'),
        ('Dewgong', '87', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/87.gif', 'Water'),
        ('Grimer', '88', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/88.gif', 'Poison'),
        ('Shellder', '90', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/90.gif', 'Water'),
        ('Gastly', '92', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/92.gif', 'Ghost'),
        ('Onix', '95', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/95.gif', 'Rock'),
        ('Drowzee', '96', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/96.gif', 'Psychic'),
        ('Krabby', '98', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/98.gif', 'Water'),
        ('Voltorb', '100', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/100.gif', 'Electric'),
        ('Exeggcute', '102', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/102.gif', 'Grass'),
        ('Cubone', '104', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/104.gif', 'Ground'),
        ('Hitmonlee', '106', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/106.gif', 'Fighting'),
        ('Koffing', '109', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/109.gif', 'Poison'),
        ('Rhyhorn', '111', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/111.gif', 'Ground'),
        ('Chansey', '113', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/113.gif', 'Normal'),
        ('Tangela', '114', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/114.gif', 'Grass'),
        ('Kangaskhan', '115', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/115.gif', 'Normal'),
        ('Horsea', '116', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/116.gif', 'Water'),
        ('Goldeen', '118', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/118.gif', 'Water'),
        ('Staryu', '120', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/120.gif', 'Water'),
        ('Mr. Mime', '122', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/122.gif', 'Psychic'),
        ('Scyther', '123', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/123.gif', 'Bug'),
        ('Jynx', '124', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/124.gif', 'Ice'),
        ('Electabuzz', '125', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/125.gif', 'Electric'),
        ('Magmar', '126', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/126.gif', 'Fire'),
        ('Pinsir', '127', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/127.gif', 'Bug'),
        ('Tauros', '128', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/128.gif', 'Normal'),
        ('Magikarp', '129', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/129.gif', 'Water'),
        ('Lapras', '131', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/131.gif', 'Water'),
        ('Ditto', '132', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/132.gif', 'Normal'),
        ('Gengar', '94', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/94.gif', 'Ghost');


       