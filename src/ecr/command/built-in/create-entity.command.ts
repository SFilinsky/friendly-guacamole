import { ECRComponent } from "../../state/component/component";
import { createCommandHandler } from "../command-hander";
import { AddComponentCommand } from "./add-component.command";
import { ECRCommand } from "../command";

export class CreateEntityCommand extends ECRCommand {
  constructor(readonly components: ECRComponent[] = []) {
    super();
  }
}

export const createEntityHandler = createCommandHandler(
  CreateEntityCommand,
  (command, store) => {
    const entityId = store.createEntity();
    return command.components.map(
      (component) => new AddComponentCommand(entityId, component)
    );
  }
);
