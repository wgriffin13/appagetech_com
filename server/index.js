const app = require('./app')
const { sync } = require('./db/sync');

const PORT = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0';

if (process.env.NODE_ENV === 'development') {
    console.log('Database syncing')
    sync()
}
app.listen(PORT, host, () => {
    console.log(`Server is listening on port ${PORT} on host ${host}`)
});
