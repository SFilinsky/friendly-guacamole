import {WorldscapesClientApi} from "../worldscapes-client.api";
import {NetworkClientApi} from "../../../network/client/client-network.api";
import {ECRSimulationApi} from "../../../ecr/simulation/simulation.api";
import {setInterval} from "timers";
import {DisplayApi, UserInput} from "../../../display/display.api";

export class SimpleEngineClient extends WorldscapesClientApi {

    constructor(
        protected simulation: ECRSimulationApi,
        protected network: NetworkClientApi,
        protected display: DisplayApi
    ) {
        super();
    }

    public start(): void {
        let unhandledInput: UserInput[] = [];
        this.display.onInput = (event) => { unhandledInput.push(event); };

        setInterval(() => {
            // Send accumulated user input to server
            this.network.sendUserInput(unhandledInput);
            unhandledInput = [];

            // Apply changes from server
            const snapshot = this.network.getLastReceivedSnapshot();
            if (snapshot) {
                this.simulation.loadSnapshot(snapshot);
            }

            // Run simulation
            const simulationResult = this.simulation.runSimulationTick();

            this.display.takeUpdatedSnapshot(simulationResult.snapshot);
        }, 1000)
    }

}