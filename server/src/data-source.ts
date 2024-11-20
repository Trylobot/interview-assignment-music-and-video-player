import "reflect-metadata"
import { DataSource } from "typeorm"
// import { User } from "./entity/User"
import { Video } from "./entity/Video"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "application",
    password: "password",
    database: "test",
    synchronize: true,
    logging: false,
    // entities: [User],
    entities: [Video],
    migrations: [],
    subscribers: [],
})
