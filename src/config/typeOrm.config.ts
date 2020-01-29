import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config';

const dbConfig = config.get('db');
const { type, host, port, username, password, database, synchronize} = dbConfig;

export const typeOrmConfig: TypeOrmModuleOptions = {
    type,
    host,
    port,
    username,
    password,
    database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize,
};
