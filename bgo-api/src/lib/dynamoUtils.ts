import {
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  ScanCommand,
  DynamoDBClient,
  QueryCommandInput,
} from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

class DynamoUtils {
  private client: DynamoDBDocumentClient

  constructor(region?: string) {
    const dynamoDbClient = new DynamoDBClient({
      region: region || process.env.AWS_REGION,
    })
    this.client = DynamoDBDocumentClient.from(dynamoDbClient)
  }

  // async getItem<T>(
  //   tableName: string,
  //   key: Record<string, any>
  // ): Promise<T | undefined> {
  //   const command = new GetItemCommand({ TableName: tableName, Key: key })
  //   const response = await this.client.send(command)
  //   return response.Item as T | undefined
  // }

  async getItem(tableName: string, key: Record<string, any>): Promise<any> {
    const command = new GetItemCommand({ TableName: tableName, Key: key })
    const response = await this.client.send(command)
    return response.Item
  }

  async putItem(tableName: string, item: Record<string, any>): Promise<void> {
    const command = new PutItemCommand({ TableName: tableName, Item: item })
    await this.client.send(command)
  }

  async query(
    tableName: string,
    keyCondition: string,
    expressionValues: Record<string, any>
  ): Promise<any[]> {
    const command = new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: keyCondition,
      ExpressionAttributeValues: expressionValues,
    })
    const response = await this.client.send(command)
    return response.Items || []
  }

  async updateItem(
    tableName: string,
    key: Record<string, any>,
    updateExpression: string,
    expressionValues: Record<string, any>,
    expressionNames?: Record<string, string>
  ): Promise<void> {
    const command = new UpdateItemCommand({
      TableName: tableName,
      Key: key,
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionValues,
      ExpressionAttributeNames: expressionNames,
    })
    await this.client.send(command)
  }

  async deleteItem(tableName: string, key: Record<string, any>): Promise<void> {
    const command = new DeleteItemCommand({ TableName: tableName, Key: key })
    await this.client.send(command)
  }

  async scanTable(tableName: string, limit?: number): Promise<any[]> {
    const command = new ScanCommand({
      TableName: tableName,
      Limit: limit,
    })
    const response = await this.client.send(command)
    return response.Items || []
  }

  async queryPaginate(
    tableName: string,
    keyCondition: string,
    expressionValues: Record<string, any>,
    limit: number
  ) {
    let lastEvaluatedKey = undefined
    let allItems: any[] = []

    do {
      const params: QueryCommandInput = {
        TableName: tableName,
        KeyConditionExpression: keyCondition,
        ExpressionAttributeValues: expressionValues,
        ExclusiveStartKey: lastEvaluatedKey,
        Limit: limit,
      }

      const command = new QueryCommand(params)
      const response = await this.client.send(command)

      if (response.Items) {
        allItems = allItems.concat(response.Items)
      }

      lastEvaluatedKey = response.LastEvaluatedKey
    } while (lastEvaluatedKey)

    return allItems
  }
}

export default DynamoUtils
