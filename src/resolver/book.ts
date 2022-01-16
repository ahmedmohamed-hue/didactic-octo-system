import { Arg, Query, Resolver } from "type-graphql"
import BookRepository, { BookEntity } from "../database/book"

@Resolver()
export default class BookResolver {
    readonly bookRepository = new BookRepository()

    @Query(() => BookEntity)
    async user(@Arg("id") id: string) {
        return this.bookRepository.findOne(id)
    }
}
