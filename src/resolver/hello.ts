import { Arg, Int, Mutation, Query, Resolver } from "type-graphql"

@Resolver()
export default class HelloResolver {
    @Query(() => String)
    hello() {
        return "Hello from typegraphql"
    }

    @Mutation(() => Int)
    square(@Arg("n", () => Int) n: number) {
        return n * n
    }
}
