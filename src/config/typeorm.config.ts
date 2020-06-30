import { TypeOrmModuleOptions } from '@nestjs/typeorm';

<<<<<<< HEAD
export const typeOrmConfig: TypeOrmModuleOptions = {
=======
export const typeOrmConfig : TypeOrmModuleOptions = {
>>>>>>> 79698445f51d94831441a21e2259afddcc14d6d5
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
<<<<<<< HEAD
    database: 'taskmanagment',
=======
    database: 'taskmanagement',
>>>>>>> 79698445f51d94831441a21e2259afddcc14d6d5
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
};