import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { VideosController } from './videos.controller';
import { AppService } from './app.service';
import { join } from 'path';


@Module({
  imports: [
    // Serve static files from the React app's build directory
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','frontend','build'),
    }),
  ],
  controllers: [AppController,VideosController],
  providers: [AppService],
})

export class AppModule {}
