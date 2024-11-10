setTimeout(() => {
    throw new Error('error.js');
}, 300);

process.on('uncaughtException', (err) => {
    console.log('uncaughtException', err);
});

process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection', err);
});