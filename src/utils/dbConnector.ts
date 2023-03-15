import { PrismaClient } from "@prisma/client";
import { SecretsManager } from "aws-sdk"

type SECRET_STRING = {
  username: string;
  password: string;
  host: string;
  port: string;
  dbname: string;
}

const sm = new SecretsManager()

let db: PrismaClient

export const getDB = async (secretId: string) => {
  if (db) return db;

  const dbUrl = await sm.getSecretValue({
    SecretId: secretId || ''
  }).promise()

  const secretString: SECRET_STRING =  JSON.parse(dbUrl.SecretString || '{}')

  const url = `postgresql://${secretString.username}:${secretString.password}@${secretString.host}/${secretString.dbname}?connection_limit=1`

  db = new PrismaClient({
    datasources: {db: {url}}
  })

  return db;
}