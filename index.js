import DB from './Database.js';
import Asks from './ask.js';

const Db = new DB('./FileDB/Games.sqlite3');
const Ask = new Asks();

(async function() {
    // while(true) {
    const func = await Ask.StartAsk();
    switch (func) {
        case 'Добавить игру' :
            const InsertData = await Ask.InsertGameAsk();
            Db.addGame(InsertData);
            break;
        case 'Все игры' :
            Db.allGames();
            break;
        case 'Найти игру' :
            const Param = await Ask.FindGame();
            Db.findGame(Param);
            break;
        case 'Удалить игру' :
            const DeleteId = await Ask.ActionGame();
            Db.deleteGame(DeleteId);
            break;
        case 'Изменить игру' :
            const EditId = await Ask.ActionGame();
            const EditData = await Ask.InsertGameAsk();
            Db.editGame(EditData, EditId);
            break;
    };
// }
})();
