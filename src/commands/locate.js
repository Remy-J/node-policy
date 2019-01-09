'use strict';
const {Command, flags} = require('@oclif/command');
const path = require('path');
const fs = require('fs');
const util = require('util');
const access = util.promisify(fs.access);

class LocateCommand extends Command {
  async run() {
    const {flags} = this.parse(LocateCommand);
    const policyFilepath = path.resolve(flags.policy);
    try {
      await access(policyFilepath, fs.constants.W_OK);
      if (flags.strict) {
        console.error('error: policy file is writable');
        process.exit(1);
      } else {
        console.error('warning: policy file is writable');
      }
    } catch (e) {}
    console.log(policyFilepath);
  }
}

LocateCommand.args = [
];

LocateCommand.description = `
Prints the location of the policy file, complaining if some common misconfiguration
`;

LocateCommand.flags = Object.assign({
  strict: flags.boolean({
    name: 'strict',
    description: 'exits with an error if policy is misconfigured',
    default: false,
  })
}, require('../flags'));

module.exports = LocateCommand;