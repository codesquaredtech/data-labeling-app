import mongoose from 'mongoose';

const createResourceDbConnection = (projectId: string): mongoose.Connection => {
  return mongoose.createConnection(
    `mongodb+srv://luka:mu0YV2Xh2WiY4xdi@cluster0.vgobtyd.mongodb.net/resources_${projectId}?retryWrites=true&w=majority`,
  );
};

export const checkResourcesDbConnection = (
  connection: mongoose.Connection,
  projectId: string,
): mongoose.Connection => {
  // if connection doesn't exist we create connection
  if (!connection) {
    return createResourceDbConnection(projectId);
  }
  // if connection exists but name is different than projectId we close previous connection and create new one
  else if (connection.name !== `resources_${projectId}`) {
    connection.close();
    return createResourceDbConnection(projectId);
  }
  return connection;
};
