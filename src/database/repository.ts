import { Field, ObjectType } from "type-graphql"
import db from "."

export type ID = string | number

interface IRepository<T> {
    findOne: (id: ID) => Promise<T>
    findAll: () => Promise<T[]>
    create: (data: T) => Promise<T>
    update: (data: T) => Promise<T>
    // delete: (id: string) => Promise<T>
    // save: (data?: T) => Promise<void>
}

@ObjectType()
export class BaseEntity {
    @Field(() => String)
    id: ID

    @Field()
    updatedAt: Date

    @Field()
    createdAt: Date
}

export default class Repository<T extends BaseEntity> implements IRepository<T> {
    protected connection = db
    private readonly tableName: string

    constructor(name: string) {
        this.tableName = name
    }

    async findOne(id: string) {
        const sql = `SELECT * FROM "${this.tableName}" WHERE id = $1 LIMIT 1`
        const result = await this.connection.query<T>(sql, [id])

        return result.rows[0]
    }

    async findAll() {
        const sql = `SELECT * FROM "${this.tableName}"`
        const result = await this.connection.query<T>(sql)

        return result.rows
    }

    async create(data: Omit<T, "id" | "createdAt" | "updatedAt">) {
        const sql = `INSERT INTO "${this.tableName}" (${Object.keys(data).join(", ")}) VALUES ('${Object.values(
            data,
        ).join("','")}') RETURNING *`

        const result = await this.connection.query<T>(sql)

        return result.rows[0]
    }

    async update(data: Partial<Omit<T, "createdAt" | "updatedAt">>) {
        const set = Object.keys(data)
            .filter((key) => key !== "id")
            .map((key) => `"${key}"='${data[key]}'`)
            .join(",")

        const sql = `UPDATE "${this.tableName}" SET ${set} WHERE id = $1 RETURNING *`

        console.log(sql)

        const result = await this.connection.query<T>(sql, [data.id])

        return result.rows[0]
    }
}
