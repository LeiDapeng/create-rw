#! /usr/bin/env node

'use strict';
const chalk = require('chalk');
const commander = require('commander');
const path = require('path');
const fs = require('fs-extra');


// print('RW站在前方为你导航');

//读取配置文件
const packageJson = require('./package.json');

let projectName;
//读取命令行参数
const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .option('-x, --redux', 'Add redux')
  .option('-u, --url', 'from url')
  .action(name=>{projectName=name})


  program.parse(process.argv)

  print(`项目名称:${projectName}`,'yellow')
  fs.ensureDirSync('./'+projectName);

  const root = path.resolve(projectName);
  const template = path.resolve('template');
  const appName = path.basename(root);

  print(`当前目录:${root}`,'yellow')
  // print(`当前目录:${appName}`,'yellow')
  print('========选择组件========');
  if (program.redux) console.log('redux插件');
  print('========================');


  const currentFiles = fs.readdirSync(path.join(template));

  fs.copy(template, root, function(err) {
    if (err) return console.error(err)
    console.log("success!")
  });

  function print(text,color='cyan'){
    console.log(chalk[color](text))
  }

