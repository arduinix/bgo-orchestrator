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
  PutItemCommandInput,
  PutItemCommandOutput,
  QueryInput,
  DeleteItemCommandInput,
  DeleteItemCommandOutput,
  ScanInput,
} from '@aws-sdk/client-dynamodb'
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

export interface ScanInputUnmarshalled
  extends Omit<ScanInput, 'TableName' | 'ExpressionAttributeValues'> {
  ExpressionAttributeValues?: Record<string, any>
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

  async query(
    params: QueryInputUnmarshalled,
    returnAllRecords: boolean = false
  ): Promise<{ items: any[]; lastEvaluatedKey: any }> {
    const allItems: any[] = []
    let lastEvaluatedKey: any = null

    do {
      const command = new QueryCommand({
        ...params,
        TableName: this.tableName,
        ExpressionAttributeValues: params.ExpressionAttributeValues
          ? marshall(params.ExpressionAttributeValues, {
              removeUndefinedValues: true,
            })
          : undefined,
        ExclusiveStartKey: lastEvaluatedKey,
      } as QueryInput)

      const response = await this.client.send(command)
      if (response.Items) {
        allItems.push(...response.Items.map((item) => unmarshall(item)))
      }
      lastEvaluatedKey = response.LastEvaluatedKey
    } while (returnAllRecords && lastEvaluatedKey)

    return { items: allItems, lastEvaluatedKey }
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

  async scan(params: ScanInputUnmarshalled): Promise<{ items: any[]; lastEvaluatedKey: any }> {
    const command = new ScanCommand({
      ...params,
      TableName: this.tableName,
      ExpressionAttributeValues: params.ExpressionAttributeValues
        ? marshall(params.ExpressionAttributeValues, {
            removeUndefinedValues: true,
          })
        : undefined,
    } as ScanInput)
    const response = await this.client.send(command)
    return {
      items: response.Items ? response.Items.map((item) => unmarshall(item)) : [],
      lastEvaluatedKey: response.LastEvaluatedKey,
    }
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
