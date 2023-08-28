import inquirer from 'inquirer';

export default class Asks {
    async StartAsk() {
        const questions = 
        [{
            name : 'Меню',
            type: 'list',
            message : 'Выберете функцию из списка :',
            choices : ['Добавить игру', 'Найти игру', 'Удалить игру', 'Изменить игру', 'Все игры']
        }];

        const answers = await inquirer.prompt(questions);
        return answers['Меню'];
    };

    async InsertGameAsk() {
        const answers = await inquirer.prompt([{
            name : 'GameData',
            type : 'input',
            message : 'Напишите через пробел информацию : Название_игры Издателя Год_создания'
        }]);

        return answers.GameData;
    };

    async FindGame() {
        const answer = await inquirer.prompt([{
            name : 'FindGame',
            type : 'input',
            message : 'Напишите один и параметром для поиска :'
        }]);

        return answer.FindGame;
    };

    async ActionGame() {
        const answer = await inquirer.prompt([{
            name : 'ActionGame',
            type : 'input',
            message : 'Напишите айди игры, которую нужно изменить/удалить :'
        }]);

        return answer.ActionGame;
    }
};