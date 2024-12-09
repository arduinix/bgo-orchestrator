import {
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
  QueryCommand,
  UpdateItemCommand,
  UpdateItemCommandInput,
  UpdateItemCommandOutput,
  DeleteItemCommand,
  ScanCommand,
  DynamoDBClient,
  QueryCommandInput,
  PutItemCommandInput,
  PutItemCommandOutput,
  QueryInput,
  DeleteItemCommandInput,
  DeleteItemCommandOutput,
} from '@aws-sdk/client-dynamodb'
// import { TranslateConfig } from '@aws-sdk/lib-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'

export interface GetItemInputUnmarshalled extends Omit<GetItemCommandInput, 'TableName' | 'Key'> {
  Key: Record<string, any>
}

export interface PutItemInputUnmarshalled extends Omit<PutItemCommandInput, 'TableName' | 'Item'> {
  Item: Record<string, any>
}
export interface QueryInputUnmarshalled
  extends Omit<QueryInput, 'TableName' | 'ExpressionAttributeValues'> {
  ExpressionAttributeValues: Record<string, any>
}

export interface UpdateItemInputUnmarshalled
  extends Omit<
    UpdateItemCommandInput,
    'TableName' | 'Key' | 'ExpressionAttributeValues' | 'UpdateExpression'
  > {
  Key: Record<string, any>
}

export interface DeleteItemInputUnmarshalled
  extends Omit<DeleteItemCommandInput, 'TableName' | 'Key'> {
  Key: Record<string, any>
}

class DynamoUtils {
  private client: DynamoDBClient
  private tableName: string

  constructor(tableName: string, region?: string, client?: DynamoDBClient) {
    const dynamoDbClient = new DynamoDBClient({
      region: region || process.env.AWS_REGION,
    })

    this.client = client || dynamoDbClient
    this.tableName = tableName
  }

  async getItem(params: GetItemInputUnmarshalled): Promise<any> {
    const command = new GetItemCommand({
      ...params,
      TableName: this.tableName,
      Key: marshall(params.Key),
    } as GetItemCommandInput)
    const response = await this.client.send(command)
    return response.Item ? unmarshall(response.Item) : undefined
  }

  async putItem(params: PutItemInputUnmarshalled): Promise<PutItemCommandOutput> {
    const command = new PutItemCommand({
      ...params,
      TableName: this.tableName,
      Item: marshall(params.Item),
    } as PutItemCommandInput)
    return await this.client.send(command)
  }

  async query(params: QueryInputUnmarshalled) {
    const command = new QueryCommand({
      ...params,
      TableName: this.tableName,
      ExpressionAttributeValues: marshall(params.ExpressionAttributeValues),
    } as QueryInput)
    const response = await this.client.send(command)
    return response.Items ? response.Items.map((item) => unmarshall(item)) : []
  }

  async updateItem(
    params: UpdateItemInputUnmarshalled,
    updatedRecord: Record<string, any>
  ): Promise<UpdateItemCommandOutput> {
    const updateParams = this.generateUpdateParams(updatedRecord)
    console.log('updateParams', updateParams)
    const command = new UpdateItemCommand({
      ...params,
      TableName: this.tableName,
      Key: marshall(params.Key),
      ...updateParams,
    } as UpdateItemCommandInput)
    const response = await this.client.send(command)
    return response
  }

  async deleteItem(params: DeleteItemInputUnmarshalled): Promise<DeleteItemCommandOutput> {
    const command = new DeleteItemCommand({
      ...params,
      TableName: this.tableName,
      Key: marshall(params.Key),
    } as DeleteItemCommandInput)
    const response = await this.client.send(command)
    return response
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

  generateUpdateParams(updateObject: Record<string, any>): {
    ExpressionAttributeValues: Record<string, any>
    UpdateExpression: string
  } {
    const expressionValues: Record<string, any> = {}
    const updateExpressionParts: string[] = []

    Object.keys(updateObject).forEach((key, index) => {
      const expressionKey = `:value${index}`
      expressionValues[expressionKey] = updateObject[key]
      updateExpressionParts.push(`${key} = ${expressionKey}`)
    })

    const updateExpression = `SET ${updateExpressionParts.join(', ')}`

    return {
      ExpressionAttributeValues: marshall(expressionValues),
      UpdateExpression: updateExpression,
    }
  }
}

export default DynamoUtils
