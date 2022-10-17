
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import 'reflect-metadata'
import { Post } from "../../entities/identity/Post";

const doSleep = (ms:number) => new Promise((res)=>setTimeout(res,ms))
//
// TODO: find a new home for this.  identity is not the right place
//
@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts() : Promise<Post[]> {    
    return Post.find({
        where:{            
        },
        relations:["creator"],
    })
  }

  @Query(()=>Post,{nullable:true})
  post(@Arg("id") id:string) : Promise<Post|undefined> {
    return Post.findOne({
        where: {
            id:id
        }
    })
  }

  @Mutation(()=>Post)
  createPost(
    @Arg("title") title:string,
    @Arg("text") text:string) : Promise<Post>{
    const post = Post.create({title:title, text}).save();
    return post;
  }
}