import sqlite3 from 'sqlite3';

sqlite3.verbose();

export default class DB {
    constructor(DB_name) {
        this.db = new sqlite3.Database(DB_name);
        this.init();
    };

    init() {
        this.db.run('CREATE TABLE IF NOT EXISTS all_games (id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, companyName TEXT, CreatedAt TEXT)');
    };
    
    addGame(data) {
        if(data.split(' ').length !== 0 && data.split(' ').length === 3) {
          const name = data.split(' ')[0];
          const company = data.split(' ')[1];
          const year = data.split(' ')[2];

          this.db.run('INSERT INTO all_games (name, companyName, CreatedAt) VALUES (?, ?, ?)', [name, company, year], function (err) {
            if(err) {
                console.log('Error :');
                if(err.message.includes('UNIQUE')) {
                    console.log('Такая игра уже существует');
                } else {
                    console.log(err.message);
                };
            } else {
                console.log('Игра успешно добавлена');
            }
        });
    } else {
        this.errorMess();
    };
    };

    findGame(...params) {
        this.db.all('SELECT * FROM all_games WHERE name LIKE ? OR companyName LIKE ? OR CreatedAt LIKE ?', [...params, ...params, ...params], (err, rows) => {
            rows.forEach(row => {
                console.log('Айди : ' + row.id + ';' + ' Имя : ' + row.name + ';' + ' Издатель : ' + row.companyName + ';' + ' Дата выхода : ' + row.CreatedAt + ';');
            });
        });
    };

    allGames() {
        this.db.all('SELECT * FROM all_games', [], (err, rows) => {
            rows.forEach(row => {
                console.log('Айди : '+ row.id + ';' + ' Имя : '+ row.name + ';' + ' Издатель : '+ row.companyName + ';' + ' Дата выхода : '+ row.CreatedAt + ';');
            });
        });
    };
    
    deleteGame(Id) {
        this.db.run('DELETE FROM all_games WHERE id = ?', [Id], function(err) {
            if(err == null) {
                console.log('Игру не найдено');
            } else {
                console.log('Игру под айди ' + Id + ' удалено');
            }
        });
    };

    editGame(Data, Id) {
        if(Data.split(' ').length !== 0 && Data.split(' ').length === 3) {
        const NewName = Data.split(' ')[0];
        const NewCompany = Data.split(' ')[1];
        const NewCreated = Data.split(' ')[2];
        this.db.run('UPDATE all_games SET name = ?, companyName = ?, CreatedAt = ? WHERE id = ?', [NewName, NewCompany, NewCreated, Id], function(err) {
            if(err) {
                console.log('Error :');
                if(err.message.includes('UNIQUE')) {
                    console.log('Игра с таким названием уже существует');
                } else {
                    console.log(err.message);
                }
            } else {
                console.log('Игра успешно изменина');
            }
        });
        } else {
            this.errorMess();
        }
    };

    errorMess() {
        return console.log('Данные заполнены не верно');
    }
}