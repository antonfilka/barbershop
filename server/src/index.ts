import { dbContext } from './db/dbContext';
import server from './server';

const OPTIONAL_PORT = 8000;

const port = process.env.PORT || OPTIONAL_PORT;

Promise.all([dbContext.connect()])
  .then(() => {
    server.listen(port, () => {
      console.info(`Server is started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(`Server is started with error`);
    throw err;
  });
