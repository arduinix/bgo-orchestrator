import {
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
  QueryCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  ScanCommand,
  DynamoDBClient,
  QueryCommandInput,
  PutItemCommandInput,
  PutItemCommandOutput,
  QueryInput,
} from '@aws-sdk/client-dynamodb'
// import { TranslateConfig } from '@aws-sdk/lib-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'

class DynamoUtils {
  private client: DynamoDBClient
  private tableName: string

  constructor(tableName: string, region?: string, client?: DynamoDBClient) {
    const dynamoDbClient = new DynamoDBClient({
      region: region || process.env.AWS_REGION,
    })
    // const translateConfig: TranslateConfig = {
    //   marshallOptions: {
    //     removeUndefinedValues: true,
    //     convertEmptyValues: true,
    //     convertClassInstanceToMap: true,
    //   },
    //   unmarshallOptions: {
    //     wrapNumbers: false,
    //   },
    // }
    this.client = client || dynamoDbClient
    this.tableName = tableName
  }

  async getItem(key: Record<string, any>, projectionExpression?: string): Promise<any> {
    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: marshall(key),
      ProjectionExpression: projectionExpression,
    } as GetItemCommandInput)
    const response = await this.client.send(command)
    return response.Item ? unmarshall(response.Item) : undefined
  }

  async putItem(item: Record<string, any>): Promise<PutItemCommandOutput> {
    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: marshall(item),
    } as PutItemCommandInput)
    return await this.client.send(command)
  }

  // async query({
  //   keyConditionExpression,
  //   expressionAttributeNames,
  //   expressionAttributeValues,
  //   filterExpression,
  //   indexName,
  // }: {
  //   keyConditionExpression?: string
  //   expressionAttributeNames?: Record<string, string>
  //   expressionAttributeValues?: Record<string, any>
  //   filterExpression?: string
  //   indexName?: string
  // }): Promise<any[]> {
  //   const command = new QueryCommand({
  //     TableName: this.tableName,
  //     KeyConditionExpression: keyConditionExpression,
  //     ExpressionAttributeNames: expressionAttributeNames,
  //     ExpressionAttributeValues: marshall(expressionAttributeValues),
  //     FilterExpression: filterExpression,
  //     IndexName: indexName,
  //   } as QueryInput)
  //   console.log('Query command:', command)
  //   const response = await this.client.send(command)
  //   console.log('Query response:', response)
  //   return response.Items ? response.Items.map((item) => unmarshall(item)) : []
  // }

  async query(params: QueryInput) {
    const command = new QueryCommand(params)
    const response = await this.client.send(command)
    return response.Items ? response.Items.map((item) => unmarshall(item)) : []
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
