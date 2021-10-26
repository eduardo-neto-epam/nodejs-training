import express from 'express';

const app = express();
const port = 3000;

const sayHelloTo = (name: string) => `Hello ${name}`;

app.get('/', (_req, res) => res.send(sayHelloTo('UK')));

app.listen(port, () => console.log(`Test app listening on port ${port}!`));
