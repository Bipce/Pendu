import { Module } from "@nestjs/common";
import { HangmanGateway } from "./hangman/hangman.gateway";
import { RoomsService } from "./hangman/rooms/rooms.service";

@Module({
  providers: [HangmanGateway, RoomsService],
})
export class AppModule {}
