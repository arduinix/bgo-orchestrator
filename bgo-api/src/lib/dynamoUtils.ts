import {
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
  QueryCommand,
  UpdateItemCommand,
  UpdateItemCommandInput,
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
import { marshall, marshallOptions, unmarshall, unmarshallOptions } from '@aws-sdk/util-dynamodb'

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

export interface DynamoUtilsOptions {
  tableName: string
  client?: DynamoDBClient
  marshallingOptions?: marshallOptions
  unmarshallingOptions?: unmarshallOptions
  region?: string
}

class DynamoUtils {
  private client: DynamoDBClient
  private tableName: string
  private marshallingOptions: marshallOptions
  private unmarshallingOptions: unmarshallOptions

  constructor(options: DynamoUtilsOptions) {
    const { tableName, client, marshallingOptions, unmarshallingOptions, region } = options
    const dynamoDbClient = new DynamoDBClient({
      region: region || process.env.AWS_REGION,
    })

    this.client = client || dynamoDbClient
    this.tableName = tableName
    this.marshallingOptions = marshallingOptions || { removeUndefinedValues: true }
    this.unmarshallingOptions = unmarshallingOptions || {}
  }

  async getItem(
    params: GetItemInputUnmarshalled
  ): Promise<{ statusCode?: number; record?: Record<string, any> }> {
    const command = new GetItemCommand({
      ...params,
      TableName: this.tableName,
      Key: this.marshallDefaults(params.Key),
    } as GetItemCommandInput)
    const response = await this.client.send(command)
    // return response.Item ? this.unmarshallDefaults(response.Item) : undefined
    return {
      statusCode: response.$metadata.httpStatusCode,
      record: response.Item ? this.unmarshallDefaults(response.Item) : undefined,
    }
  }

  async putItem(params: PutItemInputUnmarshalled): Promise<{ statusCode?: number }> {
    const command = new PutItemCommand({
      ...params,
      TableName: this.tableName,
      Item: this.marshallDefaults(params.Item),
    } as PutItemCommandInput)
    const response = await this.client.send(command)

    return {
      statusCode: response.$metadata.httpStatusCode,
    }
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
          ? this.marshallDefaults(params.ExpressionAttributeValues)
          : undefined,
        ExclusiveStartKey: lastEvaluatedKey,
      } as QueryInput)

      const response = await this.client.send(command)
      if (response.Items) {
        allItems.push(...response.Items.map((item) => this.unmarshallDefaults(item)))
      }
      lastEvaluatedKey = response.LastEvaluatedKey
    } while (returnAllRecords && lastEvaluatedKey)

    return { items: allItems, lastEvaluatedKey }
  }

  async updateItem(
    params: UpdateItemInputUnmarshalled,
    updatedRecord: Record<string, any>
  ): Promise<{ statusCode?: number; updatedRecord?: Record<string, any> }> {
    const updateParams = this.generateUpdateParams(updatedRecord)
    const command = new UpdateItemCommand({
      ...params,
      TableName: this.tableName,
      Key: this.marshallDefaults(params.Key),
      ...updateParams,
    } as UpdateItemCommandInput)
    const response = await this.client.send(command)
    return {
      statusCode: response.$metadata.httpStatusCode,
      updatedRecord: response.Attributes ? this.unmarshallDefaults(response.Attributes) : undefined,
    }
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
        ? this.marshallDefaults(params.ExpressionAttributeValues)
        : undefined,
    } as ScanInput)
    const response = await this.client.send(command)
    return {
      items: response.Items ? response.Items.map((item) => this.unmarshallDefaults(item)) : [],
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
      if (updateObject[key]) {
        const expressionKey = `:value${index}`
        expressionValues[expressionKey] = updateObject[key]
        updateExpressionParts.push(`${key} = ${expressionKey}`)
      }
    })

    const updateExpression = `SET ${updateExpressionParts.join(', ')}`

    return {
      ExpressionAttributeValues: this.marshallDefaults(expressionValues),
      UpdateExpression: updateExpression,
    }
  }

  marshallDefaults(item: Record<string, any>): Record<string, any> {
    return marshall(item, this.marshallingOptions)
  }

  unmarshallDefaults(item: Record<string, any>): Record<string, any> {
    return unmarshall(item, this.unmarshallingOptions)
  }
}

export default DynamoUtils
export { DynamoDBClient }
