import graphene

import ask.schema

class Query(ask.schema.Query, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query)