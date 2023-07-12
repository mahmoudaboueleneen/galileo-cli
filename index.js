#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (timeInMillis = 2000) => new Promise((resolve) => setTimeout(resolve, timeInMillis));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Welcome to the Galileo Galilei Quiz \n'
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
        ${chalk.bgBlue('HOW TO PLAY: ')}
        I am a process on your computer
        If you get any question wrong I will be ${chalk.bgRed('killed')}
        So get all the questions right...

   `);
}


async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        }
    });

    playerName = answers.player_name;
}


async function askFirstQuestion() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'What year was Galileo born?\n',
        choices: [
            '1642',
            '1564',
            '1498',
            '1388',
        ],
    });
    return handleAnswer(answers.question_1 == '1564');
}


async function askSecondQuestion() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'Was Galileo a college dropout?\n',
        choices: [
            'Yes',
            'No',
        ],
    });
    return handleAnswer(answers.question_2 == 'Yes');
}


async function askThirdQuestion() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: 'Which one of these did Galileo invent?\n',
        choices: [
            'Telephone',
            'Radio',
            'Telescope',
        ],
    });
    return handleAnswer(answers.question_3 == 'Telescope');
}


async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName}. That's correct!` });
    } else {
        spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
        process.exit(1);
    }
}


function winner() {
   console.clear();
   const msg = `Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`;

   figlet(msg, (err, data) => {
    console.log(gradient.fruit.multiline(data));
   })
}

await welcome();
await askName();
await askFirstQuestion();
await askSecondQuestion();
await askThirdQuestion();
await winner();