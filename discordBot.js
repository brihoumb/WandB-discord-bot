'use strict';
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const { exec } = require('child_process');
let { prefix, token, entity, project, runID, API } = require('./config.json');


client.login(token);
client.once('ready', () => {console.log('Ready!');});
client.on('message', message => {
    try {
        if (message.content.startsWith(`${prefix}ping`)) {
            message.channel.send('Pong.');
        } else if (message.content.startsWith(`${prefix}login `) || message.content === `${prefix}login`) {
            wand_login(message);
        } else if (message.content.startsWith(`${prefix}init `) || message.content === `${prefix}init`) {
            wand_init(message);
        } else if (message.content.startsWith(`${prefix}project list `) || message.content === `${prefix}project list`) {
            wand_project_list(message);
        } else if (message.content.startsWith(`${prefix}run info `) || message.content === `${prefix}run info`) {
            wand_run_info(message);
        } else if (message.content.startsWith(`${prefix}uninstall`)) {
            wand_uninstall(message);
        } else if (message.content.startsWith(`!`) || message.content === `!`) {
            print_usage(message);
        };
    } catch (e) {
        console.error(e);
    };
});

const print_usage = (message) => {
    message.channel.send("```md\n#COMMANDS :\n\n'!help' : Print this Usage.\n"
    + "'!wand login' : login to wandb with you API.\n"
    + "'!wand init' : Initialise your WandBBbot.\n"
    + "'!wand project list' : List all run of a project.\n"
    + "'!wand run info' : Giving you information about last epoch of a run.\n"
    + "'!wand uninstall' : Uninstall your WandBBbot.```");
    return;
};

const wand_login = (message) => {
    const args = message.content.substring(prefix.length + "login ".length).split(' ');
    if (args[0] !== '' && args[0] !== undefined) {
        const config = {
            "token": token,
            "prefix": prefix,
            "API": args[0],
            "entity": entity,
            "project": project,
            "runID": runID
        };
        fs.writeFile('config.json', JSON.stringify(config, null, 2), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("JSON data is saved.");
            };
        });
    };
    console.log(`API: ${API}`);
    exec(`wandb login ${API}`, (err, stdout) => {
        if (err) {
            console.error(err);
            message.channel.send('An error has occurred.');
        } else {
            message.channel.send(stdout);
        };
    });
    return;
};

const wand_init = (message) => {
    const args = message.content.substring(prefix.length + "init ".length).split(' ');
    if ((args[0] !== '' && args[0] !== undefined) && (args[1] !== '' && args[1] !== undefined)) {
        entity = args[0];
        project = args[1];
        const config = {
            "token": token,
            "prefix": prefix,
            "API": API,
            "entity": entity,
            "project": project,
            "runID": runID,
        };
        fs.writeFile('config.json', JSON.stringify(config, null, 2), (err) => {
            if (err) {
                console.log(err);
            } else {
              console.log("JSON data is saved.");
            };
        });
    };
    exec(`python3 ./scripts/wand_init.py ${entity} ${project}`, (err, stdout) => {
        if (err) {
            console.error(err);
            message.channel.send('An error has occurred.');
        } else {
            message.channel.send(stdout);
        };
    });
    return;
};

const wand_project_list = (message) => {
    exec(`python3 ./scripts/wand_project_list.py ${entity} ${project}`, (err, stdout) => {
        if (err) {
            console.error(err);
            message.channel.send('An error has occurred.');
        } else {
            message.channel.send(stdout);
        };
    });
    return;
};

const wand_run_info = (message) => {
    const args = message.content.substring(prefix.length + "run info ".length).split(' ');
    if (args[0] !== '' && args[0] !== undefined) {
        runID = args[0];
        const config = {
            "token": token,
            "prefix": prefix,
            "API": API,
            "entity": entity,
            "project": project,
            "runID": runID
        };
        fs.writeFile('config.json', JSON.stringify(config, null, 2), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("JSON data is saved.");
            };
        });
    };
    exec(`python3 ./scripts/wand_run_info.py ${entity} ${project} ${runID}`, (err, stdout) => {
        if (err) {
            console.error(err);
            message.channel.send('An error has occurred.');
        } else {
            message.channel.send(stdout);
        };
    });
    return;
};

const wand_uninstall = (message) => {
    message.channel.send("GOODBYE");
    message.guild.leave();
    return;
};
