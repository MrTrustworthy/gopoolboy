const sleep = timeInMs =>
    new Promise(resolve => {
        setTimeout(resolve, timeInMs);
    });


const waitFor = (
    fn,
    {delay = 50, maxWait = 10000, timeoutMessage = 'Timeout', ignoreTimeout = false} = {}
) => {
    let timeoutId;
    let totalWait = 0;
    let fulfilled = false;

    const checkCondition = async (resolve, reject) => {
        totalWait += delay;
        await sleep(delay);

        try {
            const result = await fn(totalWait);
            if (result) {
                fulfilled = true;
                clearTimeout(timeoutId);
                return resolve(result);
            }

            checkCondition(resolve, reject);
        } catch (e) {
            fulfilled = true;
            clearTimeout(timeoutId);
            reject(e);
        }
    };

    return new Promise((resolve, reject) => {
        checkCondition(resolve, reject);

        if (ignoreTimeout) {
            return;
        }

        timeoutId = setTimeout(() => {
            if (!fulfilled) {
                return reject(new Error(timeoutMessage));
            }
        }, maxWait);
    });
};

module.exports = {waitFor};