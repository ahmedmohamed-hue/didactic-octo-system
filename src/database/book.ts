import { Field, ObjectType } from "type-graphql"
import Repository, { BaseEntity } from "./repository"

@ObjectType()
export class BookEntity extends BaseEntity {
    @Field()
    name: string
}

export default class BookRepository extends Repository<BookEntity> {
    constructor() {
        super("Book")
    }
}
