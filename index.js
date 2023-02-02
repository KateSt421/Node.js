const fs = require('fs')
const readline = require('readline')

const readStream = fs.createReadStream('./access_tmp.log', 'utf8')
const writeStream1 = fs.createWriteStream('./89.123.1.41_requests.log')
const writeStream2 = fs.createWriteStream('./34.48.240.111_requests.log')

const rl = readline.createInterface({
    input: readStream,
    terminal: true,
})

rl.on('line', line => {
    if (line.includes('89.123.1.41')) {
        writeStream1.write(line + '\n')
    }

    if (line.includes('34.48.240.111')) {
        writeStream2.write(line + '\n')
    }
})
const showRemainingTime = (dateInFuture) => {
    const dateNow = new Date();

    if (dateNow >= dateInFuture) {
        emmitter.emit('timerEnd');
    } else {
        const currentDateFormatted = moment(dateNow, DATE_FORMAT_PATTERN);
        const futureDateFormatted = moment(dateInFuture, DATE_FORMAT_PATTERN);
        const diff = moment.preciseDiff(currentDateFormatted, futureDateFormatted);

        console.clear();
        console.log(diff);
    }
};

const showTimerDone = (timerId) => {
    clearInterval(timerId);
    console.log('Таймер истек');
};
const emmitter = new EventEmitter();
const dateInFuture = getDateFromDateString(dateStringInFuture);
const timerId = setInterval(() => {
    emmitter.emit('timerTick', dateInFuture);
}, 1000)

emmitter.on('timerTick', showRemainingTime);
emmitter.on('timerEnd', () => {
    showTimerDone(timerId);
});
