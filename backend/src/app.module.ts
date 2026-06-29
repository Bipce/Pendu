import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HangmanGateway } from "./hangman/hangman.gateway";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, HangmanGateway],
})
export class AppModule {}
