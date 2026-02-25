import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ExhibitsModule } from './exhibits/exhibits.module';
import { CommentsModule } from './comments/comments.module';
import { NotificationsGateway } from './notifications/notifications.gateway';
import { User } from './users/entities/user.entity';
import { Exhibit } from './exhibits/entities/exhibit.entity';
import { Comment } from './comments/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'museum',
      password: 'password',
      database: 'museum',
      entities: [User, Exhibit, Comment],
      synchronize: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/api/exhibits/static', 
    }),
    UsersModule,
    AuthModule,
    ExhibitsModule,
    CommentsModule,
  ],
  providers: [NotificationsGateway],
})
export class AppModule {}
