# WandB-discord-bot #
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![python](https://img.shields.io/badge/python-3.6-brightgreen)![wandb](https://img.shields.io/badge/wandb-0.10.4-green)
![node](https://img.shields.io/badge/node-14.10.1-red)![discordjs](https://img.shields.io/badge/discordjs-12.3.1-orange)  
A Weights and Biases bot for discord.  
Made by Alzate_J and @brihoumb.

## Usage: ##
Edit the `config.json` file like following:
```json
{
  "token": "Your discord bot token",
  "prefix": "Prefix to use the bot (default to '!wand ')",
  "API": "Your wandb api (can be set with !wand login)",
  "entity": "Your wandb entity name (can be set with !wand init)",
  "project": "Your wandb targeted project (can be set with !wand init)",
  "runID": "Your wandb run ID (can be set with !wand run info)"
}
```  
Install `python3.6` or higher and the `requirement.txt`.  
Then run `npm start` to start the bot.

## List of commands: ##
``!wand login [API]``  
> Take in parameter your API key then set it in config.json.  
> It return your API_key, the name of your entity and your project selected.  
> ![login_return](screenshots/login.png)

---

``!wand init [entity] [project]``  
> Take in parameter your entity and project name then set them in config.json.  
> It return your API_key, the name of your entity and your project selected.  
> ![init_return](screenshots/init.png)

---

``!wand project list``
> List all your runs in the initialised project.  
> Display the name of the run and its ID  
> ![list_return](screenshots/list.png)

---

``!wand run info [runID]``
> Take in parameter your runID you want to target then set it in config.json.  
> Display all parameters set in your wandb initialisation.  
> Then display the following information [project][id][time running][epoch]
- acc   
- val_acc  
- loss  
- val_loss  
- diff between epoch n and epoch n-1  
>![info_return](screenshots/run.png)

## Contributing: ##
Feel free to fork or create a pull request of the project.
