import {
  defineEnt,
  defineEntSchema,
  getEntDefinitions,
  defineEntFromTable
} from 'convex-ents';
import { migrationsTable } from 'convex-helpers/server/migrations';

import { v } from 'convex/values';

const schema = defineEntSchema(
  {
    migrations: defineEntFromTable(migrationsTable),
    emailList: defineEnt({
      email: v.string(),
      type: v.string(),
      message: v.optional(v.string())
    })
      .index('byEmail', ['email'])
      .index('byType', ['type']),

    messages: defineEnt({
      author: v.string(),
      body: v.string()
    }),
    users: defineEnt({
      tokenIdentifier: v.string(),
      relationshipId: v.optional(v.string()),
      updatedAt: v.optional(v.string()),
      isDeleted: v.boolean(),
      nickName: v.string(),
      email: v.string(),
      role: v.union(v.literal('standard'), v.literal('admin')),
      dob: v.optional(v.string()),
      gender: v.optional(v.string()),
      ethnicity: v.optional(v.string()),
      numberOfChildren: v.optional(v.number())
    })
      .index('byEmail', ['email'])
      .index('byToken', ['tokenIdentifier'])
      .index('byRelationshipId', ['relationshipId'])
      .edges('userRelationships', {
        to: 'relationships',
        ref: 'relationshipId'
      }),

    relationships: defineEnt({
      startedAt: v.optional(v.string()),
      endedAt: v.optional(v.string()),
      updatedAt: v.optional(v.string()),
      user1: v.id('users'),
      user2: v.id('users'),
      relationshipStatus: v.union(
        v.literal('pending'),
        v.literal('accepted'),
        v.literal('rejected')
      ),
      relationshipLength: v.union(
        v.literal('short'),
        v.literal('long'),
        v.literal('medium')
      ),
      goal: v.union(
        v.literal('friendship'),
        v.literal('family'),
        v.literal('romantic'),
        v.literal('business')
      )
    }).edge('userRelationship', { to: 'users', field: 'relationshipId' })
  },

  {
    schemaValidation: true
  }
);

export default schema;

export const entDefinitions = getEntDefinitions(schema);
