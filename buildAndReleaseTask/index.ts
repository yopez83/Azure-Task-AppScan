import tl = require('azure-pipelines-task-lib/task');

async function run() {
    try {
        const keyId: string = tl.getInput('keyId', true);
        if (keyId == '') {
            tl.setResult(tl.TaskResult.Failed, 'Key Id cannot be empty');
            return;
        }

        const keySecret: string = tl.getInput('keySecret', true);
        if (keySecret == '') {
            tl.setResult(tl.TaskResult.Failed, 'Key Secret cannot be empty');
            return;
        }

        const scanId: string = tl.getInput('scanId', true);
        if (scanId == '') {
            tl.setResult(tl.TaskResult.Failed, 'Scan Id cannot be empty');
            return;
        }
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();