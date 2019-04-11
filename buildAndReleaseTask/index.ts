import tl = require('azure-pipelines-task-lib/task');

async function run() {
    try {
        const scanName: string = tl.getInput('scanName', true);
        if (scanName == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }
        console.log('Initiating scanning for ', scanName);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();