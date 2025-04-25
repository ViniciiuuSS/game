// Define MongoDB document interface
interface MongoDocument {
  score: number;
  statusButtons: {
    A: boolean;
    B: boolean;
    X: boolean;
    Y: boolean;
  };
  statusAutoButtons: {
    A: boolean;
    B: boolean;
    X: boolean;
    Y: boolean;
  };
}

// Define MongoDB filter interface
interface MongoFilter {
  _id?: string;
}

// Define MongoDB update interface
interface MongoUpdate {
  score: number;
  statusButtons: {
    A: boolean;
    B: boolean;
    X: boolean;
    Y: boolean;
  };
  statusAutoButtons: {
    A: boolean;
    B: boolean;
    X: boolean;
    Y: boolean;
  };
}

// Define MongoDB response interfaces
interface MongoInsertResponse {
  insertedId: string;
}

interface MongoUpdateResponse {
  matchedCount: number;
  modifiedCount: number;
}

interface MongoDeleteResponse {
  deletedCount: number;
}

if (!process.env.MONGODB_API_KEY) {
  throw new Error("Please define the MONGODB_API_KEY environment variable inside .env");
}

if (!process.env.MONGODB_CLUSTER_URL) {
  throw new Error("Please define the MONGODB_CLUSTER_URL environment variable inside .env");
}

const MONGODB_API_KEY = process.env.MONGODB_API_KEY;
const MONGODB_CLUSTER_URL = process.env.MONGODB_CLUSTER_URL;

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Request-Headers": "*",
  "api-key": MONGODB_API_KEY,
};

// Função auxiliar para gerar ID único
function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function findDocuments(database: string, collection: string, filter?: MongoFilter) {
  const url = `${MONGODB_CLUSTER_URL}/action/find`;

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      dataSource: "Cluster0",
      database,
      collection,
      filter: filter || {},
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.documents;
}

export async function insertDocument(database: string, collection: string, document: MongoDocument): Promise<MongoInsertResponse> {
  const url = `${MONGODB_CLUSTER_URL}/action/insertOne`;

  const id = generateId();
  
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      dataSource: "Cluster0",
      database,
      collection,
      document: {
        _id: id,
        score: document.score,
        statusButtons: document.statusButtons,
        statusAutoButtons: document.statusAutoButtons
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return { insertedId: id };
}

export async function updateDocument(database: string, collection: string, filter: MongoFilter, update: MongoUpdate): Promise<MongoUpdateResponse> {
  const url = `${MONGODB_CLUSTER_URL}/action/updateOne`;

  console.log('Dados recebidos para update:', { filter, update });

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      dataSource: "Cluster0",
      database,
      collection,
      filter: filter || {},
      update: { 
        $set: { 
          score: update.score,
          statusButtons: {
            A: update.statusButtons.A,
            B: update.statusButtons.B,
            X: update.statusButtons.X,
            Y: update.statusButtons.Y
          },
          statusAutoButtons: {
            A: update.statusAutoButtons.A,
            B: update.statusAutoButtons.B,
            X: update.statusAutoButtons.X,
            Y: update.statusAutoButtons.Y
          }
        } 
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log('Resposta do MongoDB:', data);
  return data;
}

export async function deleteDocument(database: string, collection: string, filter: MongoFilter): Promise<MongoDeleteResponse> {
  const url = `${MONGODB_CLUSTER_URL}/action/deleteOne`;

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      dataSource: "Cluster0",
      database,
      collection,
      filter,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
