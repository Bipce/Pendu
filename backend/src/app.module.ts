import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HangmanGateway } from "./hangman/hangman.gateway";
import { RoomsService } from "./hangman/rooms/rooms.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, HangmanGateway, RoomsService],
})
export class AppModule {}
