import { UserAction, WorldStateSnapshot } from "@worldscapes/common";

export abstract class NetworkClientApi {
  abstract getLastReceivedSnapshot(): WorldStateSnapshot;
  abstract sendUserActions(input: UserAction[]): void;
}
