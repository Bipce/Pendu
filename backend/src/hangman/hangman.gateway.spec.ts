import { Test, TestingModule } from "@nestjs/testing";
import { HangmanGateway } from "./hangman.gateway";

describe("HangmanGateway", () => {
  let gateway: HangmanGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HangmanGateway],
    }).compile();

    gateway = module.get<HangmanGateway>(HangmanGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
