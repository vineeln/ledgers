import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Post } from './Post';
import { Tenant } from './Tenant';

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Field()
    @Column({ unique: true })
    username!: string;
  
    @Column()
    password!: string;

    @Column({ unique: true })
    email!: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt!: Date;
  
    @Field(() => String)
    @UpdateDateColumn()
    updatedAt!: Date;

    @Field()
    @Column({nullable:true})
    firstName!: string;
    
    @Field()
    @Column({nullable:true})
    lastName!: string;

    @Field(()=>[Post])
    @OneToMany(() => Post, (post) => post.creator)
    posts: Post[];

    @OneToOne(()=>Tenant)
    @JoinColumn()
    tenant?: Tenant
}