const clear = require('clear');
const helpers = require('../helpers');
const chalk = require('chalk');

let lessonList = [
    'intro',
    'let-const',
    'arrow',
    //'for-of',
    'template-strings',
    //'arg-spread',
    //'obj-method',
    'property-shorthand',
    //'no-strict',
    //'commonjs',
    'default-params',
    //'class',
    //'includes',
    'finish'
];

let lessons = [];
for (let name of lessonList) lessons.push (require('./' + name));

let index = 0;

let transform = (lesson) => {
    clear();
    console.log(chalk.green(lesson.title));

    console.log();
    console.log(`Let's transform our code to use ${chalk.blue(lesson.prettyName)}`);
    console.log();
    helpers.pause();
    console.log();

    if (lesson.transform) helpers.transform(lesson.transform);

    require('child_process').execSync('git diff --stat', {stdio:[0,1,2]});

    console.log();
    console.log(`Done! Use ${chalk.yellow('git diff')} to see the changes`);
    console.log(`You can commit these changes or you can stash/checkout them.`);
    console.log();
    console.log(`You can continue your lesson by typing ${chalk.yellow('learn')}`);
    console.log();
    helpers.progress.save(index + 1);
};

let start = () => {
    index = helpers.progress.get();
    let lesson = lessons[index];
    clear();
    helpers.render(lesson);
    helpers.pause();
    if (lesson.transform) transform(lesson);
    else if (index < lessons.length - 1) {
        helpers.progress.save(index + 1);
        start();
    } else if (index === lessons.length -1) helpers.progress.save(0);
};

module.exports = {
    start
};

