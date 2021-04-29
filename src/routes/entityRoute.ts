import { Application, json, Request, Response } from 'express'
import fs from 'fs'
import { join } from 'path'

/*
Criando arquivo json para exemplo
Pode ser criada a lógica de conexão ao Banco de Dados aqui.
*/

interface IEntity {
  "attribute": "value",
  "name": "name",
  "other": "other"
}

const filePath = join(__dirname, 'entity.json')
const getEntities = () => {
  const data = fs.existsSync(filePath)
    ? fs.readFileSync(filePath)
    : []

  try {
    return JSON.parse(data.toString())
  } catch (e) {
    return []
  }
}
const saveEntity = (entity: IEntity[]) => fs.writeFileSync(filePath, JSON.stringify(entity))

//Rotas da entidade
const entityRoutes = (app: Application) => {
  app.route('/entities/:id?')
    .get((req: Request, res: Response) => {
      const entities: IEntity[] = getEntities();
      res.send({ entities })
    })
    .post((req: Request, res: Response) => {
      const entities = getEntities()
      entities.push(req.body)
      saveEntity(entities)
    })
    .put((req, res) => {
      const entities: IEntity[] = getEntities()
      saveEntity(entities.map(entity => {
        if (entity.attribute === req.params.attribute) {
          return {
            ...entity,
            ...req.body
          }
        }
        return entity
      }))
      res.status(200).send('OK')
    })
    .delete((req, res) => {
      const entities: IEntity[] = getEntities()
      saveEntity(entities.filter(entity => entity.attribute !== req.params.attribute))
      res.status(200).send('OK')
    })
}

export default entityRoutes