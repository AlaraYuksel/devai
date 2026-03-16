#!/usr/bin/env node
import { Command } from 'commander';
import { commitCommand } from './commands/commit.js';
import { globalLocalChangerCommand, localGlobalChangerCommand } from './commands/local-global-changer.js';
import { registerCommand } from './commands/auth-commands.js';

// Yeni bir komut satırı programı 
const program = new Command();

program
  .name('devai')
  .description('Yapay zeka destekli geliştirici asistani')
  .version('1.0.0');


program.addCommand(commitCommand);
program.addCommand(localGlobalChangerCommand);
program.addCommand(globalLocalChangerCommand);
program.addCommand(registerCommand);

program.parse();